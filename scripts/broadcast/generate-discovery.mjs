import fs from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
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
const require = createRequire(import.meta.url);
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  module._compile(
    ts.transpile(source, {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    }),
    filename,
  );
};
const { articles } = require('../../content/articles-all.ts');
const articlePublishedAt = (article) => {
  const publishedAt = new Date(article.publishedDate + ' 12:00:00 GMT');
  if (Number.isNaN(publishedAt.getTime())) {
    throw new Error('Invalid published date for article ' + article.slug + ': ' + article.publishedDate);
  }
  return publishedAt.toISOString();
};
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
  { url: `${SITE_URL}/glassary/`, lastmod: '2026-10-05' },
  { url: SITE_URL + '/articles/', lastmod: articles[0] ? articlePublishedAt(articles[0]).slice(0, 10) : '2026-10-07' },
  ...articles.map((article) => ({
    url: SITE_URL + '/articles/' + article.slug + '/',
    lastmod: articlePublishedAt(article).slice(0, 10),
  })),
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

const feedEntries = [
  ...articles.map((article) => ({
    title: article.title,
    url: SITE_URL + '/articles/' + article.slug + '/',
    publishedAt: articlePublishedAt(article),
    summary: article.summary,
    category: article.kicker.split('/')[0].trim(),
  })),
  ...reviews
    .filter((review) => review.evidenceStatus !== 'SCOUTED')
    .map((review) => ({
      title: review.headline,
      url: canonicalUrl(review.slug),
      publishedAt: review.publishedAt,
      summary: `${review.summary} Evidence: ${review.evidenceStatus}.`,
      category: review.category,
    })),
  ...radarEntries.map((entry) => ({
    title: entry.headline,
    url: `${SITE_URL}/radar/${entry.slug}/`,
    publishedAt: entry.publishedAt,
    summary: `${entry.standfirst} Radar status: ${entry.status}.`,
    category: 'Radar',
  })),
];
feedEntries.sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt));
const feedItems = feedEntries.map((entry) => `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(entry.url)}</link>
      <guid isPermaLink="true">${escapeXml(entry.url)}</guid>
      <pubDate>${new Date(entry.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(entry.summary)}</description>
      <dc:creator>${escapeXml(AUTHOR_NAME)}</dc:creator>
      <category>${escapeXml(entry.category)}</category>
    </item>`).join('\n');
