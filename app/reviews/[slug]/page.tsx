import Link from 'next/link';
import { notFound } from 'next/navigation';
import { reviews, checkedDate } from '@/content/reviews';
import ToolglassReceipt from '@/components/ToolglassReceipt';

function ReviewVisual({ kind }: { kind: 'spaghetti' | 'atlas' | 'termai' }) {
  if (kind === 'spaghetti') {
    return (
      <figure className="review-visual spaghetti-visual">
        <figcaption>FIG. 01 / A LOCAL HISTORY INDEX</figcaption>
        <div className="flow-row">
          <span>
            CODEX
            <br />
            CLAUDE
            <br />
            GROK
          </span>
          <b>→</b>
          <span>
            SPAGHETTI
            <br />
            <small>normalise</small>
          </span>
          <b>→</b>
          <span>
            SQLITE
            <br />
            <small>project / session / message</small>
          </span>
        </div>
        <div className="visual-note">
          Toolglass tested a Codex-only bounded slice.
        </div>
      </figure>
    );
  }
  if (kind === 'atlas') {
    return (
      <figure className="review-visual atlas-visual">
        <figcaption>FIG. 01 / COMPLETION AS A CHECKABLE STATE</figcaption>
        <div className="atlas-flow">
          <span>
            GOAL
            <br />
            CONTRACT
          </span>
          <b>→</b>
          <span>
            AGENT
            <br />
            ACTION
          </span>
          <b>→</b>
          <span className="present">
            CONTRACT
            <br />
            GATE
          </span>
          <b>→</b>
          <span className="present">
            IMPACT
            <br />
            EVIDENCE
          </span>
        </div>
        <div className="partial-line">
          VERIFIER · COMPLETION GATE · REVIEWER · PERSISTENCE / PARTIAL OR
          UNWIRED
        </div>
      </figure>
    );
  }
  return (
    <figure className="review-visual termai-visual">
      <figcaption>FIG. 01 / THE FIRST LAUNCH</figcaption>
      <div className="compiler-line">
        <span>$</span> cargo build --release
      </div>
      <div className="compiler-line error">
        <span>×</span> Unix permissions API / PKCE type inference
      </div>
      <div className="visual-note">Prompt not reached. Runtime not tested.</div>
    </figure>
  );
}
export function generateStaticParams() {
  return reviews.map((r) => ({ slug: r.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = reviews.find((r) => r.slug === slug);
  return { title: r?.headline ?? 'Not found', description: r?.summary };
}
export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = reviews.find((r) => r.slug === slug);
  if (!r) notFound();
  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">
          {r.category.toUpperCase()} / {r.name}{' '}
          <span className="badge">{r.evidenceStatus ?? r.status}</span>
        </p>
        <h1>{r.headline}</h1>
        <p className="dek">{r.summary}</p>
        <p className="small">
          TOOLGLASS EDITORIAL / {r.reviewedDate ?? checkedDate}
        </p>
      </div>
      <div className="article-grid">
        <article className="prose">
          {r.visual && <ReviewVisual kind={r.visual} />}
          {r.sections ? (
            <>
              <div className="evidence-note">
                <strong>{r.evidenceStatus ?? r.status}</strong>
                <br />
                {r.evidenceNote}
              </div>
              {r.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
              <div className="evidence-note">
                <strong>Evidence boundary</strong>
                <br />
                {r.evidenceBoundary}
              </div>
            </>
          ) : (
            <>
              <h2>What is it?</h2>
              <p>{r.what}</p>
              <h2>What problem does it solve?</h2>
              <p>{r.summary}</p>
              <div className="evidence-note">
                <strong>SCOUTED — not yet tested.</strong>
                <br />
                This is a source-led first look. We have read public project
                material, but have not installed or run this software. No
                performance, reliability or security verdict is implied.
              </div>
              <h2>What does it replace?</h2>
              <p>{r.replaces}</p>
              <h2>What doesn’t it replace?</h2>
              <p>{r.notReplaces}</p>
              <h2>Who is it for?</h2>
              <p>{r.audience}</p>
              <h2>The review notebook</h2>
              {r.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <h2>Known catches & open questions</h2>
              <p>{r.catch}</p>
              <h2>Current judgement</h2>
              <p>
                This is a promising lead, not a recommendation. We will only
                make a hands-on judgement after the stated test has been run.
              </p>
              <h2>Next on the bench</h2>
              <p>{r.nextTest}</p>
            </>
          )}
          <h2>Sources & evidence</h2>
          <p>
            <a href={'https://github.com/' + r.repo}>
              Project repository and README ↗
            </a>
            <br />
            <a href={'https://github.com/' + r.repo + '/releases'}>
              Release history ↗
            </a>
          </p>
          <p className="small">
            Public material checked {r.reviewedDate ?? checkedDate}. Version
            labels are the latest stable release returned at that check, where
            available. Platform descriptions are upstream claims, not Toolglass
            acceptance tests.
          </p>
          <div className="article-nav">
            <Link href="/reviews">← Back to the index</Link>
          </div>
        </article>
        <aside aria-label="Software facts">
          <p className="eyebrow">AT A GLANCE / {r.name}</p>
          {r.receipt && <ToolglassReceipt rows={r.receipt} />}
          <dl className="facts">
            {[
              [
                'Evidence status',
                r.evidenceStatus ?? r.status + ' — no hands-on test',
              ],
              ['Platforms', r.platforms],
              ['Licence', r.licence],
              ['Latest version', r.version],
              ['Metadata checked', checkedDate],
              ['Known catches', r.catch],
            ].map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <a className="read-link" href={'https://github.com/' + r.repo}>
            Visit the project ↗
          </a>
          <br />
          <Link className="read-link" href="/about#evidence">
            What our labels mean ↗
          </Link>
        </aside>
      </div>
    </>
  );
}
