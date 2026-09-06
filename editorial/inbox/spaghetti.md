---
title: Your coding agents remember everything. Good luck finding any of it.
slug: spaghetti
section: Frontier Software
article_type: Full Review
status: NEEDS EDIT
evidence_status: TESTED
tested_version: v0.7.0 workspace
tested_platform: Windows
tested_date: 2026-09-06
editor: Lucy
website_ready: false
repo: 
licence: 
---

# Your coding agents remember everything. Good luck finding any of it.

## Standfirst

Spaghetti turns local agent history into a searchable SQLite-backed workspace. A bounded real-history pass found a useful index, a fast startup, and a limit that matters: it is a complement to raw `rg`, not a replacement for it.

## What is it?

Spaghetti indexes agent history into projects, sessions, messages, artifacts, and search results. The point is not another transcript viewer. It is a local way to answer “where did we solve that?” without opening folders one at a time.

## Why did Toolglass notice it?

The strongest idea is the distinction between a catalogue that is ready and a search projection that is still catching up. That is a more honest shape for local history software than pretending every source is instantly and equally searchable.

## What does it replace?

For a bounded conversational search, it can replace some folder browsing and some manual `rg` work. In our test, a phrase present in the indexed conversational projection was quick to retrieve and navigate back to its project and session.

## What does it not replace?

It does not replace raw `rg` over the underlying rollout tree. The normalized index intentionally omits some tool-output records, so phrases found in raw output can be absent from Spaghetti search. It also does not remove the need to protect the history being indexed.

## What we actually tested

We built the Windows source snapshot and ran Spaghetti against a deliberately bounded, locally staged copy of three Codex rollout files. The slice exposed three projects and three sessions, decoded the retained history, and reached search-ready state. No live full history root was passed to the engine.

## What worked

Startup for the expanded three-session run was 94 ms. Project-to-session navigation returned the expected session for each project, and session navigation returned the expected message fields. Searches for `Lantern Keeper` and `Spaghetti` returned results in the retained projection.

## What didn’t

The normalized search did not reproduce every raw-rollout `rg` match. Queries such as `Threadmoth formatting`, `database design`, and `cargo test` had no hits in the retained projection even though raw `rg` found matching files. That is a boundary of the tested slice and record types, not evidence that indexing is useless.

## Interesting details

The run indexed 1,007 segments, with 988 search-indexed segments. Usage remained degraded with an explicit authorization diagnostic rather than a fabricated “all ready” state. That small refusal to bluff is part of the product’s appeal.

## Who should care?

People with enough accumulated Claude, Codex, or other agent history that “I know we solved this before” has become a recurring problem.

## Toolglass view

Spaghetti is materially more useful than folder browsing for a bounded “what was that discussion?” retrieval task when the phrase lives in its normalized conversational projection. The honest verdict is complementary: use it for structured history, keep `rg` for archaeology.

## Things still untested

Mixed-source indexing, a full private history opt-in, warm startup, malformed records, artifact navigation, and mixed-source search remain open. The bounded pass does not support a no-telemetry claim or a performance claim about a complete history tree.

## Toolglass Receipt

```text
STATUS          TESTED
PLATFORM        Windows
VERSION         v0.7.0 workspace
TESTED DATE     2026-09-06
TEST TYPE       Bounded real-history slice
KEY MEASUREMENT 94 ms startup; 1,007 segments; 3 projects / 3 sessions
LIMITATIONS     Codex-only slice; tool-output records omitted; complements raw rg
```
