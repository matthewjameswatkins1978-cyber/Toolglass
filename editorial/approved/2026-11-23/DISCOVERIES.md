# Toolglass / Discovery Desk / 23 November 2026

Three experiments with unusually explicit ideas. All are **desk reviews**, not independently installed or benchmarked. Dates and status derive from maintainers' public repositories, not a local release audit.

## 01. Tacit: two faces of one program

**What it is.** [Tacit](https://github.com/weetster/tacit) is an experimental AI-first programming language with an LLVM compilation route. Its author treats the abstract syntax tree, rather than a human-readable text file, as the authoritative program.

**The idea worth stealing.** The project describes two lossless presentations: a dense view for model generation and a more expansive view for human inspection. It is a serious design question hiding inside an easy-to-dismiss slogan. If software is increasingly authored by a machine but owned by a human, why must both parties read the same surface syntax? The essential word is *lossless*. A pretty human explanation that cannot reconstruct the exact machine program is a commentary, not an alternate representation.

**Why now.** AI-generated changes have made provenance, inspectability and exact edit boundaries urgent. This is not proof that a model-oriented language produces better code; it is an architectural hypothesis about how to separate writing from review.

**Maturity and limits.** The repository claims a Phase 6 Tacit-Lite toolchain that parses, typechecks, inspects, compiles and executes a frozen subset. The claims are maintainer-reported. Its ecosystem, toolchain trust, actual token efficiency and long-term language stability need independent tests. The idea predates Tacit in projectional editing, structured editors and intentional programming; its interest lies in the new AI audience.

**Primary:** [Source and design](https://github.com/weetster/tacit).

**Test commission:** Round-trip 20 programs through dense and inspection views, including malformed code and refactors; compare AST hashes and diagnostic precision.

## 02. Toka: a systems language that wants its promises machine-readable

**What it is.** [Toka](https://github.com/tokalang/toka) is an experimental no-GC systems language with deterministic cleanup, explicit resource transfer and versioned JSON semantic protocols. The repository identifies 0.20.1 as its 26 October 2026 release.

**The novel seam.** Most language tools expose syntax trees and diagnostics. Toka's project places machine-verifiable semantic interfaces near the centre of the design. That could let an external tool ask what ownership or transfer rules a program obeys without relying on prose and guesswork. Its `cede` transfer and PAL checks are particularly worth examining as *contracts*, not merely new keywords.

**Why now.** Agents increasingly need to inspect and modify low-level programs. A versioned semantic protocol is a plausible bridge between language implementation and automated review, provided the protocol accurately reflects compiler behaviour.

**Maturity and limits.** Early release series; external host tools remain part of linking and orchestration. Cross-platform qualification is described in the repository but not independently reproduced here. Claims of safety and performance should be tested on pinned versions.

**Primary:** [Repository and release notes](https://github.com/tokalang/toka).

**Test commission:** Generate an ownership-transfer error, compare CLI diagnostic with JSON semantic output, then repeat after a clean rebuild.

## 03. CCT: a program that draws its own map

**What it is.** [Clavicula Turing (CCT)](https://github.com/eabusato/cct) is a compiled, ritual-themed programming language that generates deterministic SVG sigils from program structure, dependencies and calls.

**What is genuinely odd.** Ignore the occult vocabulary for a moment. The interesting mechanism is a structural picture that is generated *from* the program and can be correlated with execution traces. Nodes expose source and statement information; timed spans can appear on the same visual topology. This is somewhere between a dependency graph, a profiler and a piece of generative typography. The picture is not merely a logo if it can lead you back to evidence.

**Why now.** Software made by many agents needs navigation aids that do not depend on remembering which human wrote which file. A deterministic, inspectable visual index could be useful even if the particular sigil metaphor proves too ornate.

**Maturity and limits.** The project reports a FASE 40 baseline, but that is its own milestone vocabulary, not an external maturity certification. Readability at scale, collision avoidance, accessibility and stability across harmless edits are unanswered questions. The claims require a real run.

**Primary:** [Source, examples and generated diagrams](https://github.com/eabusato/cct).

**Test commission:** Compare diagrams for one semantic change, one whitespace change and a large module rename; measure visual stability and click-through usefulness.

### Desk judgement

Tacit is the strongest feature seed. Toka offers the most practical compiler-tool interface question. CCT is the delightful outsider: a visualisation idea that may outlive the language wrapped around it. None is endorsed for production.
