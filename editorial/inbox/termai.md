---
title: TermAI looked interesting. Windows disagreed.
slug: termai
section: Scout Notes
article_type: Scout Note
status: NEEDS EDIT
evidence_status: INSPECTED / BUILD BLOCKED
tested_version: v0.1.0 / commit 52089b3
tested_platform: Windows
tested_date: 2026-09-06
editor: Lucy
website_ready: false
repo: 
licence: 
---

# TermAI looked interesting. Windows disagreed.

## Standfirst

TermAI proposes a terminal-native assistant with local sessions, branching, Git helpers, and several provider paths. Our Windows source build stopped before launch, so the interesting workflow remains a project claim.

## Why we noticed it

The reason to exist may be workflow coherence rather than terminal AI novelty: persistent, inspectable sessions with conversation branching and project context. The repository is unusually explicit about auth and local state surfaces.

## What happened when we tried

We attempted the documented source build with `cargo build --release` against the current Windows snapshot. Compilation stopped before a binary was created. The errors included Unix-only permissions APIs in `src/git/hooks.rs` and ambiguous type inference in the PKCE implementation.

## What we did not test

No provider login, credentials, runtime session, `--help` output, fixture repository, or live task was used. The build failure means we cannot honestly claim that the documented provider paths, branching, Git integration, or local persistence work in practice.

## Why we may revisit it

The source and documentation describe a coherent terminal workflow, and the repository includes tests intended to exercise core CLI behaviour without real network access or API keys. A portable build and a provider-free first run would give the idea a fairer test.

TermAI is not “broken in general” on this evidence. The bounded claim is narrower: this source snapshot did not reach first launch on the tested Windows environment.

## Toolglass Receipt

```text
STATUS          INSPECTED / BUILD BLOCKED
PLATFORM        Windows
VERSION         v0.1.0 / commit 52089b3
TESTED DATE     2026-09-06
TEST TYPE       Release build attempt
KEY MEASUREMENT Binary not produced; build stopped at compiler errors
LIMITATIONS     No runtime, provider, credential, or live-task test
```
