import type { Metadata } from 'next';
import { radarEntries } from '@/content/radar';
import { sitePath } from '@/lib/utils';
/* eslint-disable @next/next/no-img-element */

export const metadata: Metadata = {
  title: 'Radar',
  description: 'Fresh signals from the edges of computing. Public evidence first; hands-on claims clearly marked.',
};

export default function RadarPage() {
  return <>
    <div className="radar-intro">
      <div><p className="eyebrow">TOOLGLASS RADAR / LIVE SIGNAL</p><h1>Things worth<br /><em>noticing.</em></h1></div>
      <p className="dek">A quicker, lighter stream of software we have found in the wild. Radar entries are source-led until the evidence says otherwise.</p>
    </div>
    <div className="radar-ledger" aria-label="Radar entries">
      {radarEntries.map((entry, index) => <a className="radar-card" href={sitePath(`/radar/${entry.slug}`)} key={entry.slug}>
        <div className="radar-card-top"><span>{String(index + 1).padStart(2, '0')} / {entry.category}</span><b>{entry.status}</b></div>
        <img src={sitePath(entry.image.src)} alt={entry.image.alt} loading="lazy" />
        <h2>{entry.headline}</h2><p>{entry.standfirst}</p>
        <div className="radar-card-foot"><span>{entry.tags.join(' · ')}</span><span>Read signal ↗</span></div>
      </a>)}
    </div>
    <div className="radar-note"><p className="eyebrow">EDITORIAL RULE</p><p>Radar may publish nothing on a scheduled run. It is here to find the unusual, not to fill a quota.</p><a href={sitePath('/about#evidence')}>How Toolglass labels evidence ↗</a></div>
  </>;
}
