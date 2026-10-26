---
title: Three Programs That Deserve a Closer Look
section: Discovery
article_type: Three desk-researched scouting notes
status: APPROVED / PUBLICATION
issue_date: 2026-10-26
evidence_status: DESK REVIEW / NO INSTALLATION OR BENCHMARKS
---

# Three Programs That Deserve a Closer Look

**26 October 2026 | Toolglass / Discovery desk**

Not every interesting program needs to be a finished product. Some are interesting because they are trying to answer a question that most software never bothers to ask. This week: a sequencer that speaks four languages, an AI coding stack that wants to own its entire machinery, and a map that refuses to mistake a mathematical claim for mathematical knowledge.

These are **desk-researched scouting notes**, not hands-on reviews. Project descriptions are attributed to their maintainers, and any untested claim is marked accordingly.

---

## 01 / Sova: Four Languages, One Musical Clock

**Status:** DESK REVIEW / NOT TESTED

**Category:** Live coding, music systems, language design

**Project:** [Sova source repository](https://github.com/sova-org/Sova) · [Sova project site](https://sova.livecoding.fr/)

**Licence:** AGPL-3.0

**Maturity:** Active alpha, per maintainers' README checked 26 October 2026

Live coding usually begins with a language and asks what music can be made with it. Sova has a slightly different idea. What if the musical clock and sequencing engine came first, and several different programming languages could describe what should happen on it?

The project, developed by Raphaël Forment, Loïg Jezequel and Tanguy Dubois in a research/creation setting associated with Athénor CNCM and the University of Nantes's LS2N laboratory, is a Rust-based sequencer built around a virtual machine. Its four included languages have different temperaments: **Bob** is imperative, **BaLi** is Lisp-like, **Boinx** deals in pattern streams, and **Cagire** is stack-based. They share the same VM and I/O rather than each demanding a separate audio universe. [1]

That is a richer proposition than a collection of syntax themes. A pattern language can make repetition feel natural. An imperative language can make state changes explicit. A stack language can turn composition into the manipulation of small operations. If all of them address the same timeline, the composer can move between ways of thinking without moving between clocks.

Sova's README describes a two-thread timing design: a scheduler looks ahead by roughly 30 milliseconds, while a real-time-priority thread dispatches events. It supports Ableton Link for tempo synchronisation, MIDI and OSC, a built-in Doux audio engine, a shader editor, and networked collaborative sessions. The arrangement of *Lines* and *Frames* supplies the sequencer's structural vocabulary. These are upstream architectural descriptions, not measurements made by Toolglass. [1]

**Why now?** The live-coding family tree runs through languages and communities such as SuperCollider, TidalCycles and Strudel. Sova's contribution is to treat language plurality as a first-class feature of the instrument. That is worth watching in a world where creative software is too often either a fixed GUI or a single language with an audio engine bolted underneath.

**The catch:** The project explicitly calls itself alpha. Four languages, collaborative editing, audio, MIDI, OSC and graphics are a large surface to keep coherent. The README's timing claims have not been independently checked here. Nor have we assessed stability, Windows audio devices or actual musical usability.

**The Toolglass test:** Run the desktop client with one built-in demo; compose the same short eight-bar idea in two languages; confirm both address the same transport; measure MIDI-event jitter under CPU load; join a second client; then break the connection and observe how gracefully the session recovers. A good instrument should survive the musician's hands, not only the developer's examples.

**Primary sources:** [1. Repository README, architecture and alpha statement](https://github.com/sova-org/Sova); [2. Project site](https://sova.livecoding.fr/). No performance test or installation was conducted for this note.

---

## 02 / orangu: The Coding Assistant That Wants to Build Its Own Brain

**Status:** DESK REVIEW / NOT TESTED

**Category:** Local AI, coding environments, model tooling

**Project:** [orangu repository](https://github.com/mnemosyne-systems/orangu) · [current 1.4.0 release announcement](https://www.mnemosyne-systems.ai/news/2026-09-29-orangu-1.4.0/)

**Licence:** GPL-3.0 (repository licence)

**Maturity:** Actively developed; current release 1.4.0 announced 29 September 2026

Most AI coding tools sit on top of a model server. Most model servers sit on top of another inference library. Training a model generally requires yet another stack. There is nothing inherently wrong with this. The boundaries allow good components to be reused. But every boundary is also another place where assumptions, dependencies and formats accumulate.

**orangu** is an attempt to own the whole chain in Rust. The project describes a terminal coding environment, a coordinator that starts and stops local models, and a native GGUF inference server. Its September 1.3 release added a particularly unusual component, `orangu-gguf`: a tool that can assemble a corpus, train a tokenizer, pretrain a small transformer from random weights and write a GGUF model file that the project's own server can load. [1][2]

The 1.3 release announcement says a manifest describes the corpus, model size, schedule, context and weight format. It also claims deterministic output from the same seed and manifest across different CPU-core counts. The later 1.4 release, announced on 29 September, adds image generation and editing, substantial inference-performance work, repository and revert commands, Prometheus metrics, and Windows fixes. These are maintainer-reported release notes, not tests performed by Toolglass. [1][2]

The distinction between **building a model** and **building a useful model** is crucial. A small 'smoke' training run can demonstrate that tokenisation, training, file output and inference connect correctly. It cannot, by itself, establish that the result is a competitive coding assistant. The project's own documentation frames the small run as a pipeline check, not as a substitute for a major training effort.

There is a nice historical echo here. Early personal-computer magazines printed enough code that a reader could make the machine do something new rather than merely buy a product. orangu's appeal is similar: it wants to expose more of the model-making apparatus to the person operating it. Whether one integrated stack is better than a set of mature specialised libraries remains an open question.

**The catch:** The repository makes wide claims about supported model families, acceleration backends, offline privacy and zero telemetry. Those are upstream claims. A code review, network inspection and independent performance comparison would be needed before Toolglass could endorse them. The installation instructions include downloading scripts; they should be inspected before execution. The code is GPL-3.0, which matters for downstream reuse.

**The Toolglass test:** Build from a pinned source revision on a modest machine. Run the smallest documented training manifest twice with identical seeds and compare hashes. Load the result with `orangu-server`, record peak memory and elapsed time, inspect any network access during a supposedly offline session, and compare one standard GGUF model's outputs with a known reference engine. A result that passes would establish a coherent toolchain, not model quality parity.

**Primary sources:** [1. Repository README, licence and documentation](https://github.com/mnemosyne-systems/orangu); [2. Maintainer's 1.4.0 release note, 29 September 2026](https://www.mnemosyne-systems.ai/news/2026-09-29-orangu-1.4.0/); [3. 1.3.0 release note, 9 September 2026](https://www.mnemosyne-systems.ai/news/2026-09-09-orangu-1.3.0/). No binary, benchmark, privacy audit or training run was performed for this note.

---

## 03 / Mathematics Research & Evidence Atlas: A Map of Claims, Not a Map of Truth

**Status:** DESK REVIEW / SITE AND SOURCE INSPECTED, NO CODE EXECUTION

**Category:** Research navigation, evidence design, interactive visualisation

**Project:** [Live evidence atlas](https://chrisdhayes.github.io/openai-math-atlas/) · [Source repository](https://github.com/ChrisDHayes/openai-math-atlas)

**Licence:** Not confirmed from a licence file in the inspected repository; do not assume the website code is freely reusable

**Maturity:** Experimental, with live-site version 4 observed 26 October 2026; repository README also describes a version 5 iteration

On 6 October, OpenAI published a collection of mathematical manuscripts produced by an internal frontier model. Its repository currently lists 719 manuscripts in 372 result families. The dated history records three withdrawals on 7 October after a sign error, alongside revisions to other papers. The collection includes some Lean formalisation material, but a manuscript, a machine-checked statement and a result accepted by mathematicians are not interchangeable things. [1][2][3]

Christopher Hayes's **Mathematics Research & Evidence Atlas** tries to give this uncomfortable distinction a visual form. The live site identifies itself as version 4 and maps seventeen fields, 372 families and the manuscript records. Its repository describes a version 5 iteration with adjustable branch lengths and more explicit evidence controls. The atlas explores source claims, formalisation links and questions still requiring independent assessment; it does not purport to prove the papers correct. In fact, its best design decision may be the refusal to turn a verification status into a confidence-coloured celebration. [4][5]

This is a tool about epistemology disguised as an interface. One branch means a paper exists. Another mark means there is a source-index link to a Lean file. Neither necessarily means the Lean statement matches the natural-language claim, that a theorem is novel, or that an expert has reproduced and understood it. The atlas's staged model runs from generation through formal evidence and independent scrutiny to shared knowledge. Those stages are deliberately different. [4]

When inspected on 26 October, the live version 4 site displayed a fallback warning because its browser had not loaded the source `CONTENTS.md`; the full manuscript-level view required a manual import or retry. It nevertheless kept the fallback taxonomy visible and did not invent paper-level descriptions. That is a real limitation, but also a decent example of honest interface design. [4]

**Why now?** AI systems can generate candidate research faster than the surrounding community can check, interpret and absorb it. A useful interface for this new world might not be the one that makes the claims look most impressive. It may be the one that preserves provenance, dependencies, corrections and uncertainty.

**The catch:** This is a small independent project. Its README and live site differ in version wording, and its dynamic catalogue loading depends on access to upstream files. We have not run the repository locally, verified its parsing logic or checked every paper mapping. The atlas is not affiliated with OpenAI, and neither the atlas nor Toolglass certifies the mathematical claims. OpenAI's 719-paper count and formalisation statistics are source-reported, not an independent correctness audit.

**The Toolglass test:** Import a pinned copy of the upstream catalogue and formalisation YAML, choose ten random papers, follow each to its PDF, compare the displayed claim and status to the source, then deliberately remove the catalogue to see whether the interface degrades honestly. That would be an interface and provenance test, not a mathematical peer review.

**Primary sources:** [1. OpenAI's 6 October announcement](https://openai.com/index/sharing-ai-progress-in-mathematics/); [2. Current OpenAI mathematics catalogue](https://github.com/openai/math); [3. OpenAI's dated correction and revision history](https://github.com/openai/math/blob/main/history.md); [4. Hayes's live atlas](https://chrisdhayes.github.io/openai-math-atlas/); [5. Atlas repository and version 5 notes](https://github.com/ChrisDHayes/openai-math-atlas). The live site was inspected as published; no local code execution or proof checking was performed.

---

### Discovery desk / editorial verdict

**Sova** is the most immediately appealing candidate for a hands-on creative-software review. **orangu** is the most ambitious engineering claim, and therefore the one most in need of bounded, reproducible testing. **The Evidence Atlas** is the most timely interface idea: a design built around the difference between producing an answer and knowing whether it deserves to be believed.

None should be promoted to **HANDS-ON** or **TESTED** on the strength of this issue alone.
