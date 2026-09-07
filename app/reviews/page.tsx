import { reviews } from '@/content/reviews';
import { sitePath } from '@/lib/utils';
import MachineGlyph from '@/components/MachineGlyph';
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
              <MachineGlyph
                name={r.slug === 'spaghetti' ? 'tape' : r.slug === 'atlas' ? 'packet' : r.slug === 'termai' ? 'plug' : r.slug === 'narwhal' ? 'database' : r.slug === 'tracelet' ? 'prompt' : r.slug === 'outl' ? 'folder' : r.slug === 'chrondb' ? 'branch' : r.slug === 'mcp' ? 'magnifier' : r.slug === 'gitdesktop' ? 'branch' : r.slug === 'pad-local' ? 'cursor' : 'floppy'}
                size={30}
                className="review-glyph"
              />
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
