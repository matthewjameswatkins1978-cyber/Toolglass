---
title: DeepGEMM-Ascend
slug: deepgemm-ascend
section: Scout Notes
article_type: Desk-researched scout note
status: APPROVED
evidence_status: DESK-RESEARCHED / NOT TESTED
editor: Lucy
website_ready: true
published: 12 October 2026
---

# DeepGEMM-Ascend: the GPU lock-in story moves down a layer


It is tempting to describe the AI hardware contest as a race between chips. That is only half the contest. A powerful accelerator without fast matrix multiplication, communication routines, compiler support and familiar interfaces is a very expensive object waiting for software.

On 30 September, DeepSeek published [DeepGEMM-Ascend](https://github.com/deepseek-ai/DeepGEMM-Ascend), a port of its high-performance matrix-multiplication library for Huawei Ascend NPUs. It retains the public DeepGEMM API while hiding details of Ascend's matrix multiply-add primitives, alignment and internal layouts. The associated [DeepEP-Ascend](https://github.com/deepseek-ai/DeepEP-Ascend) addresses the communication needed to distribute tokens between the specialists inside a mixture-of-experts model. The unusual story is not that two libraries exist. It is that parts of a production-oriented AI stack are being rebuilt for a second hardware ecosystem without demanding that every caller learn a completely new vocabulary.

The project reports up to **99.8% of its stated hardware compute limit** for one BF16 dense matrix-multiplication case on Ascend 950DT with CANN 9.20. That is an impressive *vendor-published, shape-specific* measurement, not a universal performance result, an independent replication or proof that the hardware beats NVIDIA in real applications. The benchmark table also shows many other shapes and workloads. DeepGEMM-Ascend requires specialist Ascend hardware and software; ordinary desktop GPUs cannot run the relevant tests.

This is a direct descendant of an older idea: the BLAS library as the quiet machinery underneath scientific computing. A generation of programs could be portable at the top because somebody had done heroic work making matrix multiplication fast underneath. CUDA made a particular implementation ecosystem dominant; alternative backends will succeed or fail partly on whether their low-level libraries become good enough that application authors stop caring which machine is below them.

**Toolglass angle:** Interview or compare the kernel authors' published implementation notes against upstream DeepGEMM and CUTLASS, tracing one matrix operation through API, layout, compilation and device execution. If access to an Ascend 950 test system becomes possible, reproduce selected published cases with exact environment disclosure. Until then, do not print a performance verdict.

**Verdict:** **DESK REVIEW / DEEP TECH WATCH.** A more consequential software story than another AI benchmark leaderboard.