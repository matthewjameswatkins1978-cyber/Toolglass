---
title: Your coding agents remember everything. Good luck finding any of it.
slug: spaghetti
section: Frontier Software
article_type: Full Review
status: APPROVED
evidence_status: TESTED
tested_version: v0.7.0 workspace
tested_platform: Windows
tested_date: 2026-09-06
editor: Lucy
website_ready: true
repo:
licence:
---

# Your coding agents remember everything. Good luck finding any of it.

## Standfirst

Spaghetti builds a local search index from coding-agent history. We fed it three bounded real Codex sessions and discovered both a much better way to browse the past and a good reason not to uninstall `rg` just yet.

We knew the answer existed. That was the irritating part.

Somewhere in a pile of old agent sessions was a discussion we had already had, a decision we had already made, or an error we had already fixed. The computer had remembered it perfectly. We had remembered just enough to know we were wasting our time doing the work twice.

This is a new kind of filing cabinet from hell. Coding agents produce useful history at industrial speed, then leave it scattered across project folders, rollout files and tool-specific storage. Spaghetti is an attempt to turn that archaeology into search.

## What is it?

Spaghetti indexes local agent history into projects, sessions, messages, artifacts and search results backed by SQLite. That description makes it sound rather more clerical than it feels in use. The useful trick is that instead of asking you to remember which raw file belongs to which conversation, it gives the history some shape.

The point is not merely to display transcripts. It is to answer the more human question: “Where did we solve that?”

## Why did Toolglass notice it?

Because this problem barely existed a few years ago and is already becoming annoying.

Agent-heavy development creates a peculiar surplus of memory. There is plenty of it, but retrieval is poor. The interesting thing about Spaghetti is that it does not pretend every scrap of history is equivalent or instantly searchable. It builds a normalized conversational projection while leaving the raw material underneath.

That distinction matters, because it is also where the limits show up.

## What does it replace?

Not `rg`, despite appearances.

For the kind of bounded conversational search we tried, Spaghetti replaced a lot of folder wandering and a fair amount of “which Codex session was that?” guesswork. A phrase present in its indexed conversational projection was quick to retrieve, and the result led cleanly back to the relevant project and session.

What it really replaces is the increasingly ridiculous expectation that a human should remember which agent folder contains a conversation from three months ago.

## What does it not replace?

The underlying history, and raw search over it.

Spaghetti's normalized index intentionally omits some tool-output records. That means a phrase present in raw output can be visible to `rg` and absent from Spaghetti search. In our test, that happened with terms including `Threadmoth formatting`, `database design`, and `cargo test`.

That is not a gotcha. It is the boundary of the thing.

Spaghetti is for structured conversational retrieval. Raw grep remains the shovel you reach for when you want to dig through absolutely everything.

## What we actually tested

We first used controlled fixtures, then staged a deliberately bounded copy of three real Codex rollout files. We did not point Spaghetti at a complete private history tree.

The resulting slice exposed three projects and three sessions, produced 1,007 segments, and placed 988 of them in the searchable projection. Startup for the expanded three-session run was 94 ms on the Toolglass Windows bench.

Project-to-session navigation returned the expected session for each project. Session navigation returned the expected message fields. Searches for `Lantern Keeper` and `Spaghetti` returned results from the retained projection.

The private transcript contents and raw probe terms stay off the site. The interesting part is the behaviour, not somebody else's diary.

## What worked

The useful moment came when the raw history stopped feeling like files and started feeling like something you could browse.

Project and session boundaries were immediately more comprehensible than a rollout tree. Search results gave us somewhere sensible to go next rather than merely a filename and a line number. For the material Spaghetti had normalized, that was a meaningful improvement over manual archaeology.

The 94 ms startup on our tiny real-history slice was also pleasantly uneventful. We are not turning that into a grand performance claim. Three sessions are three sessions. But nothing about the tested slice felt lumbering.

One small detail we liked: usage remained degraded with an explicit authorization diagnostic rather than bluffing its way into an “all ready” state. Software admitting what it does not know is underrated.

## Where raw grep still wins

This is the part that makes the review more interesting than “search tool good”.

Spaghetti did not reproduce every match from the underlying rollout files. `rg` could find phrases in raw tool output that the normalized search never saw. If your target is an exact compiler message, a tool transcript, or some other record outside the retained projection, raw search may still be the better instrument.

So no, we would not uninstall `rg`.

We would stop asking it to be our entire memory system.

## Who should care?

Anyone who uses coding agents often enough to have developed the sentence: “I know we did this before.”

That probably means heavy Codex, Claude Code and similar users working across multiple projects. If you have five sessions in total, Spaghetti may be an elaborate solution to a problem you do not yet possess. Give it time.

## Toolglass view

Spaghetti is solving a genuinely new housekeeping problem: our agents are accumulating useful memory faster than we can retrieve it.

On the bounded history we tested, it made conversational history substantially easier to navigate and search. It did not make raw search obsolete, and the missing tool-output matches are exactly why we would keep both.

That complementary verdict is stronger than pretending one tool has eaten the other. Spaghetti gives agent history a shape. `rg` still lets you crawl underneath the floorboards.

## Things still untested

Mixed-source indexing, a full private-history opt-in, warm startup, malformed records, artifact navigation and mixed-source search remain open. Our bounded pass does not support a no-telemetry claim or a performance claim about a complete history tree.

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
