import type { Review } from './reviews';

export const weeklyScouts: Review[] = [
  {
    "slug": "vectorcraft",
    "name": "VectorCraft",
    "category": "Vector illustration / programmable creative tools",
    "headline": "The drawing program with a command channel",
    "summary": "VectorCraft is a pre-1.0 vector editor that exposes a JSON control channel and MCP server alongside its human interface. The question for Toolglass is whether that makes careful, editable magazine artwork easier to author and verify.",
    "what": "A pure-Rust vector illustration application with desktop and WebAssembly builds, an editable native document format, SVG/PDF interchange and an agent-facing control channel.",
    "replaces": "Potentially some repetitive GUI work in a vector-art workflow. That is a hypothesis for a small local pilot, not a proven replacement for Illustrator or a tested Toolglass integration.",
    "notReplaces": "It does not yet promise complete Illustrator compatibility; native .ai interchange, scripting and interaction fidelity have documented gaps.",
    "audience": "Illustrators curious about open vector tools, and developers exploring programmatic control of creative applications.",
    "platforms": "macOS / Windows / Linux / FreeBSD / WebAssembly (upstream description)",
    "licence": "MIT or Apache-2.0",
    "version": "v0.9.0; pre-1.0, checked 12 October 2026",
    "repo": "storytold/vectorcraft",
    "catch": "The feature-depth and readiness figures are upstream self-assessments. Native .ai interchange and several interaction-fidelity and scripting areas remain incomplete.",
    "paragraphs": [
      "The unusual idea is not simply “Illustrator, rebuilt in Rust.” VectorCraft treats operation by another program as part of the application interface: its JSON control channel and MCP server expose drawing, menus, panels and export operations.",
      "That could fit Toolglass’s existing method of drawing concept plates as editable vector geometry, then exporting them for the site. We have not installed VectorCraft or tried the control interface; the result worth testing is whether a tiny, reversible edit stays editable and visually faithful."
    ],
    "nextTest": "Open a copy of an existing Toolglass SVG, alter three precise elements through the control channel, export it and compare both appearance and editability. Do not change the production art pipeline until that pilot is reviewed.",
    "status": "SCOUTED",
    "evidenceStatus": "DESK-RESEARCHED / NOT TESTED",
    "evidenceNote": "Public README, MCP documentation, roadmap and v0.9.0 release notes reviewed on 12 October 2026. All compatibility and readiness estimates are attributed to the project.",
    "evidenceBoundary": "No installation, UI operation, control-channel call, export test or independent Illustrator comparison was performed.",
    "reviewedDate": "12 October 2026"
  },
  {
    "slug": "waveflow",
    "name": "WaveFlow",
    "category": "Local music / audio engineering",
    "headline": "Your music files are not a subscription",
    "summary": "WaveFlow is a local-first desktop music player whose 1.8 series adds cross-platform exclusive audio output and a substantial set of library and playback features. Its device and file-integrity claims are specific enough to test on an ordinary listening setup.",
    "what": "A Windows, macOS and Linux music player for local libraries, with high-resolution formats, exclusive output, smart playlists, ReplayGain, tag editing, plugins and optional network services.",
    "replaces": "A conventional local music library player, for listeners who want more control over playback and metadata.",
    "notReplaces": "It does not provide a streaming-catalogue subscription. “Local-first” also does not mean network-free when lyrics, scrobbling, plugins or server features are enabled.",
    "audience": "Listeners with local music libraries and people who care about the audio device and metadata path, not only the play button.",
    "platforms": "Windows / macOS / Linux",
    "licence": "GPL-3.0-or-later",
    "version": "v1.8.4 (9 October 2026)",
    "repo": "InstaZDLL/WaveFlow",
    "catch": "Exclusive mode can reserve an audio device; DSD-over-PCM needs a compatible DAC chain. The macOS bundle is unsigned. Claims about sample-rate handling and tag preservation need hands-on checks.",
    "paragraphs": [
      "The old bargain of a music player was simple: the files were yours and the computer played them. WaveFlow revisits that bargain in a category increasingly dominated by rented catalogues and recommendation surfaces.",
      "The 1.8 release describes exclusive output on Windows, Linux and macOS, alongside ReplayGain, smart playlists and safer tag editing. The output-device menu reportedly tells you what actually opened. That is an unusually useful claim, but it remains an upstream description until we check a known file and DAC."
    ],
    "nextTest": "On Windows, use a known FLAC album and compatible DAC. Record the opened device and sample rate; check exclusive-mode behaviour, gapless transitions, ReplayGain, offline operation and whether a tag round trip preserves unrelated metadata.",
    "status": "SCOUTED",
    "evidenceStatus": "DESK-RESEARCHED / NOT TESTED",
    "evidenceNote": "Upstream README and v1.8.0–v1.8.4 release history reviewed on 12 October 2026. The latest release observed was v1.8.4, dated 9 October.",
    "evidenceBoundary": "No installation, audio-path measurement, listening test, metadata edit or offline-mode test was performed. Audio fidelity claims remain unverified by Toolglass.",
    "reviewedDate": "12 October 2026"
  },
  {
    "slug": "deepgemm-ascend",
    "name": "DeepGEMM-Ascend",
    "category": "AI accelerator kernels / open infrastructure",
    "headline": "The GPU lock-in story moves down a layer",
    "summary": "DeepGEMM-Ascend ports DeepSeek’s matrix-multiplication library to Huawei Ascend NPUs while keeping its public API aligned with upstream DeepGEMM. The interesting question is whether an alternative hardware stack can grow enough low-level software to make applications portable.",
    "what": "A high-performance matrix multiplication kernel library for Huawei Ascend hardware, with APIs designed to align with DeepSeek’s NVIDIA-oriented DeepGEMM project.",
    "replaces": "Potentially, the matching low-level GEMM backend for applications being ported to supported Ascend NPUs.",
    "notReplaces": "It is not a general desktop-GPU library, a complete AI software stack or evidence that Ascend outperforms NVIDIA in real workloads.",
    "audience": "AI systems engineers and researchers working with Ascend hardware, compiler toolchains and mixture-of-experts infrastructure.",
    "platforms": "Huawei Ascend 950-series NPU with CANN 9.20 and Torch NPU (upstream requirements)",
    "licence": "MIT",
    "version": "Initial public release, 30 September 2026",
    "repo": "deepseek-ai/DeepGEMM-Ascend",
    "catch": "Requires specialist Ascend hardware and software. The headline 99.8% figure is a publisher-reported result for one shape on Ascend 950DT, not an independent or general performance comparison.",
    "paragraphs": [
      "A capable accelerator is only half a system. Matrix kernels, communication libraries, compilers and familiar APIs decide whether developers can use the hardware without rebuilding every application from scratch.",
      "DeepGEMM-Ascend retains compatibility with the public DeepGEMM API while mapping operations onto Ascend matrix multiply-add primitives and layouts. The paired DeepEP-Ascend project covers communication paths for distributed expert models. This is an ecosystem story, not a benchmark verdict: Toolglass does not have the specialist hardware needed to reproduce the published results."
    ],
    "nextTest": "Compare one operation through upstream DeepGEMM and DeepGEMM-Ascend: API, data layout, compilation and execution. If an Ascend 950 system becomes available, reproduce selected published cases with full hardware and software disclosure.",
    "status": "SCOUTED",
    "evidenceStatus": "DESK-RESEARCHED / NOT TESTED",
    "evidenceNote": "DeepSeek’s DeepGEMM-Ascend and DeepEP-Ascend repositories plus upstream DeepGEMM reviewed on 12 October 2026. Benchmarks are attributed to the publisher.",
    "evidenceBoundary": "No Ascend hardware, toolchain, installation or benchmark was available or used. Performance is unverified; the published figures are shape- and hardware-specific.",
    "reviewedDate": "12 October 2026"
  }
];