fs.writeFileSync(
  path.join(publicDir, 'feed.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}/</link>
    <description>Software worth finding. Independent reviews with visible evidence.</description>
    <language>en-gb</language>
    <lastBuildDate>${new Date(Math.max(...feedEntries.map((entry) => new Date(entry.publishedAt).getTime()))).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <atom:link href="${SITE_URL}/atom.xml" rel="alternate" type="application/atom+xml" />
    <managingEditor>${escapeXml(AUTHOR_NAME)} (${escapeXml(AUTHOR_URL)})</managingEditor>
${feedItems}
  </channel>
</rss>
`,
);
const atomUpdated = new Date(Math.max(...feedEntries.map((entry) => new Date(entry.publishedAt).getTime()))).toISOString();
const atomEntries = feedEntries.map((entry) => `  <entry>
    <id>${escapeXml(entry.url)}</id>
    <title>${escapeXml(entry.title)}</title>
    <link href="${escapeXml(entry.url)}" />
    <published>${new Date(entry.publishedAt).toISOString()}</published>
    <updated>${new Date(entry.publishedAt).toISOString()}</updated>
    <author><name>${escapeXml(AUTHOR_NAME)}</name><uri>${escapeXml(AUTHOR_URL)}</uri></author>
    <category term="${escapeXml(entry.category)}" />
    <summary>${escapeXml(entry.summary)}</summary>
  </entry>`).join('\n');
fs.writeFileSync(
  path.join(publicDir, 'atom.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE_NAME)}</title>
  <id>${SITE_URL}/</id>
  <link href="${SITE_URL}/" />
  <link href="${SITE_URL}/atom.xml" rel="self" type="application/atom+xml" />
  <link href="${SITE_URL}/feed.xml" rel="alternate" type="application/rss+xml" />
  <updated>${atomUpdated}</updated>
  <subtitle>Software worth finding. Independent reviews with visible evidence.</subtitle>
  <author><name>${escapeXml(AUTHOR_NAME)}</name><uri>${escapeXml(AUTHOR_URL)}</uri></author>
${atomEntries}
</feed>
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
  <text x="96" y="92" class="eyebrow">TOOLGLASS / INDEPENDENT SOFTWARE MAGAZINE</text>
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

function articleCard(article) {
  const title = wrapLines(article.title)
    .map((line, index) => '<text x="96" y="' + (245 + index * 55) + '" class="title">' + escapeXml(line) + '</text>')
    .join('');
  const category = article.kicker.split('/')[0].trim().toUpperCase();
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">',
    '<title id="title">' + escapeXml(article.title) + ' — Toolglass</title>',
    '<desc id="desc">' + escapeXml(category) + ' from Toolglass, an independent software publication.</desc>',
    '<rect width="1200" height="630" fill="#191d1b"/><path d="M820 0h380v630H820z" fill="#aeb8e8" opacity=".92"/>',
    '<path d="M850 96h270M850 122h190M850 148h240M850 174h140" stroke="#191d1b" stroke-width="8" opacity=".7"/>',
    '<circle cx="1014" cy="388" r="112" fill="none" stroke="#191d1b" stroke-width="10"/><circle cx="1014" cy="388" r="62" fill="none" stroke="#191d1b" stroke-width="4"/>',
    '<path d="M902 388h224M1014 276v224" stroke="#191d1b" stroke-width="4" opacity=".6"/>',
    '<text x="96" y="92" class="eyebrow">TOOLGLASS / MAGAZINE</text><text x="96" y="164" class="category">' + escapeXml(category) + '</text>',
    title,
    '<text x="96" y="530" class="date">' + escapeXml(article.publishedDate) + '</text><text x="96" y="580" class="foot">SOFTWARE WORTH FINDING. EVIDENCE IN VIEW.</text>',
    '<style>.eyebrow,.category,.date,.foot{font-family:monospace;letter-spacing:3px}.eyebrow{fill:#c4ef66;font-size:18px}.category{fill:#b8c0b4;font-size:21px}.title{font:700 42px Georgia,serif;fill:#f1f0e9;letter-spacing:-1px}.date{font-size:17px;fill:#aeb8e8}.foot{font-size:14px;fill:#b8c0b4}</style></svg>',
  ].join('');
}

for (const article of articles) {
  if (!article.heroImage) {
    fs.writeFileSync(path.join(cardsDir, article.slug + '.svg'), articleCard(article));
  }
}
const siteCard = [
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">',
  '<title id="title">TOOLGLASS — Software worth finding.</title><desc id="desc">An independent software publication. Careful questions. Visible evidence.</desc>',
  '<rect width="1200" height="630" fill="#191d1b"/><path d="M850 0h350v630H850z" fill="#c4ef66"/>',
  '<circle cx="1025" cy="315" r="142" fill="none" stroke="#191d1b" stroke-width="12"/><circle cx="1025" cy="315" r="78" fill="none" stroke="#191d1b" stroke-width="5"/><path d="M883 315h284M1025 173v284" stroke="#191d1b" stroke-width="5" opacity=".65"/>',
  '<text x="96" y="120" class="eyebrow">AN INDEPENDENT SOFTWARE PUBLICATION</text><text x="96" y="300" class="name">TOOLGLASS</text>',
  '<text x="96" y="385" class="strap">Software worth finding.</text><text x="96" y="530" class="foot">CAREFUL QUESTIONS. VISIBLE EVIDENCE.</text>',
  '<style>.eyebrow,.foot{font-family:monospace;letter-spacing:3px}.eyebrow{fill:#c4ef66;font-size:17px}.name{font:700 84px Georgia,serif;fill:#f1f0e9;letter-spacing:-3px}.strap{font:italic 44px Georgia,serif;fill:#b8c0b4}.foot{font-size:15px;fill:#b8c0b4}</style></svg>',
].join('');
fs.writeFileSync(path.join(cardsDir, 'toolglass.svg'), siteCard);

for (const review of reviews) {
  fs.writeFileSync(path.join(cardsDir, `${review.slug}.svg`), card(review));
}

console.log(`Generated sitemap, robots and feeds for ${reviews.length} reviews and ${articles.length} magazine articles.`);
