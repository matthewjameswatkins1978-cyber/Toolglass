import { reviews } from '@/content/reviews';
import { sitePath } from '@/lib/utils';
import EditorialArt from '@/components/EditorialArt';
import MachineGlyph from '@/components/MachineGlyph';

const spaghetti = reviews.find((review) => review.slug === 'spaghetti')!;
const atlas = reviews.find((review) => review.slug === 'atlas')!;
const termai = reviews.find((review) => review.slug === 'termai')!;

export default function Home() {
  return (
    <>
      <div className="issue-line">
        <span>ISSUE 001 / SEPTEMBER 2026</span>
        <span>Independent eyes. Evidence in view.</span>
      </div>
      <section className="lead">
        <div>
          <p className="eyebrow">
            THE LEAD / HISTORY &amp; RETRIEVAL{' '}
            <span className="badge">TESTED</span>
          </p>
          <h1>
            Your coding agents
            <br />
            remember everything.
            <br />
            <em>Good luck finding any of it.</em>
          </h1>
          <p className="dek">{spaghetti.summary}</p>
          <a className="read-link" href={sitePath('/reviews/spaghetti')}>
            Read the full hands-on review ↗
          </a>
          <p className="small">
            We actually used it against a controlled fixture and a bounded copy
            of real Codex history. The private contents stay private.
          </p>
        </div>
        <div className="lead-art">
          <div className="eyebrow">FIG. 01 / THE MEMORY PROBLEM</div>
          <div className="diagram-title">find_it_</div>
          <div className="diagram-core">AGENT HISTORY → LOCAL INDEX</div>
          <div className="engines">
            3 PROJECTS <span>3 SESSIONS</span>
            <br />
            1,007 SEGMENTS <span>988 INDEXED</span>
            <br />
            STARTUP <span>94 ms</span>
          </div>
          <div className="eyebrow">
            CODEX SLICE / SQLITE / SEARCH <span>01—03</span>
          </div>
        </div>
      </section>
      <section className="home-folklore" aria-labelledby="folklore-heading">
        <div className="section-title">
          <h2 id="folklore-heading">
            Machine Folklore <i>/ issue 001</i>
          </h2>
          <span className="small">EDITORIAL ART / NOT EVIDENCE</span>
        </div>
        <EditorialArt
          src="/art/toolglass-folklore-001.webp"
          alt="A punched card, tape reel, CRT terminal, database cylinder and floppy disk interact in one strange technical museum apparatus linked by cables and plotted lines."
          caption="A short history of computers, drawn as one machine with too much memory."
          kind="CONCEPT PLATE / TOOLGLASS"
          priority
          width={2172}
          height={724}
        />
      </section>
      <section className="section">
        <div className="section-title">
          <h2>
            Recent reviews <i>&amp; scouting notes</i>
          </h2>
          <a href={sitePath('/reviews')}>The full index ↗</a>
        </div>
        <div className="recent-grid">
          {[
            [
              'tracelet',
              '01',
              'Watch the agent. Not the spinner.',
              'A local view into the calls, prompts and pauses behind an AI run.',
            ],
            [
              'outl',
              '02',
              'Your notes. Still your files.',
              'An outliner that puts plain Markdown at the centre of the bargain.',
            ],
            [
              'chrondb',
              '03',
              'What if your database could rewind?',
              'Git-style history is a compelling idea. Compatibility is the harder question.',
            ],
            ].map(([slug, n, title, desc]) => (
            <a className="story" href={sitePath('/reviews/' + slug)} key={slug}>
              <MachineGlyph name={slug === 'tracelet' ? 'prompt' : slug === 'outl' ? 'folder' : 'branch'} size={30} className="story-glyph" />
              <p className="eyebrow">
                {n} / {slug} <span className="badge">SCOUTED</span>
              </p>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="story-arrow">↗</span>
            </a>
          ))}
        </div>
      </section>
      <section className="frontier">
        <div className="frontier-stamp" aria-hidden="true">
          <span>FRESH SIGNALS</span>
          <strong>01</strong>
        </div>
        <div>
          <p className="eyebrow">FRESH SIGNALS / FRONTIER SOFTWARE</p>
          <h2>What if “done” had to be proved?</h2>
          <p className="frontier-dek">{atlas.summary}</p>
          <div className="signal-grid">
            <a className="signal" href={sitePath('/reviews/atlas')}>
              <span className="eyebrow">
                ATLAS / AGENT RELIABILITY{' '}
                <span className="badge">INSPECTED</span>
              </span>
              <h3>Task completion becomes a state that software can check.</h3>
              <span className="signal-arrow">Read the Fresh Signal ↗</span>
            </a>
            <div className="signal signal-note">
              <span className="eyebrow">THE DISTINCTION</span>
              <h3>
                29 focused tests passed. The live agent loop remains unfinished.
              </h3>
              <span className="signal-arrow">
                Present gates ≠ complete product
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="notebook-feature">
        <div>
          <p className="eyebrow">NOTEBOOK / SCOUT NOTE READY</p>
          <h2>{termai.headline}</h2>
          <p>{termai.summary}</p>
          <a className="read-link" href={sitePath('/reviews/termai')}>
            Read the build-blocked note ↗
          </a>
        </div>
        <div className="notebook-receipt" aria-label="TermAI evidence summary">
          <span>TERMAI / WINDOWS BENCH</span>
          <strong>BUILD BLOCKED</strong>
          <span>BEFORE FIRST LAUNCH</span>
          <span>NO CREDENTIALS · NO RUNTIME</span>
        </div>
      </section>
      <section className="discovery">
        <div>
          <p className="eyebrow">THE OVERLOOKED</p>
          <h2>
            Why isn’t
            <br />
            this <em>famous?</em>
          </h2>
          <p>Good software doesn’t always have a marketing department.</p>
          <a className="read-link" href={sitePath('/reviews/mcp')}>
            mcp: a protocol meets the command line ↗
          </a>
        </div>
        <div className="under">
          <p className="eyebrow">SMALL FOLLOWING. OPEN QUESTIONS.</p>
          <h2>
            Under 500<span className="star">★</span>
          </h2>
          <p>
            From our first scouting list. Star counts are discovery snapshots,
            not quality scores or live totals.
          </p>
          {[
            ['pad-local', 'pad.local', '10'],
            ['gitdesktop', 'GitDesktop', '175'],
            ['jbundle', 'jbundle', '179'],
          ].map(([slug, name, stars]) => (
            <a className="index-row" key={slug} href={sitePath('/reviews/' + slug)}>
              <span>{name}</span>
              <span>{stars}★ at discovery ↗</span>
            </a>
          ))}
        </div>
      </section>
      <section className="oddware-grid">
        <div className="oddware">
          <p className="eyebrow">ODDWARE / FIELD NOTE 001</p>
          <div className="oddware-mark" aria-hidden="true">
            <span>∞</span>
            <span>⌁</span>
          </div>
          <h2>A desk that refuses to be a window.</h2>
          <p>
            pad.local turns the desktop into an infinite canvas for editors,
            terminals and browsers. It may be a brilliant working surface, or
            one more map to maintain. That is exactly the sort of experiment we
            like finding.
          </p>
          <a className="read-link" href={sitePath('/reviews/pad-local')}>
            Inspect the oddball ↗
          </a>
        </div>
        <aside className="house-ad">
          <p className="ad-label">ADVERTISEMENT / EXAMPLE SPACE</p>
          <div className="ad-kicker">A NOTE FROM THE EDITORIAL DESK</div>
          <h3>Make room for the tools you actually use.</h3>
          <p>
            A reserved page in a technical magazine for software, hardware and
            books that a Toolglass reader might plausibly want.
          </p>
          <span className="ad-foot">
            RELEVANT. RESTRAINED. CLEARLY LABELLED.
          </span>
        </aside>
      </section>
      <section className="lab">
        <p className="eyebrow">TOOLGLASS LAB / NOTEBOOK 001</p>
        <h2>
          A claim is where we start.
          <br />
          Evidence is where we’re going.
        </h2>
        <div>
          <p>
            Three pieces now carry distinct evidence: one tested, one inspected
            with focused harness results, and one blocked before launch. Eight
            seeded projects remain clearly labelled scouting notes.
          </p>
          <a className="read-link" href={sitePath('/about#evidence')}>
            How we review software ↗
          </a>
        </div>
      </section>
    </>
  );
}
