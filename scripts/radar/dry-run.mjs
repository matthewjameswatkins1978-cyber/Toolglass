import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const stateFile = path.join(root, 'radar', 'state.json');
const entries = fs.readdirSync(path.join(root, 'content', 'radar')).filter((file) => file.endsWith('.json'));
const result = { runAt: new Date().toISOString(), mode: 'dry-run', candidateCount: entries.length, shortlistCount: Math.min(entries.length, 5), result: entries.length ? 'PUBLISHED_FIXTURES_ONLY' : 'NO QUALIFYING CANDIDATE', note: 'Offline fixture dry-run. No network, AI, commit or deploy performed.' };
fs.mkdirSync(path.dirname(stateFile), { recursive: true });
fs.writeFileSync(stateFile, `${JSON.stringify({ ...result, nextDueAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() }, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
