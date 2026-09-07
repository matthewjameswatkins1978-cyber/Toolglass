import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const directory = path.join(root, 'content', 'radar');
const allowed = new Set(['SPOTTED', 'DESK REVIEW', 'HANDS-ON', 'PROMOTED']);
const entries = fs.readdirSync(directory).filter((file) => file.endsWith('.json')).map((file) => ({ file, value: JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8')) }));
const seen = new Set();
for (const { file, value } of entries) {
  if (!value.slug || seen.has(value.slug)) throw new Error(`Radar slug missing or duplicated: ${file}`);
  if (!allowed.has(value.status)) throw new Error(`Invalid Radar status in ${file}`);
  if (value.tested && value.status === 'SPOTTED') throw new Error(`Tested entry cannot be SPOTTED: ${file}`);
  if (!value.sourceUrls?.length || !value.image?.src) throw new Error(`Evidence or image missing: ${file}`);
  seen.add(value.slug);
}
console.log(JSON.stringify({ status: 'VALID', entries: entries.length, slugs: [...seen] }, null, 2));
