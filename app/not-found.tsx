import Link from 'next/link';
import { sitePath } from '@/lib/utils';
export default function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">404 / NOT IN THIS ISSUE</p>
      <h1>That page is off the shelf.</h1>
      <p>Try the index for our current reviews and scouting notes.</p>
      <Link className="read-link" href={sitePath('/reviews')}>
        Back to the index ↗
      </Link>
    </section>
  );
}
