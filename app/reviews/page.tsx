import { reviews } from '@/content/reviews';
import { sitePath } from '@/lib/utils';
export const metadata = { title: 'Reviews & scouting notes' };
export default function Reviews() {
  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">THE INDEX / {reviews.length} ENTRIES</p>
        <h1>
          Small projects.
          <br />
          Proper attention.
        </h1>
        <p className="dek">
          Software that caught our eye, and the questions we want to answer.
          Three entries now carry Toolglass evidence; the rest remain clearly
          labelled scouting notes.
        </p>
      </div>
      <div className="review-list">
        {reviews.map((r, i) => (
          <a
            className="review-item"
            href={sitePath('/reviews/' + r.slug)}
            key={r.slug}
          >
            <div className="eyebrow">
              {String(i + 1).padStart(2, '0')} / {r.name}
              <br />
              {r.category}
            </div>
            <div>
              <h2>{r.headline}</h2>
              <p>{r.summary}</p>
              <p className="review-meta">
                {r.platforms.split(';')[0]} · {r.licence} · {r.version}
              </p>
            </div>
            <span className="badge">{r.evidenceStatus ?? r.status} ↗</span>
          </a>
        ))}
      </div>
    </>
  );
}
