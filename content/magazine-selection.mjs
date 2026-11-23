export function newestFirst(entries) {
  return [...entries].sort((a, b) => b.date.localeCompare(a.date) || a.href.localeCompare(b.href, 'en'));
}

export function composeMagazine(entries, editions = {}) {
  const published = newestFirst(entries.filter((entry) => entry.status === 'published'));
  const articles = published.filter(({ department }) => department === 'articles');
  const radar = published.filter(({ department }) => department === 'radar');
  const reviews = published.filter(({ department }) => department === 'reviews');
  const dates = [...new Set(articles.map(({ date }) => date))];
  const issues = dates.map((date) => {
    const stories = articles.filter((story) => story.date === date);
    const edition = editions[date];
    const sameDay = radar.filter((story) => story.date === date);
    const pins = edition?.discoveries;
    const pinnedSignals = pins?.map((slug) => radar.find((story) => story.slug === slug)).filter(Boolean);
    const signals = pinnedSignals?.length
      ? [...new Set(pinnedSignals), ...sameDay.filter((story) => !pinnedSignals.includes(story))]
      : sameDay;
    const lead = stories.find((story) => story.slug === edition?.lead && story.role !== 'profile')
      ?? stories.find((story) => story.role === 'feature')
      ?? stories.find((story) => story.role !== 'profile');
    return { date, stories, signals, lead };
  });
  const issue = issues[0];
  const lead = issue?.lead ?? issue?.stories[0];
  const profile = articles.find((story) => story.slug === editions[issue?.date]?.profile && story.role === 'profile' && story !== lead)
    ?? articles.find((story) => story.role === 'profile' && story !== lead);
  const discoveries = issue?.signals.slice(0, 3) ?? [];
  return {
    issues, issue, lead, profile, discoveries,
    radar: radar.filter((story) => !discoveries.includes(story)).slice(0, 4),
    reviews: reviews.slice(0, 3),
  };
}

export function publicationDate(value) {
  const date = new Date(value.includes('T') ? value : value + ' 12:00:00 GMT');
  if (!Number.isFinite(date.getTime())) throw new Error('Invalid publication date: ' + value);
  return date.toISOString();
}
