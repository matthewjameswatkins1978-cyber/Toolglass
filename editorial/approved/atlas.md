---
title: What if “done” were something an AI agent had to prove?
slug: atlas
section: Fresh Signals
article_type: Fresh Signal
status: APPROVED
evidence_status: INSPECTED + FOCUSED TESTS
tested_version: main snapshot (HEAD 8ccacf2)
tested_platform: Windows source bench
tested_date: 2026-09-06
editor: Lucy
website_ready: true
repo:
licence: Apache-2.0
---

# What if “done” were something an AI agent had to prove?

## Standfirst

Atlas is trying to turn “please don't quietly move the goalposts” from an instruction into software. Its Goal Contracts and evidence gates are only partly wired today, but the idea is interesting enough to deserve attention before the product is finished.

Coding agents are very good at finishing things. They are occasionally less good at finishing the thing you actually asked for.

A file gets changed, the tests go green, a cheerful completion message appears, and only afterwards do you notice that one requirement quietly vanished on the journey. Perhaps a test was weakened. Perhaps the wrong file changed. Perhaps the agent satisfied three conditions and forgot the fourth.

You can always add another sentence to the prompt: “Do not do that.” Atlas is interested in a more mechanical answer.

## The problem

A normal prompt mixes several kinds of intent together. There is what you want changed, what must remain untouched, what evidence would count as success, and what shortcuts are forbidden. The model reads all of this as language, performs the work, then is often involved in judging whether its own work is finished.

That arrangement has an obvious comic quality. It is a little like asking the contestant to operate the buzzer.

Atlas tries to separate some of those conditions from the agent's own self-description.

## The idea

The central object is a Goal Contract: a structured representation of what the task must accomplish, what must be preserved and what must not happen.

A request such as:

```text
Change config.json.
Do not touch README.md.
Keep all tests enabled.
```

is more than three polite sentences. In Atlas's model, those conditions can become things software inspects when actions are proposed and when evidence of completion arrives.

That is the interesting shift. “Did you obey the task?” stops being solely a conversation with the model and starts becoming an engineering surface.

## What exists today

This is where enthusiasm needs a ruler.

The current project contains a real enforcement slice. `ContractGate` and `ImpactEvidenceGate` are present and described in the inspected runtime path. The focused harness exercises concrete behaviours around contracts and evidence.

But several important pieces are not yet wired into a complete live loop. The `Verifier` and `CompletionGate` exist in the harness and architecture, while reviewer integration, Goal Contract persistence and end-to-end completion enforcement remain partial or unwired in the version Toolglass inspected.

So Atlas is not yet a finished answer to agent goal drift. The architecture is currently ahead of the product.

## What Toolglass tested

We ran the project's focused harness: 29 tests, 29 passes.

The set covers more than happy-path parsing. It includes preserved-path blocking, normalization intended to catch path obfuscation, fail-closed treatment of unknown writes, commands that could defeat verification, mass-deletion detection, evidence arriving from outside the permitted scope, conservative verifier parsing and completion decisions tied to verification state.

That is useful evidence that the enforcement ideas have executable substance.

It is not evidence that a live coding agent completed a real project under the full Atlas architecture. We did not run a packaged end-to-end model task, and the parts needed to make that claim are precisely the parts still being connected.

## Why this is worth watching

Atlas is less interesting as another coding agent than as an argument about what “done” should mean.

Most agent systems still place enormous weight on prompts, model judgement and post-hoc tests. Atlas is experimenting with a different boundary: encode some of the task's invariants, observe the impact of actions, require evidence, and make completion conditional on more than the model saying everything looks fine.

Whether Atlas itself becomes the important implementation is almost secondary at this stage. The idea feels larger than one repository.

If coding agents are going to perform longer and more autonomous jobs, “prove that you satisfied the contract” is likely to become a more interesting sentence than “please be careful”.

## What would make it important?

Four things would move Atlas from interesting architecture toward a convincing product:

- durable Goal Contracts that survive the real workflow
- the Verifier actually wired into that workflow
- completion enforcement in the live agent loop
- a packaged end-to-end task demonstrating that the gates stop realistic failure modes without strangling legitimate work

Those are not complaints disguised as a roadmap. They are the experiments that would let the project make a much stronger claim.

For now, Atlas has shown enough machinery to make the question worth following.

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
