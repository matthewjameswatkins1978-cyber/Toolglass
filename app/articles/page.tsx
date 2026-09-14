import { articles } from '@/content/articles';
import { sitePath } from '@/lib/utils';

export const metadata = {
  title: 'Articles & essays',
  description:
    'Long-form Toolglass writing about software, AI, creative technology and the ideas around them.',
};

export default function ArticlesPage() {
  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">ESSAYS / {articles.length} PUBLISHED</p>
        <h1>
          Software has consequences.
          <br />
          Let&apos;s talk about them.
        </h1>
        <p className="dek">
          Long-form writing from the Toolglass desk: ideas, arguments, histories
          and working theories that do not fit inside a software review.
        </p>
      </div>

      <div className="review-list">
        {articles.map((article, index) => (
          <a
            className="review-item"
            href={sitePath(`/articles/${article.slug}`)}
            key={article.slug}
          >
            <div className="eyebrow">
              {String(index + 1).padStart(2, '0')} / {article.kicker}
              <br />
              {article.publishedDate}
            </div>
            <div>
              <h2>{article.title}</h2>
              <p>{article.subtitle}</p>
              <p className="review-meta">
                {article.byline} · {article.readingTime}
              </p>
            </div>
            <span className="badge">ESSAY ↗</span>
          </a>
        ))}
      </div>
    </>
  );
}
