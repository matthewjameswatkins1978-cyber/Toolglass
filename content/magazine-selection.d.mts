export type Story = {
  slug: string;
  department: 'articles' | 'radar' | 'reviews';
  role?: string;
  status: 'published' | 'draft';
  date: string;
  href: string;
  title: string;
  summary: string;
  label: string;
  art?: { src: string; alt: string; caption: string; kind?: string; width?: number; height?: number };
  readingTime?: string;
};

export type Edition = { lead?: string; profile?: string; discoveries?: string[] };
export type Issue = { date: string; stories: Story[]; signals: Story[]; lead?: Story };

export function newestFirst<T extends Pick<Story, 'date' | 'href'>>(entries: T[]): T[];
export function composeMagazine(entries: Story[], editions?: Record<string, Edition>): {
  issues: Issue[];
  issue?: Issue;
  lead?: Story;
  profile?: Story;
  discoveries: Story[];
  radar: Story[];
  reviews: Story[];
};
export function publicationDate(value: string): string;
