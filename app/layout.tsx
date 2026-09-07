import type { Metadata } from 'next';
import Link from 'next/link';
import { sitePath } from '@/lib/utils';
import './globals.css';
export const metadata: Metadata = {
  title: {
    default: 'TOOLGLASS — Software worth finding.',
    template: '%s | TOOLGLASS',
  },
  description:
    'An independent publication about new, overlooked and interesting software. Careful questions. Visible evidence.',
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
          <Link className="masthead" href={sitePath('/')} aria-label="Toolglass home">
            TOOLGLASS<span className="brand-dot">↗</span>
          </Link>
          <div className="navline">
            <p>Software worth finding.</p>
            <nav aria-label="Main navigation">
              <Link href={sitePath('/')}>Front page</Link>
              <Link href={sitePath('/reviews')}>Reviews</Link>
              <Link href={sitePath('/about')}>About / Methodology</Link>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer>
          <Link className="footer-brand" href={sitePath('/')}>
            TOOLGLASS
          </Link>
          <p>
            Software worth finding.
            <br />
            Judgement worth explaining.
          </p>
          <Link href={sitePath('/about')}>Our editorial approach ↗</Link>
          <span className="small">© 2026 TOOLGLASS</span>
        </footer>
      </body>
    </html>
  );
}
