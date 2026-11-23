import test from 'node:test';
import assert from 'node:assert/strict';
import { assessCandidates, DEFAULT_MODEL } from './model.mjs';
import { buildWeeklyReport, withModelAssessment } from './run.mjs';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const candidate = { title: 'Odd system', source_url: 'https://example.org/odd', state: 'DRAFT' };
function responseFor(decision = 'investigate', overrides = {}) {
  const result = {
    candidate_url: candidate.source_url,
    decision,
    confidence: 0.82,
    reason: 'An unusual mechanism merits a closer look.',
    interesting_angle: 'It uses a small local model in a surprising way.',
    verification_needed: ['Confirm the claimed mechanism in project documentation.'],
    suggested_next_source: 'The project repository and release notes.',
    ...overrides,
  };
  return {
    ok: true,
    status: 200,
    headers: { get: () => null },
    async json() {
      return {
        output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify({ decisions: [result] }) }] }],
        usage: { input_tokens: 123, output_tokens: 44, total_tokens: 167 },
      };
    },
  };
}
const fixture = () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'toolglass-model-'));
  fs.mkdirSync(path.join(root, 'content/radar'), { recursive: true });
  fs.mkdirSync(path.join(root, 'editorial/inbox'), { recursive: true });
  fs.writeFileSync(path.join(root, 'content/reviews.ts'), 'export const reviews = [];');
  return root;
};

test('valid structured model decision records bounded metadata and usage', async () => {
  let calls = 0;
  let body;
  const result = await assessCandidates([candidate], {
    apiKey: 'test-secret',
    fetchImpl: async (_url, options) => { calls += 1; body = JSON.parse(options.body); return responseFor(); },
  });
  assert.equal(calls, 1);
  assert.equal(body.model, DEFAULT_MODEL);
  assert.equal(body.max_output_tokens, 1200);
  assert.equal(body.reasoning.effort, 'low');
  assert.equal(body.text.format.strict, true);
  assert.equal(result.status, 'completed');
  assert.equal(result.api_requests, 1);
  assert.equal(result.candidates_assessed, 1);
  assert.equal(result.decisions[0].decision, 'investigate');
  assert.deepEqual(result.usage, { input_tokens: 123, output_tokens: 44, total_tokens: 167 });
  assert.equal(result.fallback_used, false);
});

test('reject and show_and_tell are accepted finite decisions', async () => {
  for (const decision of ['reject', 'show_and_tell']) {
    const result = await assessCandidates([candidate], { apiKey: 'test-secret', fetchImpl: async () => responseFor(decision) });
    assert.equal(result.decisions[0].decision, decision);
  }
});

test('malformed or mismatched structured output fails closed to fallback', async () => {
  const result = await assessCandidates([candidate], {
    apiKey: 'test-secret',
    fetchImpl: async () => ({ ok: true, async json() { return { output: [{ type: 'message', content: [{ type: 'output_text', text: '{"decisions":[]}' }] }] }; } }),
  });
  assert.equal(result.status, 'invalid_output');
  assert.equal(result.fallback_used, true);
  assert.equal(result.decisions.length, 0);
});

test('missing key makes no API call and retains the fallback', async () => {
  let calls = 0;
  const result = await assessCandidates([candidate], { apiKey: '', fetchImpl: async () => { calls += 1; } });
  assert.equal(calls, 0);
  assert.equal(result.status, 'missing_key');
  assert.equal(result.fallback_used, true);
});

test('an explicitly disabled model makes no API call even when a key exists', async () => {
  let calls = 0;
  const result = await assessCandidates([candidate], { apiKey: 'test-secret', enabled: false, fetchImpl: async () => { calls += 1; } });
  assert.equal(calls, 0);
  assert.equal(result.status, 'disabled');
  assert.equal(result.enabled, false);
  assert.equal(result.fallback_used, true);
});

test('authentication failure is categorized without returning provider text', async () => {
  const result = await assessCandidates([candidate], {
    apiKey: 'test-secret',
    fetchImpl: async () => ({ ok: false, status: 401, async text() { return 'Bearer test-secret'; } }),
  });
  assert.equal(result.status, 'failed');
  assert.equal(result.error_category, 'authentication');
  assert.equal(JSON.stringify(result).includes('test-secret'), false);
});

test('transient failure retries once and then succeeds', async () => {
  let calls = 0;
  const delays = [];
  const result = await assessCandidates([candidate], {
    apiKey: 'test-secret',
    sleepImpl: async (delay) => delays.push(delay),
    fetchImpl: async () => (++calls === 1 ? { ok: false, status: 503, headers: { get: () => null } } : responseFor()),
  });
  assert.equal(calls, 2);
  assert.deepEqual(delays, [250]);
  assert.equal(result.api_requests, 2);
  assert.equal(result.status, 'completed');
});

test('retry remains bounded after repeated transient failures', async () => {
  let calls = 0;
  const result = await assessCandidates([candidate], {
    apiKey: 'test-secret', sleepImpl: async () => {},
    fetchImpl: async () => { calls += 1; return { ok: false, status: 503, headers: { get: () => null } }; },
  });
  assert.equal(calls, 2);
  assert.equal(result.status, 'failed');
  assert.equal(result.api_requests, 2);
  assert.equal(result.error_category, 'transient');
  assert.equal(result.fallback_used, true);
});

test('duplicate candidate URLs produce only one model decision', async () => {
  let calls = 0;
  let sent;
  const result = await assessCandidates([candidate, candidate], {
    apiKey: 'test-secret',
    fetchImpl: async (_url, options) => { calls += 1; sent = JSON.parse(options.body); return responseFor(); },
  });
  assert.equal(calls, 1);
  assert.equal(JSON.parse(sent.input).length, 1);
  assert.equal(result.candidates_assessed, 1);
});

test('model assessment cannot authorize publication and receipt excludes credentials', async () => {
  const report = buildWeeklyReport(fixture());
  const assessment = await assessCandidates([candidate], { apiKey: 'test-secret', fetchImpl: async () => responseFor() });
  const final = withModelAssessment(report, assessment);
  assert.equal(final.receipt.publication_state, 'NO_PUBLICATION');
  assert.deepEqual(final.receipt.published_items, []);
  assert.equal(final.receipt.publication_commit, null);
  assert.equal(final.receipt.deployment_result, 'not run');
  assert.equal(JSON.stringify(final.receipt).includes('test-secret'), false);
  assert.equal(JSON.stringify(final.receipt).includes('Bearer'), false);
  assert.deepEqual(final.receipt.model_assessment.usage, { input_tokens: 123, output_tokens: 44, total_tokens: 167 });
});

test('oversized model input is refused before any paid request', async () => {
  let calls = 0;
  const oversized = { ...candidate, title: 'x'.repeat(301) };
  const result = await assessCandidates([oversized], { apiKey: 'test-secret', fetchImpl: async () => { calls += 1; } });
  assert.equal(calls, 0);
  assert.equal(result.status, 'invalid_input');
  assert.equal(result.fallback_used, true);
});

test('model call is skipped when deterministic intake selected nothing', async () => {
  let calls = 0;
  const result = await assessCandidates([], { apiKey: 'test-secret', fetchImpl: async () => { calls += 1; } });
  assert.equal(calls, 0);
  assert.equal(result.status, 'skipped_no_candidates');
  assert.equal(result.fallback_used, false);
});
