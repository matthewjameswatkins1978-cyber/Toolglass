import path from 'node:path';
import { canonicalUrl, existingReceipt, hashContent, parseArgs, readJson, ROOT, saveReceipt } from './content.mjs';

const args = parseArgs();
const campaign = String(args.campaign ?? 'issue-001-launch');
const mode = String(args.mode ?? 'dry-run');
const manifest = readJson(path.join(ROOT, 'distribution', 'outbox', `${campaign}.json`));
if (!['dry-run', 'publish'].includes(mode)) throw new Error('mode must be dry-run or publish');

const results = [];
const record = (target, key, outcome, extra = {}) => {
  const item = { campaignId: campaign, target, key, outcome, ...extra };
  results.push(item);
  if (outcome === 'success') saveReceipt(item);
};

if (mode === 'dry-run') {
  console.log(`DRY RUN — no external action will be taken for ${campaign}`);
  console.log(JSON.stringify(manifest, null, 2));
  process.exit(0);
}

async function postJson(url, headers, body) {
  const response = await fetch(url, { method: 'POST', headers: { ...headers, 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { text: text.slice(0, 500) }; }
  if (!response.ok) throw new Error(`${response.status} ${JSON.stringify(data).slice(0, 500)}`);
  return data;
}

for (const article of manifest.articles) {
  if (process.env.DEVTO_API_KEY) {
    const key = article.slug;
    if (existingReceipt(campaign, 'dev', key)) record('dev', key, 'skipped', { reason: 'receipt exists' });
    else {
      try {
        const data = await postJson('https://dev.to/api/articles', { 'api-key': process.env.DEVTO_API_KEY, accept: 'application/vnd.forem.api-v1+json', 'user-agent': 'Toolglass-Broadcast/1.0' }, { article: { title: article.title, body_markdown: article.dev.bodyMarkdown, published: process.env.DEVTO_ALLOW_PUBLISH === 'true', canonical_url: canonicalUrl(article.slug), description: article.summary, tags: article.dev.tags, main_image: `${manifest.canonical}/og/${article.slug}.svg` } });
        record('dev', key, 'success', { externalId: String(data.id ?? ''), publicUrl: data.url ?? null, contentHash: hashContent(article.dev.bodyMarkdown), timestamp: new Date().toISOString() });
      } catch (error) { record('dev', key, 'failed', { error: error.message }); }
    }
  } else record('dev', article.slug, 'blocked', { reason: 'DEVTO_API_KEY not set' });
}

if (process.env.BUTTONDOWN_API_KEY) {
  const key = `${campaign}-issue`; 
  if (existingReceipt(campaign, 'buttondown', key)) record('buttondown', key, 'skipped', { reason: 'receipt exists' });
  else {
    const body = `Toolglass, occasionally.\n\nNew reviews, strange software and useful things that deserved more attention.\n\n${manifest.articles.map((article) => `- [${article.title}](${canonicalUrl(article.slug)}) — ${article.evidenceStatus}`).join('\n')}\n\nSoftware worth finding.`;
    try {
      const data = await postJson('https://api.buttondown.com/v1/emails', { Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}` }, { subject: 'Toolglass Issue 001: three different kinds of evidence', body, status: 'draft' });
      record('buttondown', key, 'success', { externalId: String(data.id ?? ''), publicUrl: data.absolute_url ?? null, contentHash: hashContent(body), timestamp: new Date().toISOString() });
    } catch (error) { record('buttondown', key, 'failed', { error: error.message }); }
  }
} else record('buttondown', `${campaign}-issue`, 'blocked', { reason: 'BUTTONDOWN_API_KEY not set' });

if (process.env.INDEXNOW_KEY) {
  const urls = manifest.articles.map((article) => article.canonicalUrl);
  const key = 'evidence-articles';
  if (existingReceipt(campaign, 'indexnow', key)) record('indexnow', key, 'skipped', { reason: 'receipt exists' });
  else {
    try {
      await postJson('https://api.indexnow.org/indexnow', {}, { host: new URL(manifest.canonical).host, key: process.env.INDEXNOW_KEY, keyLocation: `${manifest.canonical}/indexnow-key.txt`, urlList: urls });
      record('indexnow', key, 'success', { publicUrl: 'https://api.indexnow.org/indexnow', contentHash: hashContent(urls.join('\n')), timestamp: new Date().toISOString() });
    } catch (error) { record('indexnow', key, 'failed', { error: error.message }); }
  }
} else record('indexnow', 'evidence-articles', 'blocked', { reason: 'INDEXNOW_KEY not set' });

for (const article of manifest.articles) for (const post of article.social) {
  for (const channel of [{ name: 'bluesky', env: 'BUFFER_BLUESKY_CHANNEL_ID' }, { name: 'mastodon', env: 'BUFFER_MASTODON_CHANNEL_ID' }, { name: 'x', env: 'BUFFER_X_CHANNEL_ID' }]) {
    const key = `${article.slug}-${post.angle}-${channel.name}`;
    if (!process.env.BUFFER_API_KEY) { record('buffer', key, 'blocked', { reason: 'BUFFER_API_KEY not set' }); continue; }
    if (!process.env[channel.env]) { record('buffer', key, 'blocked', { reason: `${channel.env} not set` }); continue; }
    if (existingReceipt(campaign, 'buffer', key)) { record('buffer', key, 'skipped', { reason: 'receipt exists' }); continue; }
    try {
      const query = `mutation CreatePost($input: CreatePostInput!) { createPost(input: $input) { ... on PostActionSuccess { post { id dueAt } } ... on MutationError { message } } }`;
      const data = await postJson('https://api.buffer.com', { Authorization: `Bearer ${process.env.BUFFER_API_KEY}` }, { query, variables: { input: { text: post.text.replaceAll('CHANNEL', channel.name), channelId: process.env[channel.env], schedulingType: 'automatic', mode: 'addToQueue' } } });
      const result = data?.data?.createPost;
      if (result?.message) throw new Error(result.message);
      record('buffer', key, 'success', { externalId: result?.post?.id ?? null, scheduledAt: result?.post?.dueAt ?? null, contentHash: hashContent(post.text), timestamp: new Date().toISOString() });
    } catch (error) { record('buffer', key, 'failed', { error: error.message }); }
  }
}

console.log(JSON.stringify({ campaign, mode, results }, null, 2));
