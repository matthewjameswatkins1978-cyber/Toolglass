import GlassaryIndex from '@/components/GlassaryIndex';
import {
  glassaryEntries,
  glassaryMarkMeta,
  glassarySlug,
} from '@/content/glassary';

export const metadata = {
  title: 'The Glassary',
  description:
    'A Toolglass dictionary of AI terms: useful language, research language, and new names for recurring failures that badly needed one.',
};

const families = [
  {
    label: 'THE CONTEXT FAILURE CHAIN',
    terms: ['Context Sediment', 'Context Rot', 'Context Archaeology', 'Context Debt'],
    note: 'Information accumulates. It begins interfering. Somebody has to excavate what matters. The cost of failing to manage it finally arrives.',
  },
  {
    label: 'THE SYNTHETIC EVIDENCE CHAIN',
    terms: ['Slop', 'Sloppy Slop', 'Slop Cascade', 'Synthetic Consensus', 'Evidence Laundering'],
    note: 'Generated material becomes presumed evidence. It propagates. Agreement appears. Weak information emerges looking strangely respectable.',
  },
  {
    label: 'THE VERIFICATION FAILURE CHAIN',
    terms: ['Specification Gaming', 'Green-Light Hallucination', 'Verification Theatre', 'Proof Debt'],
    note: 'The system satisfies the measurement. The measurement is mistaken for reality. Reassuring checks accumulate while actual proof falls behind.',
  },
  {
    label: 'THE TOOL MATURITY CHAIN',
    terms: ['Tool Shyness', 'Tool Whispering', 'Tool Gravity', 'Self-Teaching Tool', 'Scaffold Fade'],
    note: 'The agent avoids unfamiliar machinery. Humans compensate with prompting. The structural problem becomes visible. The tool learns to teach its own operation.',
  },
];

export default function GlassaryPage() {
  const toolglassTerms = glassaryEntries.filter(
    (entry) => entry.mark === 'toolglass',
  ).length;
  const commonTerms = glassaryEntries.filter(
    (entry) => entry.mark === 'common',
  ).length;
  const researchTerms = glassaryEntries.filter(
    (entry) => entry.mark === 'research',
  ).length;

  return (
    <>
      <div className="glassary-hero">
        <div>
          <p className="eyebrow">REFERENCE / A LIVING TOOLGLASS DICTIONARY</p>
          <h1>
            The Glassary<span>.</span>
          </h1>
          <p className="glassary-subhead">A Toolglass Dictionary of AI</p>
        </div>

        <div className="glassary-hero-copy">
          <p>
            Artificial intelligence has acquired an unfortunate habit of
            producing terminology almost as quickly as it produces text.
          </p>
          <p>
            Some of it is useful. Some of it is marketing fog. Some of it names
            something genuinely new using language that makes you want to leave
            the building.
          </p>
          <p>
            The Glassary is Toolglass&apos;s attempt to do better. Where a good
            term already exists, we keep it. Where language is muddy, we clarify
            it. Where something keeps happening but nobody has given it a useful
            name, we reserve the right to manufacture one.
          </p>
        </div>
      </div>

      <section className="glassary-frontispiece">
        <div className="glassary-rule">
          <p className="eyebrow">THE TEST</p>
          <p>Does the term help us notice, discuss or prevent something real?</p>
          <span>If not, out it goes.</span>
        </div>

        <dl className="glassary-statline" aria-label="Glassary edition statistics">
          <div>
            <dt>Entries</dt>
            <dd>{glassaryEntries.length}</dd>
          </div>
          <div>
            <dt>{glassaryMarkMeta.toolglass.symbol} Toolglass</dt>
            <dd>{toolglassTerms}</dd>
          </div>
          <div>
            <dt>{glassaryMarkMeta.common.symbol} Common</dt>
            <dd>{commonTerms}</dd>
          </div>
          <div>
            <dt>{glassaryMarkMeta.research.symbol} Research</dt>
            <dd>{researchTerms}</dd>
          </div>
        </dl>
      </section>

      <GlassaryIndex />

      <section className="glassary-families" aria-labelledby="families-heading">
        <div className="glassary-section-kicker">
          <p className="eyebrow">THE EMERGING FAMILIES</p>
          <h2 id="families-heading">Words become more useful when they connect.</h2>
          <p>
            A few recurring sequences are already visible. They are less a
            taxonomy than a set of tracks through the undergrowth.
          </p>
        </div>

        <div className="glassary-family-grid">
          {families.map((family, familyIndex) => (
            <article className="glassary-family" key={family.label}>
              <span className="glassary-family-number">
                {String(familyIndex + 1).padStart(2, '0')}
              </span>
              <p className="eyebrow">{family.label}</p>
              <div className="glassary-family-chain">
                {family.terms.map((term, index) => (
                  <span key={term}>
                    <a href={`#${glassarySlug(term)}`}>{term}</a>
                    {index < family.terms.length - 1 ? <b>→</b> : null}
                  </span>
                ))}
              </div>
              <p>{family.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="glassary-editorial-rule">
        <p className="eyebrow">EDITORIAL RULE / ADMISSION IS DELIBERATELY DIFFICULT</p>
        <div>
          <h2>The Glassary is not a jargon factory.</h2>
          <p>
            A new term needs to name a recurring phenomenon for which existing
            language is poor, make an important distinction easier to think
            about, or be memorable enough that people will actually use it.
          </p>
          <p>
            Being funny helps. Being useful is compulsory. The aim is to give
            names to things we keep tripping over.
          </p>
          <p className="glassary-last-word">
            Once something has a good name, it becomes considerably harder to
            pretend you haven&apos;t noticed it.
          </p>
        </div>
      </section>
    </>
  );
}
