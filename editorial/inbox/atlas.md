---
title: What if “done” were something an AI agent had to prove?
slug: atlas
section: Fresh Signals
article_type: Fresh Signal
status: NEEDS EDIT
evidence_status: INSPECTED + FOCUSED TESTS
tested_version: main snapshot (HEAD 8ccacf2)
tested_platform: Windows source bench
tested_date: 2026-09-06
editor: Lucy
website_ready: false
repo: 
licence: Apache-2.0
---

# What if “done” were something an AI agent had to prove?

## Standfirst

Atlas is building Goal Contracts and evidence gates for coding agents. The architecture is ahead of the product, but the line between what is wired and what is merely present is unusually clear.

## The problem

An agent can satisfy the shape of a request while dropping its intent: changing the wrong file, weakening a test, or announcing completion while an acceptance condition remains unsatisfied. “Please verify this before saying done” is still advice delivered to the system that wants to finish.

## The idea

Atlas treats those conditions as a structured Goal Contract: what a task must accomplish, what must be preserved, and what must not happen. Proposed actions and evidence can then be checked against something more inspectable than prose in a prompt.

## What exists today

The focused harness contains a real enforcement slice. ContractGate and ImpactEvidenceGate are described as runtime-wired. The harness also includes a Verifier and CompletionGate, but the project’s review findings say those remain unwired in the live runtime path. Reviewer integration and Goal Contract persistence are incomplete too.

## What Toolglass inspected or tested

The focused harness ran 29 tests with no failures. The set covers contract parsing, preserved-path blocking, path-obfuscation normalization, unknown-write fail-closed handling, verification-defeating commands, mass-deletion detection, out-of-scope evidence, conservative verifier parsing, and completion decisions tied to verification.

## Why this is worth watching

Atlas is less interesting as another coding agent than as an argument about what “done” should mean. It moves part of the honesty problem out of the model’s self-description and into software that can inspect actions and evidence.

## What would make it important?

Durable Goal Contracts, actual Verifier wiring, completion enforcement in the live loop, and a packaged end-to-end task would turn the architecture into a stronger claim. Those are future proof points, not present results.

## Toolglass Receipt

```text
STATUS          INSPECTED + FOCUSED TESTS
PLATFORM        Windows source bench
VERSION         main snapshot / HEAD 8ccacf2
TESTED DATE     2026-09-06
TEST TYPE       Focused harness
KEY MEASUREMENT 29 passed / 0 failed
LIMITATIONS     No model task, Tauri frontend, or packaged reviewer flow
```
