import assert from 'node:assert/strict';
import test from 'node:test';
import { composeMagazine, publicationDate } from '../content/magazine-selection.mjs';

function story(slug, date, { department = 'articles', role = 'feature', status = 'published' } = {}) {
  return { slug, date, department, role, status, href: `/${department}/${slug}/` };
}

test('a new approved article advances the cover and archive regardless of input order', () => {
  const earlier = story('old', '2026-10-26');
  const later = story('new', '2026-11-23');
  const second = story('z-second', later.date);
  const result = composeMagazine([second, earlier, later], { [earlier.date]: { lead: earlier.slug } });
  assert.equal(result.lead, later);
  assert.deepEqual(result.issues.map(issue => issue.date), [later.date, earlier.date]);
  assert.deepEqual(result.issues[0].stories, [later, second]);
});

test('edition pins choose approved content and keep discoveries out of Radar repeats', () => {
  const date = '2026-11-23';
  const feature = story('a-feature', date);
  const pinned = story('z-feature', date);
  const profile = story('a-profile', date, { role: 'profile' });
  const pinnedProfile = story('z-profile', date, { role: 'profile' });
  const discovery = story('discovery', date, { department: 'radar' });
  const signal = story('signal', '2026-11-22', { department: 'radar' });
  const result = composeMagazine([feature, profile, pinned, pinnedProfile, discovery, signal], {
    [date]: { lead: pinned.slug, profile: pinnedProfile.slug, discoveries: [discovery.slug] },
  });
  assert.equal(result.lead, pinned);
  assert.equal(result.profile, pinnedProfile);
  assert.deepEqual(result.discoveries, [discovery]);
  assert.deepEqual(result.radar, [signal]);
});

test('missing or ineligible pins fall back and drafts stay out of all departments', () => {
  const date = '2026-11-23';
  const feature = story('feature', date);
  const profile = story('profile', '2026-10-26', { role: 'profile' });
  const draft = story('draft', '2026-12-01', { status: 'draft' });
  const draftRadar = story('draft-radar', date, { status: 'draft', department: 'radar' });
  const draftReview = story('draft-review', date, { status: 'draft', department: 'reviews' });
  const result = composeMagazine([profile, draft, draftRadar, draftReview, feature], {
    [date]: { lead: draft.slug, profile: 'missing', discoveries: [draftRadar.slug] },
  });
  assert.equal(result.lead, feature);
  assert.equal(result.profile, profile);
  assert.deepEqual(result.issues.flatMap(issue => issue.stories), [feature, profile]);
  assert.deepEqual([result.discoveries, result.radar, result.reviews], [[], [], []]);
});

test('empty and profile-only editions are usable', () => {
  assert.deepEqual(composeMagazine([]).issues, []);
  assert.equal(composeMagazine([]).lead, undefined);
  const profile = story('profile', '2026-11-23', { role: 'profile' });
  const result = composeMagazine([profile]);
  assert.equal(result.lead, profile);
  assert.equal(result.profile, undefined);
});

test('publication dates have a deterministic UTC representation', () => {
  assert.equal(publicationDate('23 November 2026'), '2026-11-23T12:00:00.000Z');
  assert.equal(publicationDate('2026-11-23T12:00:00.000Z'), '2026-11-23T12:00:00.000Z');
  assert.throws(() => publicationDate('unpublished'), /Invalid publication date/);
});
