import EditorialArt from '@/components/EditorialArt';
import { issueDateLabel, magazine } from '@/content/magazine';
import type { Story } from '@/content/magazine-selection.mjs';
import { sitePath } from '@/lib/utils';
import './magazine.css';

function StoryList({ stories }: { stories: Story[] }) {
  return (
    <ul className="magazine-list">
      {stories.map((story) => (
        <li key={story.href}>
          <p className="eyebrow">{story.label}</p>
          <a href={sitePath(story.href)}>{story.title}</a>
          <p>{story.summary}</p>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const { issue, lead, profile, discoveries, radar, reviews } = magazine;
  return (
    <div className="magazine">
      <div className="magazine-nav">
        {issue && <time dateTime={issue.date}>{issueDateLabel(issue.date)}</time>}
        <a href={sitePath(issue ? `/issues/#${issue.date}` : '/issues/')}>Issue contents ↗</a>
      </div>
      {lead ? (
        <section className="magazine-lead" aria-labelledby="cover-lead">
          <div>
            <p className="eyebrow">{lead.label}</p>
            <h1 id="cover-lead"><a href={sitePath(lead.href)}>{lead.title}</a></h1>
            <p className="magazine-deck">{lead.summary}</p>
            {lead.readingTime && <p className="small">{lead.readingTime}</p>}
          </div>
          {lead.art && <EditorialArt {...lead.art} priority />}
        </section>
      ) : <h1>Toolglass</h1>}

      {(profile || discoveries.length > 0) && (
        <div className="magazine-middle">
          {profile && (
            <section className="magazine-profile" aria-labelledby="cover-profile">
              <div>
                <p className="eyebrow">{profile.label}</p>
                <h2 id="cover-profile"><a href={sitePath(profile.href)}>{profile.title}</a></h2>
                <p>{profile.summary}</p>
              </div>
              {profile.art && <EditorialArt {...profile.art} />}
            </section>
          )}
          {discoveries.length > 0 && (
            <section className="magazine-desk" aria-labelledby="cover-discoveries">
              <h2 id="cover-discoveries">Discoveries</h2>
              <StoryList stories={discoveries} />
            </section>
          )}
        </div>
      )}

      {(radar.length > 0 || reviews.length > 0) && (
        <div className="magazine-back">
          {radar.length > 0 && (
            <section aria-labelledby="cover-radar">
              <h2 id="cover-radar"><a href={sitePath('/radar/')}>Radar</a></h2>
              <StoryList stories={radar} />
            </section>
          )}
          {reviews.length > 0 && (
            <section className="magazine-desk" aria-labelledby="cover-reviews">
              <h2 id="cover-reviews"><a href={sitePath('/reviews/')}>Reviews & scouting notes</a></h2>
              <StoryList stories={reviews} />
            </section>
          )}
        </div>
      )}

      <section className="magazine-folklore" aria-labelledby="cover-folklore">
        <h2 id="cover-folklore">Machine Folklore</h2>
        <EditorialArt
          src="/art/toolglass-folklore-001.webp"
          alt="A punched card, tape reel, CRT terminal, database cylinder and floppy disk linked by cables and plotted lines."
          caption="A short history of computers, drawn as one machine with too much memory."
          kind="CONCEPT PLATE / TOOLGLASS"
          width={2172}
          height={724}
        />
      </section>
    </div>
  );
}
