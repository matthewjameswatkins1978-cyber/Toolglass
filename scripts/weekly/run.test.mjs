import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildWeeklyReport } from './run.mjs';

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'toolglass-weekly-'));
  fs.mkdirSync(path.join(root, 'content/radar'), { recursive: true });
  fs.mkdirSync(path.join(root, 'editorial/inbox'), { recursive: true });
  fs.writeFileSync(path.join(root, 'content/reviews.ts'), 'export const reviews = [{ "slug": "covered", "repo": "https://example.org/covered" }];');
  fs.writeFileSync(path.join(root, 'content/radar/known.json'), JSON.stringify({ slug: 'known', repo: 'https://example.org/radar', sourceUrls: ['https://example.org/radar'] }));
  fs.writeFileSync(path.join(root, 'editorial/inbox/pending.md'), '---\ntitle: Pending project\nslug: pending\nstatus: HOLD\nrepo: https://example.org/pending\n---\n');
  return root;
}

test('dry run is a successful no-publication receipt when there are no candidates', () => {
  const root = fixture();
  fs.rmSync(path.join(root, 'editorial/inbox/pending.md'));
  const report = buildWeeklyReport(root, { now: new Date('2026-10-05T09:17:00Z') });
  assert.equal(report.receipt.result, 'NO_PUBLICATION');
  assert.equal(report.receipt.published_items.length, 0);
  assert.equal(report.receipt.run_id, 'toolglass-weekly-2026-10-05');
});

test('duplicate candidates are rejected and the shortlist is bounded', () => {
  const root = fixture();
  const urls = [
    'https://example.org/covered', 'https://example.org/radar',
    ...Array.from({ length: 8 }, (_, i) => `https://new.example/${i}`),
  ];
  const report = buildWeeklyReport(root, { suppliedUrls: urls });
  assert.equal(report.rejected.filter((item) => item.reason === 'duplicate').length, 2);
  assert.equal(report.selected.length, 3);
  assert.equal(report.receipt.result, 'EDITORIAL_NUDGE');
  assert.equal(report.receipt.published_items.length, 0);
});

test('invalid and non-HTTP candidates fail closed', () => {
  const root = fixture();
  fs.rmSync(path.join(root, 'editorial/inbox/pending.md'));
  const report = buildWeeklyReport(root, { suppliedUrls: ['file:///private/key', 'not a URL'] });
  assert.equal(report.selected.length, 0);
  assert.equal(report.rejected.length, 2);
  assert.ok(report.rejected.every((item) => item.reason === 'invalid or non-HTTP URL'));
});

test('previous receipt sources are deduplicated on later weeks', () => {
  const report = buildWeeklyReport(fixture(), { previousUrls: ['https://example.org/pending?tracking=old'] });
  assert.equal(report.selected.length, 0);
  assert.equal(report.rejected[0].reason, 'duplicate');
});

test('URLs with credentials are rejected and query data is never retained', () => {
  const root = fixture();
  fs.rmSync(path.join(root, 'editorial/inbox/pending.md'));
  const report = buildWeeklyReport(root, { suppliedUrls: ['https://person:secret@example.org/private', 'https://example.net/path?token=secret'] });
  assert.equal(report.selected.length, 1);
  assert.equal(report.selected[0].source_url, 'https://example.net/path');
  assert.equal(JSON.stringify(report.receipt).includes('person:secret'), false);
  assert.equal(JSON.stringify(report.receipt).includes('token=secret'), false);
});

test('candidate metadata containing a local filesystem path stops before the receipt', () => {
  const root = fixture();
  fs.writeFileSync(path.join(root, 'editorial/inbox/local-path.md'), '---\ntitle: C:\\Users\\Matthew\\private\nslug: local-path\nstatus: DRAFT\nrepo: https://example.org/local-path\n---\n');
  assert.throws(() => buildWeeklyReport(root), /possible private local path/);
});

test('UK weekly date follows Europe/London local Monday across daylight time', () => {
  const summer = buildWeeklyReport(fixture(), { now: new Date('2026-07-06T09:17:00Z') });
  const winter = buildWeeklyReport(fixture(), { now: new Date('2026-12-07T10:17:00Z') });
  assert.equal(summer.receipt.run_id, 'toolglass-weekly-2026-07-06');
  assert.equal(winter.receipt.run_id, 'toolglass-weekly-2026-12-07');
});