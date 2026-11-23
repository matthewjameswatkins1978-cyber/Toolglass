import type { Metadata } from 'next';
import { issueDateLabel, magazine } from '@/content/magazine';
import { publicSiteUrl } from '@/lib/site';
import { sitePath } from '@/lib/utils';
import '../magazine.css';

export const metadata: Metadata = {
  title: 'Issue archive',
  description: 'Browse Toolglass issues by publication date.',
  alternates: { canonical: `${publicSiteUrl}/issues/` },
};

export default function Issues() {
  return (
    <div className="magazine issue-archive">
      <h1>Issue archive</h1>
      {magazine.issues.map(({ date, lead, stories, signals }) => (
        <section id={date} key={date} aria-labelledby={`issue-${date}`}>
          <h2 id={`issue-${date}`}><time dateTime={date}>{issueDateLabel(date)}</time></h2>
          <ul className="magazine-list">
            {[...(lead ? [lead] : []), ...stories.filter((story) => story !== lead), ...signals].map((story) => (
              <li key={story.href}>
                <p className="eyebrow">{story.label}</p>
                <a href={sitePath(story.href)}>{story.title}</a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
