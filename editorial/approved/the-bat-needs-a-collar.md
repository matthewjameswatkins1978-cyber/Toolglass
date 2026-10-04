---
title: The Bat Needs a Collar
subtitle: Why serious AI testing tools should carry their authority with them
slug: the-bat-needs-a-collar
section: Essays
article_type: Opinion / Architecture
status: APPROVED
evidence_status: OPINION / ARCHITECTURE
editor: Lucy
website_ready: true
published: 3 October 2026
byline: Matthew Watkins, with Lucy (ChatGPT)
---

# The Bat Needs a Collar

## Why serious AI testing tools should carry their authority with them

**Matthew Watkins, with Lucy (ChatGPT)**

Terror Bats finally frightened somebody.

Not a production server. Not a bank. Not the Pentagon, despite appearances. An automated safety system.

We had been doing something considerably less cinematic: building adapters for Terror Bats, our adversarial software-testing framework. One adapter was for Tethers, another for Lantern Keeper. The framework runs deliberately unpleasant tests against software, records what happened, and tries very hard not to mistake its own broken test apparatus for a defect in the thing being tested.

Then the machinery looked at phrases such as **hostile test**, **attack**, **target defect**, concurrent writers and adversarial execution, and apparently decided that the bats had grown teeth.

The work stopped behind a cybersecurity warning.

This was funny for approximately thirty seconds.

Then it became interesting.

Because somewhere during the construction of Terror Bats, it had quietly crossed an architectural boundary. It was no longer merely a collection of awkward test cases. It had become a system capable of attaching itself to other software, exercising that software under hostile conditions, distinguishing infrastructure failure from target failure, and producing evidence about the result.

That is useful.

It is also, viewed without context, remarkably close to the shape of a security-testing tool.

The obvious response would be to rename everything.

`attack` becomes `robustness_activity`.

`hostile` becomes `unexpectedly_enthusiastic`.

Terror Bats becomes **Helpful Quality Assurance Friends Enterprise Edition**.

This would be cowardly, ugly and technically useless.

There is a better answer.

**Make authority part of the machine.**

## Testing has always had an unspoken sentence

Most development tools operate with an implicit assumption:

> You are allowed to do this.

Compilers do not normally ask whether you own the source code. A unit-testing framework does not demand documentary evidence before checking whether `2 + 2 == 4`. Even fuzzers generally assume that if you pointed the thing at a binary, this was your business.

AI agents make that assumption much less comfortable.

Once software can discover targets, run tests, modify state, launch processes, call services and continue autonomously, the distinction between **can** and **may** stops being philosophical decoration.

It becomes architecture.

Suppose a Terror Bats adapter knows how to test a network service. That tells us something about its **capability**.

It tells us nothing about whether this particular run should be allowed to use that capability against this particular service.

Those are different questions:

> **What can this adapter do?**

and

> **What is this run authorised to do?**

If they are represented by the same mechanism, sooner or later somebody will have a very exciting afternoon.

## Authority should travel with the test

The simplest form of the idea is an authority document attached to every Terror Bats run.

Not a disclaimer buried in a prompt.

Not:

> “For educational purposes only, obviously.”

A machine-readable contract.

Something roughly like:

```yaml
schema: terrorbats.authority/1

target:
  kind: git-repository
  path: D:\Projects\lantern-keeper
  expected_repo: lantern-keeper

authorization:
  basis: owner
  granted_by: Matthew
  purpose: defensive robustness testing

scope:
  filesystem:
    allowed_prefixes:
      - D:\Projects\lantern-keeper

  network: none
  external_targets: deny
  destructive_operations: deny

capabilities:
  - fault-injection
  - concurrency-testing
  - persistence-testing
  - protocol-testing
```

Now the adapter doesn't simply receive an instruction saying *go*.

Before execution, the framework resolves the actual target. It checks the repository identity, path and current revision. It verifies that the authority applies to that target. Then it intersects what the adapter is capable of doing with what the authority grant permits.

The important equation is almost embarrassingly small:

**available capability ∩ granted capability = executable capability**

Everything else is unavailable.

An adapter may know how to make network requests.

The run may have `network: none`.

Therefore, during that run, as far as Terror Bats is concerned, the adapter does not have a network.

That is much stronger than instructing an AI agent:

> Please don't use the network.

One is policy prose.

The other is a property of the execution environment.

## Tethers already knows half of this story

