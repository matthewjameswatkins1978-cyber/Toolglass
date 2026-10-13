import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assessCandidates } from './model.mjs';

const root = process.cwd();
const MAX_CANDIDATES = 20;
const MAX_SHORTLIST = 3;

function mondayInLondon(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short',
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const date = new Date(`${values.year}-${values.month}-${values.day}T00:00:00Z`);
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(values.weekday);
  date.setUTCDate(date.getUTCDate() - ((weekday + 6) % 7));
  return date.toISOString().slice(0, 10);
}

function normaliseUrl(value) {
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return null;
    url.hash = '';
    url.search = '';
    url.hostname = url.hostname.toLowerCase();
    if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/, '');
    return url.toString().replace(/\/$/, '');
  } catch {
    return null;
  }
}

function markdownEscape(value) {
  return Array.from(String(value), (character) => (
    '`*_{}[]()#+.!|>-'.includes(character) ? `\\${character}` : character
  )).join('');
}

function parseFrontMatter(markdown) {
  const match = markdown.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  return Object.fromEntries([...match[1].matchAll(/^([\w-]+):\s*(.*?)\s*$/gm)].map((item) => [item[1], item[2].replace(/^['"]|['"]$/g, '')]));
}

function candidatesFromRepository(repository, suppliedUrls = [], previousUrls = []) {
  const candidates = [];
  const rejected = [];
  const knownSlugs = new Set();
  const knownUrls = new Set();
  for (const value of previousUrls) {
    const url = normaliseUrl(value);
    if (url) knownUrls.add(url);
  }

  const reviewSource = fs.readFileSync(path.join(repository, 'content/reviews.ts'), 'utf8');
  for (const match of reviewSource.matchAll(/"slug":\s*"([^"]+)"[\s\S]{0,1800}?"repo":\s*"([^"]*)"/g)) {
    knownSlugs.add(match[1].toLowerCase());
    const url = normaliseUrl(match[2]);
    if (url) knownUrls.add(url);
  }

  for (const filename of fs.readdirSync(path.join(repository, 'content/radar')).filter((name) => name.endsWith('.json'))) {
    const record = JSON.parse(fs.readFileSync(path.join(repository, 'content/radar', filename), 'utf8'));
    knownSlugs.add(String(record.slug ?? '').toLowerCase());
    for (const source of record.sourceUrls ?? []) {
      const url = normaliseUrl(source);
      if (url) knownUrls.add(url);
    }
    const url = normaliseUrl(record.repo || record.homepage);
    if (url) knownUrls.add(url);
  }

  const inbox = path.join(repository, 'editorial/inbox');
  for (const filename of fs.readdirSync(inbox).filter((name) => name.endsWith('.md')).sort()) {
    const source = fs.readFileSync(path.join(inbox, filename), 'utf8');
    const fields = parseFrontMatter(source);
    const slug = String(fields.slug ?? path.basename(filename, '.md')).toLowerCase();
    const sourceUrl = normaliseUrl(fields.repo || fields.source_url || fields.url || '');
    if (knownSlugs.has(slug) || (sourceUrl && knownUrls.has(sourceUrl))) {
      rejected.push({ id: slug, reason: 'duplicate' });
      continue;
    }
    if (fields.status && !['DRAFT', 'NEEDS EDIT', 'EDITING', 'INVESTIGATE', 'HOLD'].includes(fields.status.toUpperCase())) {
      rejected.push({ id: slug, reason: 'not an active candidate' });
      continue;
    }
    candidates.push({ id: slug, title: fields.title || slug, source_url: sourceUrl, source: `editorial/inbox/${filename}`, state: fields.status || 'DRAFT' });
  }

  for (const [index, value] of suppliedUrls.entries()) {
    const sourceUrl = normaliseUrl(value);
    if (!sourceUrl) {
      rejected.push({ id: `manual-input-${index + 1}`, reason: 'invalid or non-HTTP URL' });
    } else if (knownUrls.has(sourceUrl) || candidates.some((candidate) => candidate.source_url === sourceUrl)) {
      rejected.push({ id: sourceUrl, reason: 'duplicate' });
    } else {
      const hostname = new URL(sourceUrl).hostname;
      candidates.push({ id: sourceUrl, title: hostname, source_url: sourceUrl, source: 'manual input', state: 'TRIAGE REQUIRED' });
    }
  }

  candidates.sort((a, b) => a.id.localeCompare(b.id));
  for (const candidate of candidates.slice(MAX_CANDIDATES)) rejected.push({ id: candidate.id, reason: 'candidate limit reached' });
  return { candidates: candidates.slice(0, MAX_CANDIDATES), rejected };
}

export function buildWeeklyReport(repository = root, { now = new Date(), suppliedUrls = [], previousUrls = [], mode = 'dry-run' } = {}) {
  if (!['dry-run', 'nudge'].includes(mode)) throw new Error('mode must be dry-run or nudge');
  const scheduledFor = mondayInLondon(now);
  const { candidates, rejected } = candidatesFromRepository(repository, suppliedUrls, previousUrls);
  const selected = candidates.slice(0, MAX_SHORTLIST);
  const intakeText = JSON.stringify({ selected, rejected });
  if (/(?:[A-Z]:\\\\Users\\\\|\/home\/[^/]+\/|\/Users\/[^/]+\/)/i.test(intakeText)) {
    throw new Error('Candidate metadata contains a possible private local path.');
  }
  const startedAt = now.toISOString();
  const receipt = {
    schema_version: 1,
    run_id: `toolglass-weekly-${scheduledFor}`,
    scheduled_for: `${scheduledFor} 10:17 Europe/London`,
    started_at: startedAt,
    completed_at: startedAt,
    source_commit: process.env.GITHUB_SHA || 'local',
    result: selected.length ? 'EDITORIAL_NUDGE' : 'NO_PUBLICATION',
    candidates_considered: candidates.length + rejected.length,
    candidates_rejected: rejected,
    selected_items: selected,
    published_items: [],
    blocked_items: [],
    evidence_summary: 'Candidate metadata only; no live research or testing performed.',
    editorial_verdicts: [],
    deterministic_checks: { candidate_bound: candidates.length <= MAX_CANDIDATES, shortlist_bound: selected.length <= MAX_SHORTLIST, secrets_or_private_paths_included: false },
    visual_check: 'not applicable; no publication generated',
    publication_commit: null,
    deployment_result: 'not run',
    broadcast_result: 'not configured',
    model_provider: 'none; configured fallback D',
    warnings: ['No authenticated editorial model is configured. This run creates a bounded human-agent nudge only.', 'No claims were researched, drafted, tested, or approved.'],
    human_attention: selected.length > 0,
    mode,
  };
  return { receipt, selected, rejected };
}

export function withModelAssessment(report, assessment) {
  const receipt = {
    ...report.receipt,
    completed_at: new Date().toISOString(),
    schema_version: 2,
    publication_state: 'NO_PUBLICATION',
    editorial_verdicts: assessment.decisions,
    model_assessment: {
      provider: 'openai',
      enabled: assessment.enabled,
      status: assessment.status,
      model: assessment.model,
      api_requests: assessment.api_requests,
      candidates_assessed: assessment.candidates_assessed,
      fallback_used: assessment.fallback_used,
      error_category: assessment.error_category,
      usage: assessment.usage,
    },
    model_provider: assessment.status === 'completed' ? `openai/${assessment.model}` : 'none; configured fallback D',
    warnings: assessment.status === 'completed'
      ? ['Model output is editorial judgement, not evidence or publication authority.', 'No claims were researched, drafted, tested, approved, or published.']
      : [`Model assessment unavailable (${assessment.status}${assessment.error_category ? `: ${assessment.error_category}` : ''}); deterministic fallback retained.`, 'No claims were researched, drafted, tested, approved, or published.'],
  };
  return { ...report, receipt, assessment };
}

async function main(args) {
  const modeIndex = args.indexOf('--mode');
  const mode = modeIndex >= 0 ? args[modeIndex + 1] : 'dry-run';
  const suppliedUrls = [process.env.WEEKLY_CANDIDATE_URL, ...args.flatMap((arg, index) => arg === '--candidate-url' ? [args[index + 1]] : [])].filter(Boolean);
  const previousUrls = (process.env.WEEKLY_PREVIOUS_URLS || '').split(String.fromCharCode(10)).map((value) => value.trim()).filter(Boolean);
  const intake = buildWeeklyReport(root, { mode, suppliedUrls, previousUrls });
  const assessment = await assessCandidates(intake.selected);
  const report = withModelAssessment(intake, assessment);
  const runs = path.join(root, 'editorial/runs');
  fs.mkdirSync(runs, { recursive: true });
  const receiptPath = path.join(runs, `${report.receipt.run_id}.json`);
  fs.writeFileSync(receiptPath, `${JSON.stringify(report.receipt, null, 2)}\n`);
  const title = `Toolglass Weekly week of ${report.receipt.run_id.slice('toolglass-weekly-'.length)}`;
  const modelSummary = assessment.status === 'completed'
    ? `OpenAI ${assessment.model} assessed ${assessment.candidates_assessed} candidates. Model judgement is not evidence or publication authority.`
    : `Model assessment status: ${assessment.status}; deterministic fallback used: ${assessment.fallback_used}.`;
  const lines = [
    `# ${title}`, '',
    `Run mode: ${mode}. Result: ${report.receipt.result}. Publication state: NO_PUBLICATION.`,
    '', modelSummary, '',
    `Candidates considered: ${report.receipt.candidates_considered}. Selected for triage: ${report.selected.length}.`,
  ];
  if (report.selected.length) {
    lines.push('', '## Candidate queue', '', ...report.selected.map((item) => `- **${markdownEscape(item.title)}** — ${markdownEscape(item.source_url || item.source)} (${markdownEscape(item.state)})`));
  } else {
    lines.push('', 'No un-covered candidate cleared deterministic intake. Publishing nothing is a successful result.');
  }
  if (assessment.decisions.length) {
    lines.push('', '## Model editorial triage', '');
    for (const decision of assessment.decisions) {
      lines.push(
        `- **${markdownEscape(decision.decision)}** (${decision.confidence.toFixed(2)}) — ${markdownEscape(decision.candidate_url)}`,
        `  - Reason: ${markdownEscape(decision.reason)}`,
        `  - Angle: ${markdownEscape(decision.interesting_angle)}`,
        `  - Verify: ${markdownEscape(decision.verification_needed.join('; ') || 'nothing specified')}`,
        `  - Next source: ${markdownEscape(decision.suggested_next_source || 'not suggested')}`,
      );
    }
  }
  if (report.rejected.length) lines.push('', '## Intake rejections', '', ...report.rejected.map((item) => `- ${item.id}: ${item.reason}`));
  lines.push('', '## Durable receipt', '', '```json', JSON.stringify(report.receipt, null, 2), '```', '');
  fs.writeFileSync(path.join(runs, `${report.receipt.run_id}.md`), `${lines.join('\n')}\n`);
  console.log(JSON.stringify({ ...report, receipt_path: receiptPath, issue_title: title }, null, 2));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch(() => {
    console.error(JSON.stringify({ error: 'weekly_run_failed', publication_state: 'NO_PUBLICATION' }));
    process.exitCode = 1;
  });
}
