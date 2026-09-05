import type { Metadata } from 'next';
import Link from 'next/link';
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
          <Link className="masthead" href="/" aria-label="Toolglass home">
            TOOLGLASS<span className="brand-dot">↗</span>
          </Link>
          <div className="navline">
            <p>Software worth finding.</p>
            <nav aria-label="Main navigation">
              <Link href="/">Front page</Link>
              <Link href="/reviews">Reviews</Link>
              <Link href="/about">About / Methodology</Link>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer>
          <Link className="footer-brand" href="/">
            TOOLGLASS
          </Link>
          <p>
            Software worth finding.
            <br />
            Judgement worth explaining.
          </p>
          <Link href="/about">Our editorial approach ↗</Link>
          <span className="small">© 2026 TOOLGLASS</span>
        </footer>
      </body>
    </html>
  );
}
