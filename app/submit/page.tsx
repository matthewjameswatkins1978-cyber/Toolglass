import { sitePath } from '@/lib/utils';

export const metadata = {
  title: 'Submit software',
  description:
    'How to submit software to Toolglass, including the future Priority Lab Test option.',
};

export default function SubmitSoftware() {
  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">THE OPEN BENCH / SUBMISSIONS</p>
        <h1>
          Send us something
          <br />
          worth finding.
        </h1>
        <p className="dek">
          Toolglass looks for useful, unusual and overlooked software. Ordinary
          submissions are free, and every piece remains subject to the same
          evidence and editorial standards.
        </p>
      </div>
      <section className="article-grid">
        <div className="prose">
          <h2>Ordinary submissions are free.</h2>
          <p>
            Send a public repository, release or product page, along with a
            short note explaining what the software does, who it is for and why
            it deserves a closer look. A submission is a lead, not a promise of
            coverage, testing or publication.
          </p>
          <p>
            Until a dedicated inbox exists, the practical route is the public{' '}
            <a href="https://github.com/matthewjameswatkins1978-cyber/Toolglass/issues">
              Toolglass repository issues page ↗
            </a>
            . Please include the project link and avoid sending credentials or
            private material.
          </p>
          <h2>Priority Lab Test</h2>
          <div className="priority-card">
            <p className="eyebrow">
              EARLY / FUTURE OPTION <span className="badge">NOT OPEN YET</span>
            </p>
            <p>
              We may later offer a paid Priority Lab Test for teams that want
              queue priority and an agreed amount of Toolglass test time.
            </p>
            <p>
              Payment buys attention and test time only. It never buys a
              favourable verdict, score, wording, omission of failures or
              publication. We may still decline a test that is unsafe, out of
              scope or impossible to evidence honestly.
            </p>
          </div>
          <div className="independence-callout">
            <strong>Ads can buy space. They cannot buy editorial favour.</strong>
            <p>
              The same rule applies to priority testing, sponsorship and any
              future commercial relationship.
            </p>
          </div>
          <h2>Affiliate disclosure</h2>
          <p>
            If a future article contains an affiliate link, it may earn
            Toolglass a commission. That relationship will not affect the
            test, verdict, score, wording or publication decision.
          </p>
          <a className="read-link" href={sitePath('/about#evidence')}>
            Read our evidence standard ↗
          </a>
        </div>
        <aside>
          <p className="eyebrow">SUBMISSION RECEIPT / KEEP IT USEFUL</p>
          <dl className="facts">
            <div>
              <dt>Standard route</dt>
              <dd>Free, public submission</dd>
            </div>
            <div>
              <dt>Useful ingredients</dt>
              <dd>Project link, version, problem solved and intended audience</dd>
            </div>
            <div>
              <dt>Priority Lab Test</dt>
              <dd>Future option; paid queue priority and test time only</dd>
            </div>
            <div>
              <dt>Editorial promise</dt>
              <dd>Payment cannot change the evidence, verdict or publication decision</dd>
            </div>
            <div>
              <dt>Do not send</dt>
              <dd>Credentials, private repositories or confidential material</dd>
            </div>
          </dl>
          <a className="read-link" href={sitePath('/reviews')}>
            See the current issue ↗
          </a>
        </aside>
      </section>
    </>
  );
}