This becomes particularly interesting because we already built Tethers.

Tethers is concerned with authority: what an actor is allowed to do, over what scope, under what conditions, producing outcomes such as **ALLOW**, **ASK** and **DENY**.

So Terror Bats should not invent a second, slightly worse authority system because programmers enjoy creating twins that disagree with one another.

The clean architecture is:

```text
Human intent
     ↓
Authority grant
     ↓
   Tethers
     ↓
ALLOW + bounded capabilities
     ↓
 Terror Bats
     ↓
Target adapter
     ↓
Software under test
     ↓
Evidence + authority receipt
```

Each component gets one job.

**Tethers decides authority.**

**Terror Bats enforces the resulting bounds during testing.**

**Adapters describe how particular targets can be exercised.**

And the receipt records what actually happened.

That separation matters.

The Lantern Keeper adapter should know how Lantern Keeper behaves. It should know how to start it, perturb it, inspect persistence, induce races and recognise failure.

It should not contain a hand-written opinion about whether Matthew is allowed to test Lantern Keeper today.

That is somebody else's problem.

Preferably Tethers'.

## The receipt is where this gets serious

Once authority becomes explicit, the output of a test can carry it too.

Instead of merely reporting:

> Attack 12: PASS

a useful receipt can say something closer to:

> Lantern Keeper at commit `abc123` was tested under authority grant `8f97…`. Filesystem access was restricted to the target repository. External networking was unavailable. Destructive operations were denied. Concurrency and persistence tests were permitted.

Now the evidence says not only **what happened**, but **under what authority it was allowed to happen**.

That is useful for AI agents.

It is useful for CI.

It is useful when revisiting an old test six months later.

And it becomes extremely useful when several autonomous systems are involved, because we stop depending on everyone remembering the conversational circumstances surrounding a run.

The machine carries its own provenance.

The bat wears a collar.

## This is bigger than placating a safety filter

It would be easy to treat all of this as paperwork invented because an AI safety system became nervous about some colourful vocabulary.

That would miss the point.

The warning merely exposed something real.

Software development is acquiring increasingly powerful autonomous actors, while most of our tools still inherit an authority model from the era when a programmer sat at a keyboard and manually typed each consequential command.

That world is disappearing.

An agent can now inspect a repository, choose a strategy, launch tools, mutate files, invoke another agent and continue while the human makes tea.

Under those conditions, *authority cannot remain ambient*.

It needs shape.

Scope.

Expiry.

Identity.

Evidence.

And ideally enforcement below the reasoning layer.

This is related to a broader principle we have been developing for AI-first tools: **self-teach over rule-teach**.

Do not make every new agent memorise twenty paragraphs explaining how Terror Bats ought to behave.

Give the tool an interface from which the correct behaviour can be discovered and an execution boundary within which incorrect behaviour is impossible.

A competent fresh agent should be able to arrive, inspect the system and learn:

> I can test this repository.
> I can perform these classes of test.
> I cannot leave this path.
> I cannot contact external systems.
> Here is the authority under which I am operating.
> Here is how my actions will be recorded.

That is vastly better than another `AGENTS.md` containing ceremonial warnings nobody reads after Tuesday.

## Dangerous-looking software can be very safe software

There is a useful inversion here.

The safer version of Terror Bats may actually **look more dangerous**.

It contains explicit notions of attacks, authority, target identity, capabilities, denial and hostile conditions.

The naive version looks friendlier because none of those concepts are represented at all.

But absence of vocabulary is not absence of risk.

A kitchen knife with no handle guard does not become safer if we call it a Sandwich Assistance Wand.

Good systems name their dangerous edges.

Then they constrain them.

So I am not particularly interested in making Terror Bats look harmless.

I want it to be **bounded**.

Let it have teeth.

Just make absolutely certain it knows what it is allowed to bite.

## The Toolglass verdict

The interesting lesson from our accidental encounter with the cyber safety machinery is not that Terror Bats has become a terrifying offensive platform. It hasn't.

It is that once testing tools become autonomous, extensible and adversarial, **authorization becomes part of testing architecture rather than a social assumption outside it**.

Adapters tell the system what is possible.

Authority tells it what is permitted.

Execution should be the intersection of the two.

And evidence should preserve both.

That gives us something better than a disclaimer and considerably better than renaming everything until the robots stop looking worried.

It gives the bats paperwork.

And, for once, the paperwork is the interesting bit. 🦇