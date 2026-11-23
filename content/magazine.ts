import { articles } from './articles-all';
import { reviews, checkedDate } from './reviews';
import { radarEntries } from './radar';
import { composeMagazine, publicationDate } from './magazine-selection.mjs';
import type { Edition, Story } from './magazine-selection.mjs';

// A pin is scoped to the date of its issue. Later editions pick themselves.
const editions: Record<string, Edition> = {
  '2026-11-23': {
    lead: 'the-program-has-two-faces',
    profile: 'susan-graham-and-the-tools-that-look-back',
    discoveries: ['tacit', 'toka', 'clavicula-turing'],
  },
  '2026-10-26': {
    discoveries: ['sova', 'orangu', 'openai-math-atlas'],
  },
};

const day = (value: string) => publicationDate(value).slice(0, 10);

export const magazineStories: Story[] = [
  ...articles.map((article): Story => ({
    status: 'published',
    slug: article.slug,
    department: 'articles',
    role: article.slug === 'joe-armstrong-the-man-who-put-failure-to-work'
      ? 'profile'
      : article.kicker.split('/')[0].trim().toLowerCase(),
    date: day(article.publishedDate),
    href: `/articles/${article.slug}/`,
    title: article.title,
    summary: article.summary,
    label: article.kicker,
    art: article.heroImage,
    readingTime: article.readingTime,
  })),
  ...radarEntries.map((entry): Story => ({
    status: 'published',
    slug: entry.slug,
    department: 'radar',
    date: day(entry.publishedAt),
    href: `/radar/${entry.slug}/`,
    title: entry.headline,
    summary: entry.standfirst,
    label: `${entry.name} / ${entry.status}`,
  })),
  ...reviews.map((review): Story => ({
    status: 'published',
    slug: review.slug,
    department: 'reviews',
    date: day(review.reviewedDate ?? checkedDate),
    href: `/reviews/${review.slug}/`,
    title: review.headline,
    summary: review.summary,
    label: `${review.name} / ${review.evidenceStatus ?? review.status}`,
    art: review.art,
  })),
];

export const magazine = composeMagazine(magazineStories, editions);
export const issueDateLabel = (date: string) => new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'long',
  timeZone: 'UTC',
}).format(new Date(date));
