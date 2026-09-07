import type { Metadata } from 'next';
import { sitePath } from '@/lib/utils';
import { publicSiteUrl } from '@/lib/site';
import NewsletterSignup from '@/components/NewsletterSignup';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(`${publicSiteUrl}/`),
  title: {
    default: 'TOOLGLASS — Software worth finding.',
    template: '%s | TOOLGLASS',
  },
  description:
    'An independent publication about new, overlooked and interesting software. Careful questions. Visible evidence.',
  alternates: {
    canonical: `${publicSiteUrl}/`,
    types: { 'application/rss+xml': `${publicSiteUrl}/feed.xml` },
  },
  openGraph: {
    title: 'TOOLGLASS — Software worth finding.',
    description:
      'An independent publication about new, overlooked and interesting software. Careful questions. Visible evidence.',
    type: 'website',
    url: `${publicSiteUrl}/`,
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <div className="topline">
            <span>AN INDEPENDENT SOFTWARE PUBLICATION</span>
            <span>VOL. 01 — THE FIRST FINDS</span>
          </div>
          <a className="masthead" href={sitePath('/')} aria-label="Toolglass home">
            TOOLGLASS<span className="brand-dot">↗</span>
          </a>
          <div className="navline">
            <p>Software worth finding.</p>
            <nav aria-label="Main navigation">
              <a href={sitePath('/')}>Front page</a>
              <a href={sitePath('/reviews')}>Reviews</a>
              <a href={sitePath('/radar')}>Radar</a>
              <a href={sitePath('/about')}>About / Methodology</a>
              <a href={sitePath('/submit')}>Submit software</a>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <NewsletterSignup />
        <footer>
          <a className="footer-brand" href={sitePath('/')}>
            TOOLGLASS
          </a>
          <p>
            Software worth finding.
            <br />
            Judgement worth explaining.
          </p>
          <a href={sitePath('/about')}>Our editorial approach ↗</a>
          <a href={sitePath('/submit')}>Submit software ↗</a>
          <a href={sitePath('/feed.xml')}>RSS feed ↗</a>
          <a href="https://ko-fi.com/matmusmeows">Support Toolglass ↗</a>
          <span className="small">© 2026 TOOLGLASS</span>
        </footer>
      </body>
    </html>
  );
}
