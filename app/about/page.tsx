import Link from 'next/link';
import { sitePath } from '@/lib/utils';
export const metadata = { title: 'About & methodology' };
export default function About() {
  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">ABOUT TOOLGLASS / OUR METHOD</p>
        <h1>
          Curiosity first.
          <br />
          The verdict can wait.
        </h1>
        <p className="dek">
          Toolglass is an independent publication about new, overlooked and
          interesting software. We look for useful ideas beyond the launch-day
          noise.
        </p>
      </div>
      <section className="article-grid">
        <div className="prose">
          <h2>Software worth finding.</h2>
          <p>
            A small project can solve a large irritation. An ambitious project
            can make a promise it cannot yet keep. Both deserve careful
            attention. Our job is to explain the idea, show where it fits, and
            make the limits visible.
          </p>
          <p>
            You should not need to be an expert to follow a review. We explain
            unfamiliar terms and ask practical questions: what does this do,
            what could it replace, and what would you lose by switching?
          </p>
          <h2 id="evidence">Evidence is part of the article.</h2>
          <p>
            The label tells you what work has actually happened. It is not a
            score, an endorsement or a guarantee.
          </p>
          <div className="method-grid">
            <div>
              <span className="badge">SCOUTED</span>
              <h2>Worth a look</h2>
              <p>
                Identified through public project material. Claims are
                attributed; hands-on behaviour remains unverified.
              </p>
            </div>
            <div>
              <span className="badge">INSPECTED</span>
              <h2>Looked beneath</h2>
              <p>
                A bounded inspection of source, documentation or release
                material, with the inspected revision and findings recorded. Not
                a runtime test.
              </p>
            </div>
            <div>
              <span className="badge">TESTED</span>
              <h2>Actually tried</h2>
              <p>
                Executed a stated task on a named version and environment. The
                article records results, failures and the limits of that test.
              </p>
            </div>
            <div>
              <span className="badge">BUILD BLOCKED</span>
              <h2>A result, too</h2>
              <p>
                A documented build failure is still evidence. We report the
                version, environment and boundary rather than turning a blocked
                launch into a runtime verdict.
              </p>
            </div>
          </div>
          <h2>What a review should tell you</h2>
          <p>
            What it is. Who it is for. What it replaces, and what it does not.
            Platforms, licence, version, known catches and enough evidence to
            judge our conclusion. A test of one workflow is never a certificate
            for the whole application.
          </p>
          <h2>A small following is a lead, not a verdict.</h2>
          <p>
            “Under 500★” follows projects found with fewer than 500 GitHub
            stars. The opening discovery counts come from our first scouting
            list on 5 September 2026 and are preserved as snapshots. They are
            not live totals, and popularity is not a measure of quality.
          </p>
          <h2>Independence, without theatre.</h2>
          <p>
            These opening notes contain no paid placements or affiliate links.
            Any future sponsorship or commercial relationship belongs beside the
            relevant article. Paying for attention must never buy the
            conclusion.
          </p>
          <h2 id="support">Support Toolglass</h2>
          <div className="support-prompt">
            <p>
              Toolglass is free to read. If you would like to help keep the
              testing bench running, you can support the publication on{' '}
              <a href="https://ko-fi.com/matmusmeows">Ko-fi ↗</a>.
            </p>
            <p className="small">
              Support is optional and does not affect our evidence, verdicts or
              editorial decisions.
            </p>
          </div>
          <p>
            If we ever use an affiliate link, it may earn Toolglass a commission.
            It will not affect a test, verdict, score, wording or publication
            decision.
          </p>
          <h2>Corrections belong in the record.</h2>
          <p>
            When a material claim changes or proves wrong, we will update the
            article with a dated explanation. We distinguish an upstream change
            from an error in our own reporting.
          </p>
          <Link className="read-link" href={sitePath('/reviews')}>
            Explore the first finds ↗
          </Link>
        </div>
        <aside>
          <p className="eyebrow">LAB STATUS / SEPTEMBER 2026</p>
          <dl className="facts">
            <div>
              <dt>Projects in the issue</dt>
              <dd>11</dd>
            </div>
            <div>
              <dt>Hands-on tests completed</dt>
              <dd>1</dd>
            </div>
            <div>
              <dt>Evidence-backed pieces</dt>
              <dd>
                Spaghetti tested; Atlas inspected with focused harness tests;
                TermAI blocked before launch.
              </dd>
            </div>
            <div>
              <dt>Evidence available today</dt>
              <dd>
                Dated Toolglass receipts, bounded test results and linked public
                project material. Private history contents stay out of the
                publication.
              </dd>
            </div>
          </dl>
        </aside>
      </section>
    </>
  );
}
