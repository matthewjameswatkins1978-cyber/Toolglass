import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { radarBySlug, radarEntries } from '@/content/radar';
import { sitePath } from '@/lib/utils';
import { publicSiteUrl } from '@/lib/site';
/* eslint-disable @next/next/no-img-element */

export function generateStaticParams() { return radarEntries.map((entry) => ({ slug: entry.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const entry = radarBySlug(slug); if (!entry) return { title: 'Not found' };
  return { title: entry.headline, description: entry.standfirst, alternates: { canonical: `${publicSiteUrl}/radar/${entry.slug}/` }, openGraph: { title: entry.headline, description: entry.standfirst, type: 'article', images: [{ url: `${publicSiteUrl}${entry.image.src}`, alt: entry.image.alt }] } };
}

export default async function RadarEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const entry = radarBySlug(slug); if (!entry) notFound();
  const structuredData = { '@context': 'https://schema.org', '@type': 'Article', headline: entry.headline, description: entry.standfirst, datePublished: entry.publishedAt, mainEntityOfPage: `${publicSiteUrl}/radar/${entry.slug}/`, author: { '@type': 'Person', name: 'Matthew Watkins' } };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <div className="page-intro radar-entry-intro"><p className="eyebrow">RADAR / {entry.category.toUpperCase()} <span className="badge">{entry.status}</span></p><h1>{entry.headline}</h1><p className="dek">{entry.standfirst}</p><p className="small">FIRST SPOTTED {new Date(entry.discoveredAt).toLocaleDateString('en-GB')} / PUBLISHED {new Date(entry.publishedAt).toLocaleDateString('en-GB')}</p></div>
    <div className="radar-entry-grid">
      <article className="prose"><figure className="radar-hero"><img src={sitePath(entry.image.src)} alt={entry.image.alt} /><figcaption><span>{entry.image.kind}</span><span>{entry.image.caption}</span></figcaption></figure>
        <div className="radar-disclosure"><strong>RADAR STATUS: {entry.status}</strong><br />{entry.evidence}<br /><span>TESTED BY TOOLGLASS: {entry.tested ? 'YES' : 'NO'}</span></div>
        {entry.body.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
        <h2>Radar verdict</h2><p>{entry.verdict}</p>{entry.nextStep && <><h2>Next step</h2><p>{entry.nextStep}</p></>}
        <h2>Sources</h2><p>{entry.sourceUrls.map((url) => <span key={url}><a href={url}>{url.replace(/^https?:\/\//, '')} ↗</a><br /></span>)}</p>
        <div className="article-nav"><a href={sitePath('/radar')}>← Back to Radar</a></div>
      </article>
      <aside><p className="eyebrow">RADAR RECEIPT / {entry.name}</p><dl className="facts"><div><dt>Evidence</dt><dd>{entry.status}</dd></div><div><dt>Version</dt><dd>{entry.version ?? 'Unknown'}</dd></div><div><dt>Platforms</dt><dd>{entry.platforms?.join(' / ') ?? 'Unknown'}</dd></div><div><dt>Licence</dt><dd>{entry.licence ?? 'Unknown'}</dd></div><div><dt>Tags</dt><dd>{entry.tags.join(' · ')}</dd></div></dl>{entry.repo && <a className="read-link" href={entry.repo}>Visit the project ↗</a>}</aside>
    </div>
  </>;
}
