import fs from 'node:fs';
import path from 'node:path';
import { KNOWN_EVIDENCE, ROOT, parseArgs, readJson } from './content.mjs';

const args = parseArgs();
const campaign = String(args.campaign ?? 'issue-001-launch');
const file = path.join(ROOT, 'distribution', 'outbox', `${campaign}.json`);
if (!fs.existsSync(file)) throw new Error(`Campaign manifest not found: ${campaign}`);
const manifest = readJson(file);
if (!manifest.canonical.startsWith('https://')) throw new Error('Campaign canonical URL must be HTTPS');
if (!manifest.articles?.length) throw new Error('Campaign has no articles');

const seen = new Set();
for (const article of manifest.articles) {
  if (!article.slug || !article.canonicalUrl || !KNOWN_EVIDENCE.has(article.evidenceStatus)) {
    throw new Error(`Invalid article metadata for ${article.slug ?? '(missing slug)'}`);
  }
  if (seen.has(article.slug)) throw new Error(`Duplicate article: ${article.slug}`);
  seen.add(article.slug);
  if (article.social.length !== 4) throw new Error(`${article.slug} needs four social angles`);
  for (const post of article.social) {
    if (!post.text.includes(article.canonicalUrl.split('?')[0])) throw new Error(`${article.slug} has a non-canonical social URL`);
    if (post.text.length > 300) throw new Error(`${article.slug}/${post.angle} exceeds 300 characters`);
  }
}
console.log(`Campaign verified: ${campaign} (${manifest.articles.length} articles, no external action taken)`);

