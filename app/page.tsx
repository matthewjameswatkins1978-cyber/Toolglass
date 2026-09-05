import Link from 'next/link';
export default function Home() {
  return (
    <>
      <div className="issue-line">
        <span>ISSUE 001 / SEPTEMBER 2026</span>
        <span>Independent eyes. Interesting software.</span>
      </div>
      <section className="lead">
        <div>
          <p className="eyebrow">
            THE LEAD / DATABASE TOOLS <span className="badge">SCOUTED</span>
          </p>
          <h1>
            A whole database
            <br />
            workbench.
            <br />
            <em>One terminal.</em>
          </h1>
          <p className="dek">
            narwhal brings an unusually ambitious toolkit to a very small
            window. The interesting question is how much of your working day it
            could replace.
          </p>
          <Link className="read-link" href="/reviews/narwhal">
            Read the scouting note ↗
          </Link>
          <p className="small">
            No hands-on verdict yet. Here’s what deserves a closer look.
          </p>
        </div>
        <div className="lead-art">
          <div className="eyebrow">FIG. 01 / THE WORKBENCH</div>
          <div className="diagram-title">narwhal_</div>
          <div className="diagram-core">DATABASES → ONE INTERFACE</div>
          <div className="engines">
            PostgreSQL <span>MySQL</span>
            <br />
            SQLite <span>DuckDB</span>
            <br />
            ClickHouse <span>SQL Server</span>
          </div>
          <div className="eyebrow">
            SQL / SCHEMA / MCP <span>01—06</span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-title">
          <h2>
            Recent reviews <i>& scouting notes</i>
          </h2>
          <Link href="/reviews">The full index ↗</Link>
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
            <Link className="story" href={'/reviews/' + slug} key={slug}>
              <p className="eyebrow">
                {n} / {slug} <span className="badge">SCOUTED</span>
              </p>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="story-arrow">↗</span>
            </Link>
          ))}
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
          <Link className="read-link" href="/reviews/mcp">
            mcp: a protocol meets the command line ↗
          </Link>
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
            <Link className="index-row" key={slug} href={'/reviews/' + slug}>
              <span>{name}</span>
              <span>{stars}★ at discovery ↗</span>
            </Link>
          ))}
        </div>
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
            Eight projects on the bench list. No completed hands-on tests. Every
            entry tells you exactly how far we’ve got.
          </p>
          <Link className="read-link" href="/about#evidence">
            How we review software ↗
          </Link>
        </div>
      </section>
    </>
  );
}
