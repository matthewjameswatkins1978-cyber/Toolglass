export type Review = {
  slug: string;
  name: string;
  category: string;
  headline: string;
  summary: string;
  what: string;
  replaces: string;
  notReplaces: string;
  audience: string;
  platforms: string;
  licence: string;
  version: string;
  repo: string;
  catch: string;
  paragraphs: string[];
  nextTest: string;
  status: 'SCOUTED' | 'INSPECTED' | 'TESTED';
  evidenceStatus?: string;
  evidenceNote?: string;
  evidenceBoundary?: string;
  reviewedDate?: string;
  intro?: string[];
  sections?: { heading: string; paragraphs: string[] }[];
  receipt?: { label: string; value: string }[];
  visual?: 'spaghetti' | 'atlas' | 'termai';
};
export const reviews: Review[] = [
  {
    "slug": "spaghetti",
    "name": "Spaghetti",
    "category": "History & retrieval",
    "headline": "Your coding agents remember everything. Good luck finding any of it.",
    "summary": "Spaghetti builds a local search index from coding-agent history. We fed it three bounded real Codex sessions and discovered both a much better way to browse the past and a good reason not to uninstall `rg` just yet.",
    "intro": [
      "We knew the answer existed. That was the irritating part.",
      "Somewhere in a pile of old agent sessions was a discussion we had already had, a decision we had already made, or an error we had already fixed. The computer had remembered it perfectly. We had remembered just enough to know we were wasting our time doing the work twice.",
      "This is a new kind of filing cabinet from hell. Coding agents produce useful history at industrial speed, then leave it scattered across project folders, rollout files and tool-specific storage. Spaghetti is an attempt to turn that archaeology into search."
    ],
    "what": "A local-first index and search layer for coding-agent history.",
    "replaces": "Folder browsing and manual rg work for bounded conversational retrieval.",
    "notReplaces": "Raw rollout history or raw search; tool-output records may remain outside the normalized projection.",
    "audience": "People with enough coding-agent history that “I know we did this before” is a recurring problem.",
    "platforms": "Windows 10 Pro, x64 test bench; local source workspace",
    "licence": "MIT",
    "version": "v0.7.0 workspace; source HEAD c2852b8",
    "repo": "vibecook-dev/spaghetti",
    "catch": "The normalized index did not reproduce every raw-rollout match when tool-output records were omitted from the staged input.",
    "paragraphs": [],
    "nextTest": "Try a larger opt-in history slice, warm startup, malformed records, artifact navigation and mixed-source search without exposing private contents.",
    "status": "TESTED",
    "evidenceStatus": "TESTED",
    "evidenceNote": "We actually used it against a controlled fixture and a deliberately bounded copy of three real Codex sessions.",
    "evidenceBoundary": "The full private history tree was not indexed, raw transcript contents are not published, and this pass did not test mixed Claude/Codex/Grok data or network behaviour.",
    "reviewedDate": "6 September 2026",
    "visual": "spaghetti",
    "receipt": [
      {
        "label": "Status",
        "value": "TESTED"
      },
      {
        "label": "Platform",
        "value": "Windows"
      },
      {
        "label": "Version",
        "value": "v0.7.0 workspace"
      },
      {
        "label": "Tested",
        "value": "06 September 2026"
      },
      {
        "label": "Test type",
        "value": "Bounded real-history slice"
      },
      {
        "label": "Key measurement",
        "value": "94 ms startup; 1,007 segments; 3 projects / 3 sessions"
      },
      {
        "label": "Limitations",
        "value": "Codex-only slice; tool-output records omitted; complements raw rg"
      }
    ],
    "sections": [
      {
        "heading": "What is it?",
        "paragraphs": [
          "Spaghetti indexes local agent history into projects, sessions, messages, artifacts and search results backed by SQLite. That description makes it sound rather more clerical than it feels in use. The useful trick is that instead of asking you to remember which raw file belongs to which conversation, it gives the history some shape.",
          "The point is not merely to display transcripts. It is to answer the more human question: “Where did we solve that?”"
        ]
      },
      {
        "heading": "Why did Toolglass notice it?",
        "paragraphs": [
          "Because this problem barely existed a few years ago and is already becoming annoying.",
          "Agent-heavy development creates a peculiar surplus of memory. There is plenty of it, but retrieval is poor. The interesting thing about Spaghetti is that it does not pretend every scrap of history is equivalent or instantly searchable. It builds a normalized conversational projection while leaving the raw material underneath.",
          "That distinction matters, because it is also where the limits show up."
        ]
      },
      {
        "heading": "What does it replace?",
        "paragraphs": [
          "Not `rg`, despite appearances.",
          "For the kind of bounded conversational search we tried, Spaghetti replaced a lot of folder wandering and a fair amount of “which Codex session was that?” guesswork. A phrase present in its indexed conversational projection was quick to retrieve, and the result led cleanly back to the relevant project and session.",
          "What it really replaces is the increasingly ridiculous expectation that a human should remember which agent folder contains a conversation from three months ago."
        ]
      },
      {
        "heading": "What does it not replace?",
        "paragraphs": [
          "The underlying history, and raw search over it.",
          "Spaghetti's normalized index intentionally omits some tool-output records. That means a phrase present in raw output can be visible to `rg` and absent from Spaghetti search. In our test, that happened with terms including `Threadmoth formatting`, `database design`, and `cargo test`.",
          "That is not a gotcha. It is the boundary of the thing.",
          "Spaghetti is for structured conversational retrieval. Raw grep remains the shovel you reach for when you want to dig through absolutely everything."
        ]
      },
      {
        "heading": "What we actually tested",
        "paragraphs": [
          "We first used controlled fixtures, then staged a deliberately bounded copy of three real Codex rollout files. We did not point Spaghetti at a complete private history tree.",
          "The resulting slice exposed three projects and three sessions, produced 1,007 segments, and placed 988 of them in the searchable projection. Startup for the expanded three-session run was 94 ms on the Toolglass Windows bench.",
          "Project-to-session navigation returned the expected session for each project. Session navigation returned the expected message fields. Searches for `Lantern Keeper` and `Spaghetti` returned results from the retained projection.",
          "The private transcript contents and raw probe terms stay off the site. The interesting part is the behaviour, not somebody else's diary."
        ]
      },
      {
        "heading": "What worked",
        "paragraphs": [
          "The useful moment came when the raw history stopped feeling like files and started feeling like something you could browse.",
          "Project and session boundaries were immediately more comprehensible than a rollout tree. Search results gave us somewhere sensible to go next rather than merely a filename and a line number. For the material Spaghetti had normalized, that was a meaningful improvement over manual archaeology.",
          "The 94 ms startup on our tiny real-history slice was also pleasantly uneventful. We are not turning that into a grand performance claim. Three sessions are three sessions. But nothing about the tested slice felt lumbering.",
          "One small detail we liked: usage remained degraded with an explicit authorization diagnostic rather than bluffing its way into an “all ready” state. Software admitting what it does not know is underrated."
        ]
      },
      {
        "heading": "Where raw grep still wins",
        "paragraphs": [
          "This is the part that makes the review more interesting than “search tool good”.",
          "Spaghetti did not reproduce every match from the underlying rollout files. `rg` could find phrases in raw tool output that the normalized search never saw. If your target is an exact compiler message, a tool transcript, or some other record outside the retained projection, raw search may still be the better instrument.",
          "So no, we would not uninstall `rg`.",
          "We would stop asking it to be our entire memory system."
        ]
      },
      {
        "heading": "Who should care?",
        "paragraphs": [
          "Anyone who uses coding agents often enough to have developed the sentence: “I know we did this before.”",
          "That probably means heavy Codex, Claude Code and similar users working across multiple projects. If you have five sessions in total, Spaghetti may be an elaborate solution to a problem you do not yet possess. Give it time."
        ]
      },
      {
        "heading": "Toolglass view",
        "paragraphs": [
          "Spaghetti is solving a genuinely new housekeeping problem: our agents are accumulating useful memory faster than we can retrieve it.",
          "On the bounded history we tested, it made conversational history substantially easier to navigate and search. It did not make raw search obsolete, and the missing tool-output matches are exactly why we would keep both.",
          "That complementary verdict is stronger than pretending one tool has eaten the other. Spaghetti gives agent history a shape. `rg` still lets you crawl underneath the floorboards."
        ]
      },
      {
        "heading": "Things still untested",
        "paragraphs": [
          "Mixed-source indexing, a full private-history opt-in, warm startup, malformed records, artifact navigation and mixed-source search remain open. Our bounded pass does not support a no-telemetry claim or a performance claim about a complete history tree."
        ]
      },
      {
        "heading": "Toolglass Receipt",
        "paragraphs": [
          "```text\nSTATUS          TESTED\nPLATFORM        Windows\nVERSION         v0.7.0 workspace\nTESTED DATE     2026-09-06\nTEST TYPE       Bounded real-history slice\nKEY MEASUREMENT 94 ms startup; 1,007 segments; 3 projects / 3 sessions\nLIMITATIONS     Codex-only slice; tool-output records omitted; complements raw rg\n```"
        ]
      }
    ]
  }
,  {
    "slug": "atlas",
    "name": "Atlas",
    "category": "Agent reliability",
    "headline": "What if “done” were something an AI agent had to prove?",
    "summary": "Atlas is trying to turn “please don't quietly move the goalposts” from an instruction into software. Its Goal Contracts and evidence gates are only partly wired today, but the idea is interesting enough to deserve attention before the product is finished.",
    "intro": [
      "Coding agents are very good at finishing things. They are occasionally less good at finishing the thing you actually asked for.",
      "A file gets changed, the tests go green, a cheerful completion message appears, and only afterwards do you notice that one requirement quietly vanished on the journey. Perhaps a test was weakened. Perhaps the wrong file changed. Perhaps the agent satisfied three conditions and forgot the fourth.",
      "You can always add another sentence to the prompt: “Do not do that.” Atlas is interested in a more mechanical answer."
    ],
    "what": "A project exploring Goal Contracts and evidence gates for coding-agent work.",
    "replaces": "The hope that a final prompt will make task intent and completion evidence enforce themselves.",
    "notReplaces": "A complete agent runtime, evaluator or guarantee against drift; the live integration and persistence pieces remain partial.",
    "audience": "People building or evaluating coding agents who want task intent and completion evidence to become inspectable objects.",
    "platforms": "Windows source bench; live desktop/runtime path not exercised",
    "licence": "Apache-2.0",
    "version": "main snapshot; HEAD 8ccacf2",
    "repo": "wede-wx/atlas-agent",
    "catch": "ContractGate and ImpactEvidenceGate are present in the inspected enforcement slice, while Verifier, CompletionGate, reviewer integration and Goal Contract persistence remain partial or unwired.",
    "paragraphs": [],
    "nextTest": "Add durable Goal Contracts, wire the Verifier and completion enforcement into a live loop, then test useful failure modes without making ordinary work rigid.",
    "status": "INSPECTED",
    "evidenceStatus": "INSPECTED + FOCUSED TESTS",
    "evidenceNote": "We inspected the idea and ran its focused harness. This is not a complete end-to-end agent test.",
    "evidenceBoundary": "No model task, Tauri frontend launch, packaged reviewer flow or live agent loop was exercised. The harness proves mechanics in scope, not the whole product.",
    "reviewedDate": "6 September 2026",
    "visual": "atlas",
    "receipt": [
      {
        "label": "Status",
        "value": "INSPECTED + FOCUSED TESTS"
      },
      {
        "label": "Platform",
        "value": "Windows source bench"
      },
      {
        "label": "Version",
        "value": "main snapshot / HEAD 8ccacf2"
      },
      {
        "label": "Tested",
        "value": "06 September 2026"
      },
      {
        "label": "Test type",
        "value": "Focused harness"
      },
      {
        "label": "Key measurement",
        "value": "29 passed / 0 failed"
      },
      {
        "label": "Limitations",
        "value": "No model task, Tauri frontend, or packaged reviewer flow"
      }
    ],
    "sections": [
      {
        "heading": "The problem",
        "paragraphs": [
          "A normal prompt mixes several kinds of intent together. There is what you want changed, what must remain untouched, what evidence would count as success, and what shortcuts are forbidden. The model reads all of this as language, performs the work, then is often involved in judging whether its own work is finished.",
          "That arrangement has an obvious comic quality. It is a little like asking the contestant to operate the buzzer.",
          "Atlas tries to separate some of those conditions from the agent's own self-description."
        ]
      },
      {
        "heading": "The idea",
        "paragraphs": [
          "The central object is a Goal Contract: a structured representation of what the task must accomplish, what must be preserved and what must not happen.",
          "A request such as:",
          "```text\nChange config.json.\nDo not touch README.md.\nKeep all tests enabled.\n```",
          "is more than three polite sentences. In Atlas's model, those conditions can become things software inspects when actions are proposed and when evidence of completion arrives.",
          "That is the interesting shift. “Did you obey the task?” stops being solely a conversation with the model and starts becoming an engineering surface."
        ]
      },
      {
        "heading": "What exists today",
        "paragraphs": [
          "This is where enthusiasm needs a ruler.",
          "The current project contains a real enforcement slice. `ContractGate` and `ImpactEvidenceGate` are present and described in the inspected runtime path. The focused harness exercises concrete behaviours around contracts and evidence.",
          "But several important pieces are not yet wired into a complete live loop. The `Verifier` and `CompletionGate` exist in the harness and architecture, while reviewer integration, Goal Contract persistence and end-to-end completion enforcement remain partial or unwired in the version Toolglass inspected.",
          "So Atlas is not yet a finished answer to agent goal drift. The architecture is currently ahead of the product."
        ]
      },
      {
        "heading": "What Toolglass tested",
        "paragraphs": [
          "We ran the project's focused harness: 29 tests, 29 passes.",
          "The set covers more than happy-path parsing. It includes preserved-path blocking, normalization intended to catch path obfuscation, fail-closed treatment of unknown writes, commands that could defeat verification, mass-deletion detection, evidence arriving from outside the permitted scope, conservative verifier parsing and completion decisions tied to verification state.",
          "That is useful evidence that the enforcement ideas have executable substance.",
          "It is not evidence that a live coding agent completed a real project under the full Atlas architecture. We did not run a packaged end-to-end model task, and the parts needed to make that claim are precisely the parts still being connected."
        ]
      },
      {
        "heading": "Why this is worth watching",
        "paragraphs": [
          "Atlas is less interesting as another coding agent than as an argument about what “done” should mean.",
          "Most agent systems still place enormous weight on prompts, model judgement and post-hoc tests. Atlas is experimenting with a different boundary: encode some of the task's invariants, observe the impact of actions, require evidence, and make completion conditional on more than the model saying everything looks fine.",
          "Whether Atlas itself becomes the important implementation is almost secondary at this stage. The idea feels larger than one repository.",
          "If coding agents are going to perform longer and more autonomous jobs, “prove that you satisfied the contract” is likely to become a more interesting sentence than “please be careful”."
        ]
      },
      {
        "heading": "What would make it important?",
        "paragraphs": [
          "Four things would move Atlas from interesting architecture toward a convincing product:",
          "- durable Goal Contracts that survive the real workflow\n- the Verifier actually wired into that workflow\n- completion enforcement in the live agent loop\n- a packaged end-to-end task demonstrating that the gates stop realistic failure modes without strangling legitimate work",
          "Those are not complaints disguised as a roadmap. They are the experiments that would let the project make a much stronger claim.",
          "For now, Atlas has shown enough machinery to make the question worth following."
        ]
      },
      {
        "heading": "Toolglass Receipt",
        "paragraphs": [
          "```text\nSTATUS          INSPECTED + FOCUSED TESTS\nPLATFORM        Windows source bench\nVERSION         main snapshot / HEAD 8ccacf2\nTESTED DATE     2026-09-06\nTEST TYPE       Focused harness\nKEY MEASUREMENT 29 passed / 0 failed\nLIMITATIONS     No model task, Tauri frontend, or packaged reviewer flow\n```"
        ]
      }
    ]
  }
,  {
    "slug": "termai",
    "name": "TermAI",
    "category": "Terminal assistants",
    "headline": "TermAI looked interesting. Windows disagreed.",
    "summary": "TermAI promises a terminal-native assistant with local sessions, branching, Git helpers and several provider paths. We never reached any of that. On our Windows bench, the current source build stopped at the compiler.",
    "intro": [
      "There is a particular kind of software review that lasts just long enough to become interesting.",
      "You read the documentation, inspect the source, find a workflow with enough personality to justify another terminal AI tool, type the build command, and then spend the next few minutes staring at Rust errors instead of a prompt.",
      "That was TermAI."
    ],
    "what": "A terminal-native assistant with local sessions, branching, Git helpers and several provider paths.",
    "replaces": "Potentially a collection of provider CLIs and ad hoc notes around a repository conversation.",
    "notReplaces": "A working provider session or a verified Windows runtime; none of those behaviours were reached.",
    "audience": "Terminal-oriented developers interested in keeping assistant conversations inspectable and close to the repository.",
    "platforms": "Windows 10 Pro, x64 test bench; runtime not reached",
    "licence": "MIT",
    "version": "v0.1.0 / commit 52089b3",
    "repo": "kyco/termai",
    "catch": "The version inspected failed its Windows source build before a binary was created. This is a snapshot- and environment-specific blocker, not a claim that TermAI can never build.",
    "paragraphs": [],
    "nextTest": "Revisit after a portability repair or supported Windows artifact is available, then test prompt, persistence and provider boundaries separately.",
    "status": "INSPECTED",
    "evidenceStatus": "INSPECTED / BUILD BLOCKED",
    "evidenceNote": "We tried to build it and never reached runtime. Interesting software does not have to pass every test to deserve coverage.",
    "evidenceBoundary": "No credentials were created, read or used. No provider login, model session, persistence, branching, Git command or web tool was tested.",
    "reviewedDate": "6 September 2026",
    "visual": "termai",
    "receipt": [
      {
        "label": "Status",
        "value": "INSPECTED / BUILD BLOCKED"
      },
      {
        "label": "Platform",
        "value": "Windows"
      },
      {
        "label": "Version",
        "value": "v0.1.0 / commit 52089b3"
      },
      {
        "label": "Tested",
        "value": "06 September 2026"
      },
      {
        "label": "Test type",
        "value": "Release build attempt"
      },
      {
        "label": "Key measurement",
        "value": "Binary not produced; build stopped at compiler errors"
      },
      {
        "label": "Limitations",
        "value": "No runtime, provider, credential, or live-task test"
      }
    ],
    "sections": [
      {
        "heading": "Why we noticed it",
        "paragraphs": [
          "The attraction was not simply “AI, but in a terminal”. That shelf is already crowded.",
          "TermAI's more interesting pitch is coherence: local sessions you can inspect and resume, conversation branching, project context, Git helpers and multiple provider paths gathered into one terminal-native workflow. The repository is also fairly explicit about where authentication and local state live, which is the sort of boring detail that becomes important the moment software starts talking to models on your behalf.",
          "There was enough there to make us want to try it rather than merely bookmark it."
        ]
      },
      {
        "heading": "What happened when we tried",
        "paragraphs": [
          "We attempted the documented source build on Windows with:",
          "```text\ncargo build --release\n```",
          "No binary emerged.",
          "Compilation stopped on two classes of error in the snapshot we tested: Unix-only permissions APIs used in `src/git/hooks.rs`, and ambiguous type inference around `rng.gen()` in the PKCE implementation.",
          "That is as far as the hands-on review honestly goes.",
          "We did not patch the project until it built and then pretend the normal installation path had worked. Toolglass was trying the software that existed, on the platform in front of us."
        ]
      },
      {
        "heading": "What we did not test",
        "paragraphs": [
          "Quite a lot, and this is where short scout notes earn their keep.",
          "We never reached `--help`. We never logged into a provider. No API credentials were supplied. We did not start a runtime session, branch a conversation, point TermAI at a fixture repository or exercise its Git integration. We have no hands-on evidence that its provider paths or persistence behave as documented.",
          "Those remain project claims, not Toolglass findings."
        ]
      },
      {
        "heading": "Is that the end of it?",
        "paragraphs": [
          "No.",
          "A failed Windows build is meaningful, especially for software that appears to invite Windows users in, but it is not a verdict on every idea inside the repository. The source and documentation still describe a workflow we would like to test properly, and the project contains tests aimed at exercising core CLI behaviour without requiring live network access or API keys.",
          "A portable build, or simply a source snapshot that gets us to a provider-free first run, would be enough to put TermAI back on the bench.",
          "For now the bounded conclusion is deliberately boring and precise: **v0.1.0 at commit `52089b3` did not reach first launch on our Windows test environment.**",
          "Sometimes that is the review."
        ]
      },
      {
        "heading": "Toolglass Receipt",
        "paragraphs": [
          "```text\nSTATUS          INSPECTED / BUILD BLOCKED\nPLATFORM        Windows\nVERSION         v0.1.0 / commit 52089b3\nTESTED DATE     2026-09-06\nTEST TYPE       Release build attempt\nKEY MEASUREMENT Binary not produced; build stopped at compiler errors\nLIMITATIONS     No runtime, provider, credential, or live-task test\n```"
        ]
      }
    ]
  }
,  {
    slug: 'narwhal',
    name: 'narwhal',
    category: 'Database tools',
    headline: 'A whole database workbench. One terminal.',
    summary:
      'Six database engines, a terminal interface and an unusually broad brief. Worth a closer look.',
    what: 'A terminal database client with SQL editing, schema tools and a built-in MCP server. MCP lets compatible assistants call software tools.',
    replaces:
      'Potentially several database command-line clients and a separate database MCP adapter for routine work.',
    notReplaces:
      'The database itself, backups, or the judgement required to make a safe production change.',
    audience:
      'Developers and database operators comfortable with SQL and a terminal.',
    platforms:
      'Terminal; platform-specific installation support needs testing.',
    licence: 'MIT / Apache-2.0',
    version: 'v2.3.0',
    repo: 'Nonanti/narwhal',
    catch:
      'Support varies by driver. Query cancellation, for example, is not listed for every engine. Feature breadth is not evidence of equal maturity.',
    paragraphs: [
      'The appeal is consolidation. Database work tends to spill across a query window, a shell and another tool for examining structure. A shared interface could make that work less fragmented. The question is whether it stays legible as the tasks become complicated.',
      'Our interest is strongest at the boundary between human and assistant use. If both reach the same connection through one client, we want to understand whether the same limits really follow them. A read-only label is a starting point for a test, not the conclusion of one.',
    ],
    nextTest:
      'Use a disposable database, exercise a normal query and a deliberate failure, then check read-only behaviour through both the terminal and MCP.',
    status: 'SCOUTED',
  },
  {
    slug: 'tracelet',
    name: 'tracelet',
    category: 'Developer tools',
    headline: 'Watch the agent. Not the spinner.',
    summary:
      'A local view into the calls, prompts and pauses behind an AI run.',
    what: 'A local OpenTelemetry trace collector and viewer for AI-agent execution. A trace is a record of the steps a program took.',
    replaces:
      'Potentially a heavier tracing service during local development, when all you need is to understand one run.',
    notReplaces:
      'Production monitoring, alerting, or instrumentation inside the application being observed.',
    audience:
      'People building agents who need to see what happened between request and response.',
    platforms:
      'Node.js and a browser; operating-system compatibility not tested.',
    licence: 'MIT',
    version: 'v0.2.1',
    repo: 'jnMetaCode/tracelet',
    catch:
      'The default trace buffer is in memory. Persistence is optional, and useful visibility still depends on what your application emits.',
    paragraphs: [
      'A spinner tells you that something is happening. It does not tell you whether the model is thinking, a tool is waiting or a request has quietly failed. Local tracing promises a much more useful conversation with the program.',
      'The small setup is the attraction here. We would start with a familiar workload and compare its known steps with what appears in the viewer. Missing steps matter just as much as a pleasing timeline. Cost estimates also deserve to be read as estimates, not billing records.',
    ],
    nextTest:
      'Send a known synthetic trace, restart the collector, and compare default retention with explicitly enabled persistence.',
    status: 'SCOUTED',
  },
  {
    slug: 'outl',
    name: 'outl',
    category: 'Notes & knowledge',
    headline: 'Your notes. Still your files.',
    summary:
      'An outliner that puts plain Markdown at the centre of the bargain.',
    what: 'A local-first outliner with Markdown files and a tree-based synchronisation design.',
    replaces:
      'Potentially a Roam- or Logseq-style outlining workflow for people who prefer ordinary files.',
    notReplaces:
      'Every plugin, publishing feature or collaboration workflow of an established notes system.',
    audience: 'Writers, researchers and people who think in nested notes.',
    platforms:
      'macOS / Linux; iOS and Android beta channels are documented. Not tested.',
    licence: 'MIT',
    version: 'Not independently verified',
    repo: 'outlmd/outl',
    catch:
      'Offline conflict handling is an important claim that needs testing. Beta mobile distribution also has practical limitations.',
    paragraphs: [
      'There is a useful difference between being able to export your notes and having them exist as readable files all along. The second makes leaving less dramatic. It also gives you a way to inspect your work without relying on the application.',
      'Outlining adds a harder problem: moving a paragraph changes a tree, not just a line of text. We want to see what happens when two devices move the same material while offline. A tidy demonstration cannot settle that question.',
    ],
    nextTest:
      'Edit and move the same nested blocks on two offline devices, reconnect them, and inspect both the visible outline and the Markdown.',
    status: 'SCOUTED',
  },
  {
    slug: 'chrondb',
    name: 'ChronDB',
    category: 'Databases',
    headline: 'What if your database could rewind?',
    summary:
      'Git-style history is a compelling idea. Compatibility is the harder question.',
    what: 'A chronological key/value database built around Git architecture and version history.',
    replaces:
      'Potentially a custom history layer around changing key/value records.',
    notReplaces:
      'Redis or PostgreSQL without workload-specific compatibility checks. Speaking a protocol does not establish feature parity.',
    audience:
      'Developers exploring historical records, branches and time-aware data.',
    platforms: 'Server / container deployment; host support not tested.',
    licence: 'AGPL-3.0',
    version: 'Not independently verified',
    repo: 'avelino/chrondb',
    catch:
      'Protocol coverage, transaction behaviour and operational costs need checking against the exact application you intend to run.',
    paragraphs: [
      'Most databases are good at telling you what a value is now. Asking what it used to be often means building another system beside the first one. A database organised around history changes that starting assumption.',
      'The useful review would separate two questions: does the history model solve a real problem, and how far can existing clients travel without surprises? We have not run that comparison. Until we do, the presence of familiar protocol names should not be read as a drop-in replacement verdict.',
    ],
    nextTest:
      'Define a small client workload, list its required commands, and test those alongside historical reads and restart recovery.',
    status: 'SCOUTED',
  },
  {
    slug: 'mcp',
    name: 'mcp by Avelino',
    category: 'Command-line tools',
    headline: 'A protocol meets the command line.',
    summary:
      'Call MCP tools from a shell. A small bridge with an unusually useful destination.',
    what: 'A command-line client that exposes MCP server tools as terminal commands with JSON output.',
    replaces:
      'Potentially small, hand-written MCP clients and one-off integration scripts.',
    notReplaces:
      'The server, its permissions or the service behind it. It does not make an unsafe tool safe.',
    audience:
      'Developers who like pipes and scripts and already have an MCP server to call.',
    platforms:
      'macOS / Linux via Homebrew; other release targets require checking.',
    licence: 'MIT',
    version: 'v0.6.2',
    repo: 'avelino/mcp',
    catch:
      'Authentication, server compatibility and failure handling remain part of the job. A successful happy-path call is only the beginning.',
    paragraphs: [
      'A tool does not need to be a destination to be useful. Sometimes the best contribution is making an existing capability available where work already happens. JSON output brings MCP calls within reach of ordinary shell processing.',
      'The first thing we would inspect in use is failure. Scripts need to distinguish an empty answer from a rejected call, a timeout or expired authentication. That distinction matters more than how short the example command looks.',
    ],
    nextTest:
      'Compare a successful call, an invalid argument, a timeout and denied access; inspect exit codes and output for each.',
    status: 'SCOUTED',
  },
  {
    slug: 'gitdesktop',
    name: 'GitDesktop',
    category: 'Development workflow',
    headline: 'Less browser hopping. More repository.',
    summary:
      'A keyboard-first Git client with ambitions beyond the commit window.',
    what: 'A desktop Git client bringing repository work and hosting-service features into one application.',
    replaces:
      'Potentially part of a Git GUI plus the browser trips needed for pull requests, issues and build activity.',
    notReplaces:
      'Understanding a merge, your hosting service, or every advanced command-line Git operation.',
    audience:
      'Developers who want a visual Git workflow without constantly reaching for the mouse.',
    platforms: 'Windows / macOS / Linux (published targets; not tested).',
    licence: 'Apache-2.0',
    version: 'v0.11.1',
    repo: 'theBGuy/GitDesktop',
    catch:
      'The breadth of integrations creates many paths to verify. Account authentication and platform behaviour need their own checks.',
    paragraphs: [
      'The interesting unit here is a working session, not a feature count. Can you inspect a change, understand its context and follow it through review without repeatedly losing your place? That would be a meaningful improvement.',
      'We would begin with an ordinary repository and a deliberately awkward conflict. A client earns trust when it makes the state understandable, especially when an operation cannot proceed. Extra AI features do not answer that basic question.',
    ],
    nextTest:
      'Clone a disposable repository, create divergent edits, resolve a conflict and verify the resulting history with Git itself.',
    status: 'SCOUTED',
  },
  {
    slug: 'pad-local',
    name: 'pad.local',
    category: 'Workspaces',
    headline: 'A desk with room for the whole thought.',
    summary:
      'Editors, terminals and browser panels share an infinite local canvas.',
    what: 'A desktop workspace that arranges an editor, terminal, browser and other panels on a canvas.',
    replaces:
      'Potentially the window arrangement and context switching around a supported code editor.',
    notReplaces:
      'The underlying editor or every IDE. A local shell also does not make external AI services local.',
    audience:
      'Developers who use spatial organisation to keep related work together.',
    platforms: 'Windows / macOS / Linux (published binaries; not tested).',
    licence: 'MIT',
    version: 'v2.7.4',
    repo: 'ymerej-noyorb/pad.local',
    catch:
      'The README excludes WSL and limits embedded editors to supported VS Code-family applications. Binaries are described as unsigned.',
    paragraphs: [
      'A canvas is useful when position carries meaning: the terminal belongs beside this file; the reference belongs beside that browser. It is less useful when the map becomes another thing to maintain. Both outcomes are plausible here.',
      'The proposed test is deliberately mundane. Open a real set of working panels, close the application and come back tomorrow. Does the arrangement survive, and can the keyboard still take you where you need to go? That will tell us more than an empty canvas screenshot.',
    ],
    nextTest:
      'Create a modest workspace, restart it, check state recovery and keyboard navigation, and record memory use with the same panels open.',
    status: 'SCOUTED',
  },
  {
    slug: 'jbundle',
    name: 'jbundle',
    category: 'Build & distribution',
    headline: 'Ship the app. Bring the runtime.',
    summary:
      'A practical answer to “install Java first”, with a distinction worth keeping clear.',
    what: 'A packaging tool that combines a JVM application and a minimal Java runtime into a self-contained executable.',
    replaces:
      'Potentially a separate Java installation step for the person receiving your application.',
    notReplaces:
      'GraalVM native compilation. Bundling a JVM is a different approach with different size and startup trade-offs.',
    audience:
      'JVM developers distributing applications to people who should not have to configure Java.',
    platforms:
      'Windows / macOS / Linux tooling is documented; target combinations need testing.',
    licence: 'MIT',
    version: 'v0.2.0',
    repo: 'avelino/jbundle',
    catch:
      'Self-contained does not mean runtime-free. Size, runtime updates and target-platform compatibility still need attention.',
    paragraphs: [
      'Distribution is part of the product. If the first experience of an application is diagnosing a missing runtime, the developer has handed some of the packaging work to the user. Bundling can remove that burden.',
      'The important comparison is with your current delivery process. We would measure the resulting file, time a cold launch and try it on a clean machine. There is no need to claim that one packaging strategy wins every workload for this one to be useful.',
    ],
    nextTest:
      'Package a small application and run it on a clean machine without Java; check launch behaviour and record the bundled runtime version.',
    status: 'SCOUTED',
  },
];
export const checkedDate = '5 September 2026';
