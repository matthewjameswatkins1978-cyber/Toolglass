import fs from 'node:fs';
import path from 'node:path';

export type RadarStatus = 'SPOTTED' | 'DESK REVIEW' | 'HANDS-ON' | 'PROMOTED';
export type RadarSection = { heading: string; paragraphs: string[] };
export type RadarEntry = {
  slug: string;
  name: string;
  headline: string;
  standfirst: string;
  status: RadarStatus;
  publishedAt: string;
  discoveredAt: string;
  category: string;
  tags: string[];
  homepage?: string;
  repo?: string;
  version?: string;
  licence?: string;
  platforms?: string[];
  tested: boolean;
  evidence: string;
  body: RadarSection[];
  verdict: string;
  nextStep?: string;
  sourceUrls: string[];
  image: { src: string; alt: string; caption?: string; kind: string };
  automation?: { generated: boolean; model?: string; runId?: string };
  promotedReviewSlug?: string;
};

function loadEntries(): RadarEntry[] {
  const directory = path.join(process.cwd(), 'content', 'radar');
  return fs.readdirSync(directory).filter((file) => file.endsWith('.json')).map((file) => {
    const entry = JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8')) as RadarEntry;
    if (!entry.slug || !entry.name || !entry.headline || !entry.status || !entry.image?.src) {
      throw new Error(`Invalid Radar entry: ${file}`);
    }
    return entry;
  }).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export const radarEntries = loadEntries();
export const radarBySlug = (slug: string) => radarEntries.find((entry) => entry.slug === slug);
