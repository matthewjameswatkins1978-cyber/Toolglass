import fs from 'node:fs';
import path from 'node:path';
import {
  ROOT,
  SITE_URL,
  ISSUE_ID,
  canonicalUrl,
  hashContent,
  oneLine,
  readReviews,
  writeJson,
  parseArgs,
} from './content.mjs';

const args = parseArgs();
const campaignId = String(args.campaign ?? 'issue-001-launch');
const mode = String(args.mode ?? 'dry-run');
if (!['dry-run', 'publish'].includes(mode)) throw new Error('mode must be dry-run or publish');

const reviews = readReviews().filter((review) => review.evidenceStatus !== 'SCOUTED');
const selected = args.article ? reviews.filter((review) => review.slug === args.article) : reviews;
if (!selected.length) throw new Error('No matching evidence-backed article was found');

const channelConfig = [
  { name: 'Bluesky', env: 'BUFFER_BLUESKY_CHANNEL_ID', lane: 'buffer' },
  { name: 'Mastodon', env: 'BUFFER_MASTODON_CHANNEL_ID', lane: 'buffer' },
  { name: 'X', env: 'BUFFER_X_CHANNEL_ID', lane: 'buffer' },
];

function socialCopy(review, angle) {
  const url = `${canonicalUrl(review.slug)}?utm_source=CHANNEL&utm_medium=social&utm_campaign=i001&utm_content=${review.slug.slice(0, 6)}-${angle[0]}`;
  if (review.slug === 'spaghetti') {
    return {
      launch: `Coding agents keep a lot of history. Finding one useful decision is harder. We tested Spaghetti against controlled data and a bounded Codex slice. ${url}`,
      finding: `Spaghetti makes structured agent history easier to navigate. Raw grep still finds tool-output matches its index omits. That boundary matters. ${url}`,
      replacement: `Spaghetti replaces folder wandering and “which session was that?” guesswork. It does not replace raw search. ${url}`,
      evidence: `A bounded pass: 3 projects, 3 sessions, 1,007 segments, 94 ms startup. Evidence, not a claim about every history tree. ${url}`,
    }[angle];
  }
  if (review.slug === 'atlas') {
    return {
      launch: `29 focused tests can tell you quite a lot. They cannot turn an unfinished live agent loop into a finished product. We inspected Atlas. ${url}`,
      finding: `Atlas has executable Goal Contract and evidence-gate machinery. Its live loop and persistence remain partial. ${url}`,
      replacement: `Atlas turns “don't move the goalposts” into checkable task conditions. It does not yet replace a complete agent runtime. ${url}`,
      evidence: `29 focused harness tests passed. No model task, Tauri launch or packaged reviewer flow was exercised. ${url}`,
    }[angle];
  }
  return {
    launch: `We didn't get TermAI running. That's not the absence of a review result. It's a build result. Toolglass records where the evidence stops. ${url}`,
    finding: `TermAI's current Windows source build stopped before first launch. The promised terminal assistant behaviour remains untested. ${url}`,
    replacement: `TermAI might replace parts of a terminal workflow if it builds and behaves as described. We did not get far enough to say. ${url}`,
    evidence: `BUILD BLOCKED is the result: compiler errors stopped the review before credentials, prompts or runtime behaviour. ${url}`,
  }[angle];
}

const articles = selected.map((review) => ({
  slug: review.slug,
  title: review.headline,
  summary: oneLine(review.summary),
  evidenceStatus: review.evidenceStatus,
  canonicalUrl: canonicalUrl(review.slug),
  social: ['launch', 'finding', 'replacement', 'evidence'].map((angle, index) => ({
    angle,
    scheduledOffsetDays: [0, 1, 3, 7][index],
    text: socialCopy(review, angle),
  })),
  dev: {
    tags: ['software', 'devtools', review.category.split(/[ /&]+/)[0].toLowerCase()].slice(0, 4),
    bodyMarkdown: `# ${review.headline}\n\n**${review.evidenceStatus}**\n\n${review.summary}\n\nThis is the Toolglass review, with the method and limits kept visible.\n\n[Read the original on Toolglass](${canonicalUrl(review.slug)})\n\nOriginally published by Toolglass. Software worth finding.`,
  },
  curatorPitch: `A ${review.evidenceStatus.toLowerCase()} Toolglass review of ${review.name}: ${review.summary} Read the original: ${canonicalUrl(review.slug)}`,
  maintainerNotice: `Hi, we covered ${review.name} in Toolglass (${review.evidenceStatus}). We have tried to be explicit about what we did and did not test. If a factual detail is wrong, we would genuinely like to know: ${canonicalUrl(review.slug)}\n\nMatthew\nToolglass`,
}));

