'use client';

import { useMemo, useState } from 'react';
import {
  glassaryEntries,
  glassaryMarkMeta,
  glassarySlug,
} from '@/content/glassary';

const allLetters = Array.from(
  new Set(glassaryEntries.map((entry) => entry.term.charAt(0).toUpperCase())),
);

export default function GlassaryIndex() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return glassaryEntries;

    return glassaryEntries.filter((entry) => {
      const haystack = [
        entry.term,
        entry.definition,
        ...entry.detail,
        ...(entry.see ?? []),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [query]);

  const grouped = useMemo(() => {
    const groups = new Map<string, typeof glassaryEntries>();
    for (const entry of filtered) {
      const letter = entry.term.charAt(0).toUpperCase();
      const current = groups.get(letter) ?? [];
      current.push(entry);
      groups.set(letter, current);
    }
    return Array.from(groups.entries());
  }, [filtered]);

  return (
    <section className="glassary-body" id="glassary-index">
      <aside className="glassary-directory" aria-label="Glassary directory">
        <label className="glassary-search">
          <span>FIND A TERM</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. context, evidence, tool"
          />
        </label>

        <nav className="glassary-alpha" aria-label="Alphabetical Glassary index">
          {allLetters.map((letter) => (
            <a key={letter} href={`#glassary-${letter.toLowerCase()}`}>
              {letter}
            </a>
          ))}
        </nav>

        <p className="glassary-result-count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
          {query.trim() ? ' found' : ' in this edition'}
        </p>

        <div className="glassary-directory-note">
          <span className="eyebrow">HOW TO READ THE MARKS</span>
          {Object.values(glassaryMarkMeta).map((meta) => (
            <p key={meta.label}>
              <b>{meta.symbol}</b>
              <span>{meta.label}</span>
            </p>
          ))}
        </div>
      </aside>

      <div className="glassary-lexicon">
        {grouped.length ? (
          grouped.map(([letter, entries]) => (
            <section
              className="glassary-letter"
              id={`glassary-${letter.toLowerCase()}`}
              key={letter}
            >
              <header className="glassary-letterhead">
                <span>{letter}</span>
                <a href="#glassary-index">INDEX ↑</a>
              </header>

              {entries.map((entry) => {
                const meta = glassaryMarkMeta[entry.mark];
                return (
                  <article
                    className={`glassary-entry glassary-entry--${entry.mark}`}
                    id={glassarySlug(entry.term)}
                    key={entry.term}
                  >
                    <header>
                      <div className="glassary-headword">
                        <h2>{entry.term}</h2>
                        <span
                          className="glassary-mark"
                          title={`${meta.label}: ${meta.description}`}
                          aria-label={meta.label}
                        >
                          {meta.symbol}
                        </span>
                      </div>
                      <p className="glassary-definition">{entry.definition}</p>
                    </header>

                    {entry.detail.length ? (
                      <div className="glassary-detail">
                        {entry.detail.map((paragraph, index) => (
                          <p key={`${entry.term}-${index}`}>{paragraph}</p>
                        ))}
                      </div>
                    ) : null}

                    {entry.quote ? (
                      <blockquote>{entry.quote}</blockquote>
                    ) : null}

                    {entry.see?.length ? (
                      <p className="glassary-see">
                        <span>SEE ALSO</span>
                        {entry.see.map((term, index) => (
                          <span key={term}>
                            <a href={`#${glassarySlug(term)}`}>{term}</a>
                            {index < entry.see!.length - 1 ? ' · ' : ''}
                          </span>
                        ))}
                      </p>
                    ) : null}
                  </article>
                );
              })}
            </section>
          ))
        ) : (
          <div className="glassary-empty">
            <p className="eyebrow">NO MATCH / THE SHELF IS EMPTY</p>
            <h2>Nothing in the Glassary answers to that.</h2>
            <p>
              Try a broader word, or clear the search and browse the alphabet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
