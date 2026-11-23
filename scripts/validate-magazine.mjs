import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { SITE_URL } from './broadcast/content.mjs';

const artifact = path.resolve('dist/pages');
const base = new URL(SITE_URL + '/');
const routes = fs.readdirSync(artifact, { recursive: true }).filter(file => file.endsWith('.html'));
const failures = new Set();
const read = file => fs.readFileSync(path.join(artifact, file), 'utf8');
const html = new Map(routes.map(file => [file, read(file)]));

function checkReference(reference, from, origin) {
  const url = new URL(reference.replaceAll('&amp;', '&'), origin);
  if (url.origin !== base.origin) return;
  if (!url.pathname.startsWith(base.pathname)) {
    failures.add(`${from}: link bypasses Pages base path: ${reference}`);
    return;
  }
  const relative = decodeURIComponent(url.pathname.slice(base.pathname.length));
  const index = path.normalize(path.join(relative, 'index.html'));
  const file = path.join(artifact, relative);
  if (!html.has(index) && !(fs.existsSync(file) && fs.statSync(file).isFile())) {
    failures.add(`${from}: missing ${reference}`);
  }
  const document = html.get(index) ?? html.get(path.normalize(relative));
  if (url.hash && document && !document.includes(` id="${decodeURIComponent(url.hash.slice(1))}"`)) {
    failures.add(`${from}: missing anchor ${reference}`);
  }
}

for (const [file, markup] of html) {
  const route = file.split(path.sep).join('/').replace(/index\.html$/, '');
  const origin = new URL(route, base);
  for (const tag of markup.matchAll(/<(a|img|script|link)\s+([^>]+)>/g)) {
    const attrs = tag[2];
    const ref = attrs.match(/(?:^|\s)(?:href|src)="([^"]+)"/)?.[1];
    if (ref) checkReference(ref, file, origin);
    if (tag[1] === 'img' && !/(?:^|\s)alt="/.test(attrs)) {
      failures.add(`${file}: artwork missing alt attribute: ${ref}`);
    }
  }
}

const cover = read('index.html');
const archive = read(path.join('issues', 'index.html'));
const featured = cover.match(/<time dateTime="(\d{4}-\d{2}-\d{2})"/i)?.[1];
assert.ok(featured, 'Cover needs a dated issue');
assert.ok(archive.includes(`id="${featured}"`), 'Cover issue is missing from archive');
const archiveDates = [...archive.matchAll(/<time dateTime="(\d{4}-\d{2}-\d{2})"/gi)].map(match => match[1]);
assert.deepEqual(archiveDates, [...new Set(archiveDates)].sort((a, b) => b.localeCompare(a)), 'Archive dates must be unique and newest first');
assert.equal(archiveDates[0], featured, 'Cover must show the most recent issue');

const feedIds = [
  ['feed.xml', /<guid isPermaLink="true">([^<]+)<\/guid>/g],
  ['atom.xml', /<entry>\s*<id>([^<]+)<\/id>/g],
  ['sitemap.xml', /<loc>([^<]+)<\/loc>/g],
].map(([file, pattern]) => {
  const refs = [...read(file).matchAll(pattern)].map(match => match[1]);
  assert.ok(refs.length, `${file} is empty`);
  assert.equal(new Set(refs).size, refs.length, `${file} contains duplicate URLs`);
  for (const ref of refs) checkReference(ref, file, base);
  return refs;
});
assert.deepEqual(feedIds[0], feedIds[1], 'RSS and Atom must share entries and ordering');
assert.ok(feedIds[2].includes(new URL('issues/', base).href), 'Sitemap is missing the archive');
const coverArticle = cover.match(/<h1[^>]*><a href="([^"]+)"/)?.[1];
assert.ok(coverArticle && feedIds[0].includes(new URL(coverArticle, base).href), 'Feeds are missing the cover story');

assert.equal(failures.size, 0, [...failures].join('\n'));
console.log(`Checked ${html.size} pages, ${archiveDates.length} dated editions and ${feedIds[0].length} feed entries.`);
