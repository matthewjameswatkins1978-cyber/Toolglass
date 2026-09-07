import fs from 'node:fs';
import path from 'node:path';
import {
  ROOT,
  SITE_URL,
  SITE_NAME,
  AUTHOR_NAME,
  AUTHOR_URL,
  canonicalUrl,
  escapeXml,
  readReviews,
} from './content.mjs';

const reviews = readReviews();
const radarDirectory = path.join(ROOT, 'content', 'radar');
const radarEntries = fs.readdirSync(radarDirectory).filter((file) => file.endsWith('.json')).map((file) => JSON.parse(fs.readFileSync(path.join(radarDirectory, file), 'utf8')));
const publicDir = path.join(ROOT, 'public');
const cardsDir = path.join(publicDir, 'og');
fs.mkdirSync(cardsDir, { recursive: true });

const pages = [
  { url: `${SITE_URL}/`, lastmod: '2026-09-06' },
  { url: `${SITE_URL}/reviews/`, lastmod: '2026-09-06' },
  { url: `${SITE_URL}/about/`, lastmod: '2026-09-06' },
  { url: `${SITE_URL}/submit/`, lastmod: '2026-09-06' },
  { url: `${SITE_URL}/radar/`, lastmod: radarEntries[0]?.publishedAt.slice(0, 10) ?? '2026-09-07' },
  ...reviews.map((review) => ({
    url: canonicalUrl(review.slug),
    lastmod: review.publishedAt.slice(0, 10),
  })),
  ...radarEntries.map((entry) => ({ url: `${SITE_URL}/radar/${entry.slug}/`, lastmod: entry.publishedAt.slice(0, 10) })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url><loc>${escapeXml(page.url)}</loc><lastmod>${page.lastmod}</lastmod></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

fs.writeFileSync(
  path.join(publicDir, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);
const indexNowKeyFile = path.join(publicDir, 'indexnow-key.txt');
if (process.env.INDEXNOW_KEY) {
  fs.writeFileSync(indexNowKeyFile, `${process.env.INDEXNOW_KEY}\n`);
} else if (fs.existsSync(indexNowKeyFile)) {
  fs.rmSync(indexNowKeyFile);
}

const feedItems = reviews
  .filter((review) => review.evidenceStatus !== 'SCOUTED')
  .map(
    (review) => `    <item>
      <title>${escapeXml(review.headline)}</title>
      <link>${escapeXml(canonicalUrl(review.slug))}</link>
      <guid isPermaLink="true">${escapeXml(canonicalUrl(review.slug))}</guid>
      <pubDate>${new Date(review.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(`${review.summary} Evidence: ${review.evidenceStatus}.`)}</description>
      <dc:creator>${escapeXml(AUTHOR_NAME)}</dc:creator>
      <category>${escapeXml(review.category)}</category>
    </item>`,
  )
  .join('\n');
const radarFeedItems = radarEntries.map((entry) => `    <item><title>${escapeXml(entry.headline)}</title><link>${SITE_URL}/radar/${entry.slug}/</link><guid isPermaLink="true">${SITE_URL}/radar/${entry.slug}/</guid><pubDate>${new Date(entry.publishedAt).toUTCString()}</pubDate><description>${escapeXml(`${entry.standfirst} Radar status: ${entry.status}.`)}</description><category>Radar</category></item>`).join('\n');
fs.writeFileSync(
  path.join(publicDir, 'feed.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}/</link>
    <description>Software worth finding. Independent reviews with visible evidence.</description>
    <language>en-gb</language>
    <managingEditor>${escapeXml(AUTHOR_NAME)} (${escapeXml(AUTHOR_URL)})</managingEditor>
${feedItems}
${radarFeedItems}
  </channel>
</rss>
`,
);

function wrapLines(text, max = 37) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > max && line) {
      lines.push(line);
      line = word;
    } else line = `${line} ${word}`.trim();
  }
  if (line) lines.push(line);
  return lines.slice(0, 4);
}

function card(review) {
  const titleLines = wrapLines(review.headline);
  const accent = review.evidenceStatus === 'TESTED' ? '#c4ef66' : '#aeb8e8';
  const title = titleLines
    .map((line, index) => `<text x="96" y="${250 + index * 55}" class="title">${escapeXml(line)}</text>`)
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(review.headline)} — Toolglass</title>
  <desc id="desc">${escapeXml(review.evidenceStatus)} review of ${escapeXml(review.name)} by Toolglass.</desc>
  <rect width="1200" height="630" fill="#191d1b"/>
  <path d="M820 0h380v630H820z" fill="${accent}" opacity=".92"/>
  <path d="M850 96h270M850 122h190M850 148h240M850 174h140" stroke="#191d1b" stroke-width="8" opacity=".7"/>
  <circle cx="1014" cy="388" r="112" fill="none" stroke="#191d1b" stroke-width="10"/>
  <circle cx="1014" cy="388" r="62" fill="none" stroke="#191d1b" stroke-width="4"/>
  <path d="M902 388h224M1014 276v224" stroke="#191d1b" stroke-width="4" opacity=".6"/>
  <text x="96" y="92" class="eyebrow">TOOLGLASS / ISSUE 001</text>
  <text x="96" y="150" class="name">${escapeXml(review.name.toUpperCase())}</text>
  ${title}
  <text x="96" y="510" class="status">${escapeXml(review.evidenceStatus)}</text>
  <text x="96" y="570" class="foot">SOFTWARE WORTH FINDING. EVIDENCE IN VIEW.</text>
  <style>
    .eyebrow,.status,.foot{font-family:monospace;letter-spacing:3px}.eyebrow{fill:#c4ef66;font-size:18px}.name{font:700 24px monospace;fill:#b8c0b4;letter-spacing:4px}.title{font:700 46px Georgia,serif;fill:#f1f0e9;letter-spacing:-1px}.status{font-size:22px;fill:${accent}}.foot{font-size:14px;fill:#b8c0b4}
  </style>
</svg>
`;
}

for (const review of reviews) {
  fs.writeFileSync(path.join(cardsDir, `${review.slug}.svg`), card(review));
}

console.log(`Generated sitemap, robots, feed and ${reviews.length} article cards.`);