const manifest = {
  schemaVersion: 1,
  campaignId,
  issueId: ISSUE_ID,
  mode,
  createdAt: new Date().toISOString(),
  canonical: SITE_URL,
  automatic: {
    sitemap: true,
    rss: true,
    indexNow: Boolean(process.env.INDEXNOW_KEY),
    buffer: channelConfig.map((channel) => ({ ...channel, configured: Boolean(process.env[channel.env]) })),
    dev: Boolean(process.env.DEVTO_API_KEY),
    buttondown: Boolean(process.env.BUTTONDOWN_API_KEY),
  },
  queuedManual: ['Pointer', 'Changelog', 'Hashnode', 'Maintainer notices'],
  held: ['Reddit — account and community check', 'Hacker News — warm account', 'Product Hunt — not appropriate yet'],
  articles,
};

const jsonFile = path.join(ROOT, 'distribution', 'outbox', `${campaignId}.json`);
writeJson(jsonFile, manifest);

const markdown = [
  'TOOLGLASS BROADCAST',
  `Campaign: ${campaignId}`,
  '',
  `Canonical: ${SITE_URL}/`,
  '',
  ...articles.flatMap((article) => [
    `${article.slug} — ${article.evidenceStatus}`,
    article.canonicalUrl,
    ...article.social.map((post) => `  T+${post.scheduledOffsetDays}d ${post.angle}: ${post.text.replaceAll('CHANNEL', 'bluesky')}`),
    `  DEV: ${article.dev.tags.join(', ')} / canonical set`,
    `  Pointer/Changelog: queued for human review`,
    '',
  ]),
  'Automatic lanes:',
  ...channelConfig.map((channel) => `[${process.env[channel.env] ? 'x' : ' '}] Buffer / ${channel.name}${process.env[channel.env] ? '' : ` — ${channel.env} not set`}`),
  `[${process.env.DEVTO_API_KEY ? 'x' : ' '}] DEV draft${process.env.DEVTO_API_KEY ? '' : ' — DEVTO_API_KEY not set'}`,
  `[${process.env.BUTTONDOWN_API_KEY ? 'x' : ' '}] Buttondown draft${process.env.BUTTONDOWN_API_KEY ? '' : ' — BUTTONDOWN_API_KEY not set'}`,
  `[${process.env.INDEXNOW_KEY ? 'x' : ' '}] IndexNow${process.env.INDEXNOW_KEY ? '' : ' — INDEXNOW_KEY not set'}`,
  '',
  'Held:',
  ...manifest.held.map((item) => `[-] ${item}`),
  '',
  `Content hash: ${hashContent(JSON.stringify(manifest))}`,
].join('\n');
fs.writeFileSync(path.join(ROOT, 'distribution', 'outbox', `${campaignId}.md`), `${markdown}\n`);
for (const article of articles) {
  const hashnode = `---\ntitle: ${article.title}\npublished: false\ncanonical_url: ${article.canonicalUrl}\n---\n\n${article.dev.bodyMarkdown}\n\nOriginal URL: ${article.canonicalUrl}\n`;
  fs.writeFileSync(path.join(ROOT, 'distribution', 'outbox', `${campaignId}-${article.slug}-hashnode.md`), hashnode);
  fs.writeFileSync(path.join(ROOT, 'distribution', 'outbox', `${campaignId}-${article.slug}-maintainer.md`), `${article.maintainerNotice}\n`);
}
const manualQueue = [
  '# Toolglass Broadcast — manual queue',
  '',
  'These are drafts for one human decision each. No community or editor is contacted automatically.',
  '',
  '## Pointer / Changelog candidate pitches',
  '',
  ...articles.flatMap((article) => [`### ${article.slug}`, article.curatorPitch, '']),
  '## Outreach rule',
  '',
  'Send at most one respectful maintainer notice per project, using the separate files. Do not chase, bulk-mail or ask for a backlink.',
].join('\n');
fs.writeFileSync(path.join(ROOT, 'distribution', 'outbox', `${campaignId}-manual-queue.md`), `${manualQueue}\n`);
console.log(markdown);
