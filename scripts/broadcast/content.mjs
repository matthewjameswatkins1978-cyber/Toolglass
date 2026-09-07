import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(process.cwd());
export const SITE_URL = 'https://matthewjameswatkins1978-cyber.github.io/Toolglass';
export const SITE_NAME = 'Toolglass';
export const AUTHOR_NAME = 'Matthew Watkins';
export const AUTHOR_URL = 'https://github.com/matthewjameswatkins1978-cyber';
export const ISSUE_ID = 'issue-001';

export const KNOWN_EVIDENCE = new Set([
  'SCOUTED',
  'INSPECTED',
  'TESTED',
  'BUILD BLOCKED',
  'INSPECTED / BUILD BLOCKED',
  'INSPECTED + FOCUSED TESTS',
]);

function decodeString(raw, quote) {
  if (quote === '"') return JSON.parse(`"${raw}"`);
  return raw.replace(/\\(['"\\nrt])/g, (_, value) => {
    if (value === 'n') return '\n';
    if (value === 'r') return '\r';
    if (value === 't') return '\t';
    return value;
  });
}

function extractField(block, field) {
  const pattern = new RegExp(
    String.raw`(?:["']?${field}["']?)\s*:\s*(["'])(.*?)\1`,
    's',
  );
  const match = block.match(pattern);
  return match ? decodeString(match[2], match[1]) : undefined;
}

function recordBlocks(source) {
  const start = source.indexOf('export const reviews: Review[] = [');
  if (start < 0) throw new Error('Could not find the reviews array');
  const arrayStart = source.indexOf('[', source.indexOf('=', start));
  const blocks = [];
  let braceDepth = 0;
  let blockStart = -1;
  let quote = null;
  let escaped = false;

  for (let i = arrayStart + 1; i < source.length; i += 1) {
    const char = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') {
      if (braceDepth === 0) blockStart = i;
      braceDepth += 1;
    } else if (char === '}') {
      braceDepth -= 1;
      if (braceDepth === 0 && blockStart >= 0) {
        blocks.push(source.slice(blockStart, i + 1));
        blockStart = -1;
      }
    } else if (char === ']' && braceDepth === 0) {
      break;
    }
  }
  return blocks;
}

export function readReviews() {
  const source = fs.readFileSync(path.join(ROOT, 'content', 'reviews.ts'), 'utf8');
  return recordBlocks(source).map((block) => {
    const status = extractField(block, 'evidenceStatus') ?? extractField(block, 'status');
    const reviewedDate = extractField(block, 'reviewedDate') ?? '5 September 2026';
    const slug = extractField(block, 'slug');
    if (!slug) throw new Error('A review record is missing its slug');
    const publishedDate = new Date(`${reviewedDate} 12:00:00 GMT`);
    return {
      slug,
      name: extractField(block, 'name'),
      category: extractField(block, 'category'),
      headline: extractField(block, 'headline'),
      summary: extractField(block, 'summary'),
      repo: extractField(block, 'repo'),
      evidenceStatus: status,
      reviewedDate,
      publishedAt: Number.isNaN(publishedDate.valueOf())
        ? '2026-09-06T12:00:00Z'
        : publishedDate.toISOString(),
    };
  });
}

export function canonicalUrl(slug) {
  return `${SITE_URL}/reviews/${slug}/`;
}

export function issueUrl() {
  return `${SITE_URL}/`;
}

export function hashContent(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export function ensureDir(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function writeJson(file, value) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

export function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function oneLine(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

export function parseArgs(argv = process.argv.slice(2)) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i];
    if (!item.startsWith('--')) continue;
    const [key, inline] = item.slice(2).split('=', 2);
    args[key] = inline ?? argv[i + 1] ?? true;
    if (inline === undefined && argv[i + 1] && !argv[i + 1].startsWith('--')) i += 1;
  }
  return args;
}

export function receiptPath(campaign, target, key) {
  return path.join(ROOT, 'distribution', 'receipts', `${campaign}--${target}--${key}.json`);
}

export function existingReceipt(campaign, target, key) {
  const file = receiptPath(campaign, target, key);
  return fs.existsSync(file) ? readJson(file) : null;
}

export function saveReceipt(receipt) {
  writeJson(receiptPath(receipt.campaignId, receipt.target, receipt.key), receipt);
}
