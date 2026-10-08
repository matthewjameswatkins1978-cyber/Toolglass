import type { Metadata } from 'next';
import { articles } from '@/content/articles';
import { radarEntries } from '@/content/radar';
import { reviews } from '@/content/reviews';
import { sitePath } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Latest from the desk',
  description:
    'A live Toolglass front page mixing articles, reviews and fresh Radar signals without manual curation.',
};

type DeskItem = {
  key: string;
  kind: 'ARTICLE' | 'RADAR' | 'REVIEW';
  label: string;
  title: string;
  summary: string;
  meta: string;
  badge: string;
  href: string;
};

function interleave<T>(...lists: T[][]): T[] {
  const result: T[] = [];
  const longest = Math.max(0, ...lists.map((list) => list.length));

  for (let index = 0; index < longest; index += 1) {
    for (const list of lists) {
      const item = list[index];
      if (item !== undefined) result.push(item);
    }
  }

  return result;
}

const articleItems: DeskItem[] = articles.map((article) => ({
  key: `article:${article.slug}`,
  kind: 'ARTICLE',
  label: article.kicker,
  title: article.title,
  summary: article.summary,
  meta: `${article.publishedDate} · ${article.readingTime}`,
  badge: 'ESSAY',
  href: sitePath(`/articles/${article.slug}`),
}));

const radarItems: DeskItem[] = radarEntries.map((entry) => ({
  key: `radar:${entry.slug}`,
  kind: 'RADAR',
  label: `${entry.category} / ${entry.status}`,
  title: entry.headline,
  summary: entry.standfirst,
  meta: `${entry.publishedAt.slice(0, 10)} · ${entry.tags.join(' · ')}`,
  badge: entry.status,
  href: sitePath(`/radar/${entry.slug}`),
}));

const reviewItems: DeskItem[] = reviews.map((review) => ({
  key: `review:${review.slug}`,
  kind: 'REVIEW',
  label: review.category,
  title: review.headline,
  summary: review.summary,
  meta: review.reviewedDate
    ? `${review.reviewedDate} · ${review.name}`
    : `${review.name} · ${review.platforms.split(';')[0]}`,
  badge: review.evidenceStatus ?? review.status,
  href: sitePath(`/reviews/${review.slug}`),
}));

const deskItems = interleave(articleItems, radarItems, reviewItems).slice(0, 18);

export default function LatestPage() {
  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">THE DESK / AUTOMATIC EDITION</p>
        <h1>
          The magazine,
          <br />
          still moving.
        </h1>
        <p className="dek">
          Articles, hands-on reviews and fresh Radar signals in one living front
          page. This page assembles itself from published Toolglass material, so
          new Radar finds appear here automatically when the scouting system
          commits them.
        </p>
      </div>

      <section className="section" aria-labelledby="desk-feed-heading">
        <div className="section-title">
          <h2 id="desk-feed-heading">
            From across Toolglass <i>/ mixed automatically</i>
          </h2>
          <span className="small">{deskItems.length} CURRENT PIECES</span>
        </div>

        <div className="review-list">
          {deskItems.map((item, index) => (
            <a className="review-item" href={item.href} key={item.key}>
              <div className="eyebrow">
                {String(index + 1).padStart(2, '0')} / {item.kind}
                <br />
                {item.label}
              </div>
              <div>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <p className="review-meta">{item.meta}</p>
              </div>
              <span className="badge">{item.badge} ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>
            Go deeper <i>/ the full shelves</i>
          </h2>
        </div>
        <div className="recent-grid">
          <a className="story" href={sitePath('/articles')}>
            <p className="eyebrow">ARTICLES / LONG FORM</p>
            <h3>Ideas, histories and arguments.</h3>
            <p>Writing that needs more room than a review card can give it.</p>
            <span className="story-arrow">↗</span>
          </a>
          <a className="story" href={sitePath('/reviews')}>
            <p className="eyebrow">REVIEWS / EVIDENCE</p>
            <h3>Software given proper attention.</h3>
            <p>Hands-on work, scouting notes and clearly marked boundaries.</p>
            <span className="story-arrow">↗</span>
          </a>
          <a className="story" href={sitePath('/radar')}>
            <p className="eyebrow">RADAR / LIVE SIGNAL</p>
            <h3>The strange things arriving at the edges.</h3>
            <p>Fast source-led notes, automatically published when something earns it.</p>
            <span className="story-arrow">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
