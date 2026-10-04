import { notFound } from 'next/navigation';
import { articles } from '@/content/articles-all';
import { sitePath } from '@/lib/utils';
import { publicSiteUrl } from '@/lib/site';
import EditorialArt from '@/components/EditorialArt';
import AnvilDiagram from '@/components/AnvilDiagram';

function MagazinePullQuote({
  quote,
  attribution,
}: {
  quote: string;
  attribution?: string;
}) {
  return (
    <figure className="article-pullquote magazine-pullquote">
      <blockquote>{quote}</blockquote>
      {attribution ? <figcaption>{attribution}</figcaption> : null}
    </figure>
  );
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return { title: 'Not found' };

  const canonical = `${publicSiteUrl}/articles/${article.slug}/`;

  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      url: canonical,
      publishedTime: new Date(
        `${article.publishedDate} 12:00:00 GMT`,
      ).toISOString(),
      authors: [article.byline],
      ...(article.heroImage ? { images: [sitePath(article.heroImage.src)] } : {}),
    },
    twitter: {
      card: 'summary',
      title: article.title,
      description: article.summary,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  const publishedIso = new Date(
    `${article.publishedDate} 12:00:00 GMT`,
  ).toISOString();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    datePublished: publishedIso,
    dateModified: publishedIso,
    mainEntityOfPage: `${publicSiteUrl}/articles/${article.slug}/`,
    author: {
      '@type': 'Person',
      name: 'Matthew Watkins',
      url: 'https://github.com/matthewjameswatkins1978-cyber',
    },
    contributor: {
      '@type': 'SoftwareApplication',
      name: 'ChatGPT',
      applicationCategory: 'AI assistant',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Toolglass',
      url: `${publicSiteUrl}/`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="page-intro article-page-intro">
        <p className="eyebrow">{article.kicker}</p>
        <h1>{article.title}</h1>
        <p className="dek">{article.subtitle}</p>
        <p className="small">
          {article.byline} / {article.publishedDate} / {article.readingTime}
        </p>
      </div>

      {article.heroImage ? (
        <section className="home-folklore" aria-label="Article illustration">
          <EditorialArt
            src={article.heroImage.src}
            alt={article.heroImage.alt}
            caption={article.heroImage.caption}
            kind={article.heroImage.kind}
            priority
            width={article.heroImage.width}
            height={article.heroImage.height}
          />
        </section>
      ) : null}

      <div className="article-grid magazine-article-grid">
        <article className="prose magazine-article">
          <div className="magazine-intro">
            {article.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {article.thesis ? (
            <aside className="article-thesis" aria-label="Article thesis">
              <p className="eyebrow">THE THESIS</p>
              <p>{article.thesis}</p>
            </aside>
          ) : null}
          {article.sections.map((section) => (
            <section
              key={section.heading}
              className={
                section.heading.startsWith('Act ') ? 'magazine-act' : undefined
              }
            >
              <h2>{section.heading}</h2>

              {section.blocks ? (
                section.blocks.map((block, index) => {
                  if (block.type === 'quote') {
                    return <blockquote key={`${section.heading}-${index}`}>{block.text}</blockquote>;
                  }
                  if (block.type === 'code') {
                    return (
                      <pre key={`${section.heading}-${index}`}>
                        <code>{block.text}</code>
                      </pre>
                    );
                  }
                  return <p key={`${section.heading}-${index}`}>{block.text}</p>;
                })
              ) : (
                section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))
              )}
              {section.diagram ? <AnvilDiagram diagram={section.diagram} /> : null}
              {section.pullQuote ? (
                <MagazinePullQuote
                  quote={
                    typeof section.pullQuote === 'string'
                      ? section.pullQuote
                      : section.pullQuote.quote
                  }
                  attribution={
                    typeof section.pullQuote === 'string'
                      ? undefined
                      : section.pullQuote.attribution
                  }
                />
              ) : null}
            </section>
          ))}

          {article.sources.length > 0 ? (
            <>
              <h2>{article.sourcesHeading ?? 'Research & sources'}</h2>
              <p>
                {article.sourcesIntro ??
                  'This is an argument grounded in cited primary rules and research. Sources below support the factual claims; where the piece moves from evidence to inference, it says so.'}
              </p>
              <ul>
                {article.sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href}>{source.label} ↗</a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {article.relatedReading?.length ? (
            <section className="related-reading" aria-labelledby="related-reading-title">
              <p className="eyebrow">AFTER THE ANVIL</p>
              <h2 id="related-reading-title">Read more</h2>
              <ul>
                {article.relatedReading.map((item) => (
                  <li key={item.href}>
                    <a href={sitePath(item.href)}>{item.title} <span aria-hidden="true">↗</span></a>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          <div className="article-nav">
            <a href={sitePath('/articles')}>← Back to articles</a>
          </div>

          <div className="support-prompt">
            <p className="eyebrow">KEEPING THE DESK OPEN</p>
            <p>
              Toolglass is a small independent publication about software,
              technology and the ideas growing around them.
            </p>
            <a className="read-link" href="https://ko-fi.com/matmusmeows">
              Support Toolglass ↗
            </a>
          </div>
        </article>

        <aside aria-label="Article notes">
          <p className="eyebrow">
            ARTICLE / {String(articles.findIndex((item) => item.slug === article.slug) + 1).padStart(3, '0')}
          </p>
          <dl className="facts">
            {(article.notes ?? [
              ['Type', article.kicker],
              ['Published', article.publishedDate],
              ['Byline', article.byline],
              ['Reading time', article.readingTime],
            ]).map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          {article.toolbox ? (
            <section className="toolbox-notes" aria-label="Joe's toolbox, translated">
              <h2>Joe&apos;s toolbox, translated</h2>
              <dl>
                {article.toolbox.map((item) => (
                  <div key={item.term}>
                    <dt>{item.term}</dt>
                    <dd>{item.description}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}
        </aside>
      </div>
    </>
  );
}
