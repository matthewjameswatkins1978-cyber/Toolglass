---
title: TermAI looked interesting. Windows disagreed.
slug: termai
section: Scout Notes
article_type: Scout Note
status: APPROVED
evidence_status: INSPECTED / BUILD BLOCKED
tested_version: v0.1.0 / commit 52089b3
tested_platform: Windows
tested_date: 2026-09-06
editor: Lucy
website_ready: true
repo:
licence:
---

# TermAI looked interesting. Windows disagreed.

## Standfirst

TermAI promises a terminal-native assistant with local sessions, branching, Git helpers and several provider paths. We never reached any of that. On our Windows bench, the current source build stopped at the compiler.

There is a particular kind of software review that lasts just long enough to become interesting.

You read the documentation, inspect the source, find a workflow with enough personality to justify another terminal AI tool, type the build command, and then spend the next few minutes staring at Rust errors instead of a prompt.

That was TermAI.

## Why we noticed it

The attraction was not simply “AI, but in a terminal”. That shelf is already crowded.

TermAI's more interesting pitch is coherence: local sessions you can inspect and resume, conversation branching, project context, Git helpers and multiple provider paths gathered into one terminal-native workflow. The repository is also fairly explicit about where authentication and local state live, which is the sort of boring detail that becomes important the moment software starts talking to models on your behalf.

There was enough there to make us want to try it rather than merely bookmark it.

## What happened when we tried

We attempted the documented source build on Windows with:

```text
cargo build --release
```

No binary emerged.

Compilation stopped on two classes of error in the snapshot we tested: Unix-only permissions APIs used in `src/git/hooks.rs`, and ambiguous type inference around `rng.gen()` in the PKCE implementation.

That is as far as the hands-on review honestly goes.

We did not patch the project until it built and then pretend the normal installation path had worked. Toolglass was trying the software that existed, on the platform in front of us.

## What we did not test

Quite a lot, and this is where short scout notes earn their keep.

We never reached `--help`. We never logged into a provider. No API credentials were supplied. We did not start a runtime session, branch a conversation, point TermAI at a fixture repository or exercise its Git integration. We have no hands-on evidence that its provider paths or persistence behave as documented.

Those remain project claims, not Toolglass findings.

## Is that the end of it?

No.

A failed Windows build is meaningful, especially for software that appears to invite Windows users in, but it is not a verdict on every idea inside the repository. The source and documentation still describe a workflow we would like to test properly, and the project contains tests aimed at exercising core CLI behaviour without requiring live network access or API keys.

A portable build, or simply a source snapshot that gets us to a provider-free first run, would be enough to put TermAI back on the bench.

For now the bounded conclusion is deliberately boring and precise: **v0.1.0 at commit `52089b3` did not reach first launch on our Windows test environment.**

Sometimes that is the review.

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
