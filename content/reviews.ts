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
  sections?: { heading: string; paragraphs: string[] }[];
  receipt?: { label: string; value: string }[];
  visual?: 'spaghetti' | 'atlas' | 'termai';
};
export const reviews: Review[] = [
  {
    slug: 'spaghetti',
    name: 'Spaghetti',
    category: 'History & retrieval',
    headline:
      'Your coding agents remember everything. Good luck finding any of it.',
    summary:
      'Spaghetti turns scattered coding-agent sessions into a local searchable index. We fed it a controlled slice of real Codex history to see whether it beats archaeology by rg.',
    what: 'A local-first index and search layer for coding-agent history. Its documentation describes Claude Code, OpenAI Codex and Grok CLI inputs feeding a SQLite-backed store organised around projects, sessions and messages.',
    replaces:
      'Manual rg searches, folder browsing and the fragile memory of which agent or session contained a useful decision.',
    notReplaces:
      'Raw rollout history or raw grep. Tool-output matches can remain outside a normalized conversational projection, and this test did not establish a universal history-retrieval guarantee.',
    audience:
      'People with enough Codex, Claude Code or other agent history that “I know we solved this before” is a recurring problem.',
    platforms: 'Windows 10 Pro, x64 test bench; local source workspace',
    licence: 'MIT',
    version: 'v0.7.0 workspace; source HEAD c2852b8',
    repo: 'vibecook-dev/spaghetti',
    catch:
      'The fresh-checkout build path needs care, and the bounded normalized index did not reproduce every raw-rollout match when tool-output records were omitted from the staged input.',
    paragraphs: [],
    nextTest:
      'Try a larger opt-in history slice, warm startup, malformed records, artifact navigation and mixed-source search without exposing private contents.',
    status: 'TESTED',
    evidenceStatus: 'TESTED',
    evidenceNote:
      'We actually used it: a controlled fixture and a deliberately bounded copy of three real Codex rollouts.',
    evidenceBoundary:
      'The full private history tree was not indexed, raw transcript contents are not published, and this pass did not test mixed Claude/Codex/Grok data or network behaviour.',
    reviewedDate: '6 September 2026',
    visual: 'spaghetti',
    receipt: [
      { label: 'Status', value: 'TESTED' },
      { label: 'Platform', value: 'Windows 10 Pro, x64' },
      { label: 'Real sessions', value: '3' },
      { label: 'Projects', value: '3' },
      { label: 'Segments', value: '1,007 total / 988 search-indexed' },
      { label: 'Startup', value: '94 ms on tested slice' },
      { label: 'Test type', value: 'Controlled + bounded real history' },
      { label: 'Tested', value: '06 September 2026' },
    ],
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'Coding agents are becoming surprisingly good at leaving behind useful work. A conversation contains the decision we made, the failed approach we abandoned, the command that finally worked, and the explanation we will want again in six months. Then the moment arrives when we remember only this: “I know we solved that. Which agent was it? Which project? Which session?”',
          'That is a new kind of personal-computing archaeology. The history exists, but it is fragmented across agent-specific folders and formats. Spaghetti is interesting because it starts with retrieval rather than another model prompt.',
        ],
      },
      {
        heading: 'What we actually tested',
        paragraphs: [
          'First we built the v0.7.0 workspace on the Toolglass Windows machine. The CLI, SDK and Windows native Rust addon had to be built in the right order. Once the native path was available, the repository’s synthetic medium Claude fixture indexed 9 projects and 32 sessions, with 42 hits for the test phrase “hot loop”.',
          'Then we used a deliberately bounded real-history slice. We copied three Codex rollout files into a separate local staging directory, retaining only session metadata and message/reasoning records and scrubbing obvious key-shaped patterns. We did not pass the live Codex root to Spaghetti, and we did not index the full 14.6 GB history tree.',
          'The staged run produced 3 projects, 3 sessions, 1,007 segments and 988 search-indexed segments. Startup took 94 ms in this test. Catalog, history, capability, artifact and search readiness all reached ready; usage stayed degraded with an explicit authorization diagnostic.',
        ],
      },
      {
        heading: 'What worked',
        paragraphs: [
          'The project/session model was understandable immediately. Spaghetti found the three copied Codex sessions, grouped them into projects from their session metadata, and exposed session content through the normalized message page. Search queries returned structured counts, result scope and snippets in the working API. Two probes returned 16 and 9 hits in the staged slice; private query terms are intentionally not reproduced here.',
          'This is where the product starts to beat folder browsing. A person does not need to remember the date or filename of a rollout if the useful phrase is in the indexed conversational text. They can search the concept, see the project and session boundary, and navigate from there.',
          'The readiness model is another good detail. Catalog discovery can be visible before every downstream projection is complete, and the usage surface can say that it is degraded instead of pretending to be authoritative. That is the sort of operational honesty a history tool needs.',
        ],
      },
      {
        heading: 'Where raw grep still wins',
        paragraphs: [
          'Spaghetti is not a replacement for rg. It is a replacement for treating rg as your entire memory system.',
          'On the full local rollout tree, read-only rg -l found matches for all six comparable probes. In the bounded Spaghetti index, only two of those probes produced hits; the other phrases were absent from the normalized projection we tested. The probe terms are omitted from this article to avoid publishing history content.',
          'There is an important qualification: our staging transformation intentionally omitted tool-output records. The result demonstrates a real boundary of the review surface rather than a universal benchmark of every Spaghetti input path. When the thing we remember is a command result rather than a conversational sentence, raw files may still be the better search target.',
        ],
      },
      {
        heading: 'Who should use it?',
        paragraphs: [
          'Spaghetti is aimed at people with enough agent history that “I know we solved this before” is a recurring problem: heavy Codex or Claude Code users, people working across many repositories, and developers who move between agent tools. It is probably unnecessary if you have five sessions and remember all of them.',
          'The strongest use case is not analytics. It is recovering a decision. The SQLite implementation matters because it gives the project a canonical local place to put that history, but the user-facing promise is simpler: find the conversation again.',
        ],
      },
      {
        heading: 'Toolglass view',
        paragraphs: [
          'Spaghetti solves a problem that barely existed two years ago and is already becoming annoying: agents accumulate memory faster than their users can retrieve it.',
          'Our bounded real-Codex pass is enough to make the idea credible and the review publishable. It is not evidence that every agent format, every tool output or an entire lifetime of history will be found. We would keep raw search beside it. Still, a local normalized index that turns at least some “lost” sessions back into addressable project history feels like the right shape of tool for the next phase of agent-heavy development.',
        ],
      },
    ],
  },
  {
    slug: 'atlas',
    name: 'Atlas',
    category: 'Agent reliability',
    headline: 'What if “done” were something an AI agent had to prove?',
    summary:
      'Atlas is experimenting with Goal Contracts and enforcement gates designed to stop coding agents quietly moving the goalposts. Parts work today. Parts very much do not yet. That is why it is interesting.',
    what: 'A project exploring Goal Contracts: structured descriptions of what a task must accomplish, what must be preserved and what must not happen, with gates that can inspect proposed actions and evidence.',
    replaces:
      'The hope that a final instruction such as “verify this before saying done” will be remembered and enforced by the same system doing the work.',
    notReplaces:
      'A complete agent runtime, a model evaluator or a guarantee that an end-to-end agent cannot drift. The live integration and persistence pieces are still incomplete.',
    audience:
      'People building or evaluating coding agents who want task intent and completion evidence to become inspectable software objects.',
    platforms: 'Windows source bench; live desktop/runtime path not exercised',
    licence: 'Apache-2.0',
    version: 'Source snapshot; HEAD 8ccacf2',
    repo: 'wede-wx/atlas-agent',
    catch:
      'ContractGate and ImpactEvidenceGate are present in the runtime-wired slice, while Verifier, CompletionGate, reviewer integration and Goal Contract persistence remain partial or unwired.',
    paragraphs: [],
    nextTest:
      'Add durable Goal Contracts, wire the Verifier and completion enforcement into a live loop, then test whether useful failure modes are caught without making ordinary work rigid.',
    status: 'INSPECTED',
    evidenceStatus: 'INSPECTED + FOCUSED HARNESS TESTS',
    evidenceNote:
      'We investigated the idea and ran its focused harness. This is not a complete end-to-end agent test.',
    evidenceBoundary:
      'No model task, Tauri frontend launch, packaged reviewer flow or live agent loop was exercised. The harness proves mechanics in scope, not the whole product.',
    reviewedDate: '6 September 2026',
    visual: 'atlas',
    receipt: [
      { label: 'Status', value: 'INSPECTED' },
      { label: 'Harness', value: '29 focused tests passed' },
      { label: 'Present', value: 'ContractGate' },
      { label: 'Present', value: 'ImpactEvidenceGate' },
      { label: 'Partial', value: 'Verifier' },
      { label: 'Partial', value: 'CompletionGate' },
      { label: 'Partial', value: 'Goal Contract persistence' },
      { label: 'Checked', value: '06 September 2026' },
    ],
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'An agent can satisfy the shape of a request without satisfying its intent. It can change the wrong file, quietly drop an awkward condition, weaken a test or produce an output that looks finished while one acceptance criterion is still unsatisfied. “Please verify this before saying done” is useful advice, but it is still advice delivered to the same system that wants to finish.',
          'Atlas treats that as an architecture problem.',
        ],
      },
      {
        heading: 'The Goal Contract idea',
        paragraphs: [
          'Imagine a request such as: Change config.json. Do not touch README.md. Keep all tests enabled. An ordinary agent prompt contains those conditions as prose. Atlas wants them represented so proposed actions and evidence can be checked against them.',
          'The current harness includes a ContractGate for pre-action structural checks and an ImpactEvidenceGate for cases where an out-of-scope change needs an evidence-producing scan. Atlas treats task completion as something that may be mechanically checked rather than merely declared.',
        ],
      },
      {
        heading: 'What exists today',
        paragraphs: [
          'This distinction is the whole story. The repository documents ContractGate and ImpactEvidenceGate as runtime-wired. The focused harness also contains a Verifier and CompletionGate, but the project’s own review findings say those are not yet wired into the live runtime path. Verifier integration with team_runtime or an atlas-verifier reviewer is unfinished, and Goal Contract persistence is not implemented.',
          'So Atlas currently has a real enforcement slice and a larger architectural shape. It does not yet have proof that a packaged end-to-end agent cannot drift or falsely announce completion.',
        ],
      },
      {
        heading: 'What Toolglass tested',
        paragraphs: [
          'We ran the focused harness suite: 29 tests passed, with no failures. The set covers contract parsing, preserved-path blocking, normalization of path obfuscation, unknown-write fail-closed handling, verification-defeating commands, mass-deletion detection, out-of-scope evidence, verifier parsing and completion decisions tied to verification.',
          'That is meaningful evidence about the mechanics. It is not evidence that those units intercept every action in the actual agent loop. We did not run a model task, launch the Tauri frontend or exercise a packaged reviewer flow.',
        ],
      },
      {
        heading: 'Why this is worth watching',
        paragraphs: [
          'Atlas is less interesting as another coding agent than as an argument about what “done” should mean. The architecture is ahead of the product, but the distinction between wired and unwired gates is unusually clear. That clarity tells a reader exactly what the project has built, what it has tested and which parts remain an intention.',
          'The next proof points are durable Goal Contracts, actual Verifier wiring, completion enforcement in the live loop and evidence that these gates prevent useful failure modes without making ordinary work rigid or unusable. Those are future tests, not present claims.',
        ],
      },
    ],
  },
  {
    slug: 'termai',
    name: 'TermAI',
    category: 'Terminal assistants',
    headline: 'TermAI looked interesting. Windows disagreed.',
    summary:
      'A Rust terminal AI assistant with branching, local sessions and Git features caught our attention. Our Windows build never reached the prompt.',
    what: 'A terminal-native assistant whose public material describes persistent SQLite sessions, Git-style conversation branching, smart context discovery, reusable prompts, Git integration and provider paths across Claude, OpenAI and Codex via ChatGPT OAuth.',
    replaces:
      'Potentially a collection of provider CLIs and ad hoc notes around a repository conversation.',
    notReplaces:
      'A working provider session or a verified Windows runtime. We did not reach any of those behaviours.',
    audience:
      'Terminal-oriented developers interested in keeping assistant conversations close to the repository.',
    platforms: 'Windows 10 Pro, x64 test bench; runtime not reached',
    licence: 'MIT',
    version: 'Package v0.1.0; HEAD 52089b3',
    repo: 'kyco/termai',
    catch:
      'The version inspected failed its Windows source build before a binary was created. This is an environment- and snapshot-specific blocker, not a claim that TermAI can never build.',
    paragraphs: [],
    nextTest:
      'Revisit after a portability repair or a supported Windows artifact is available, then test the prompt, persistence and provider boundaries separately.',
    status: 'INSPECTED',
    evidenceStatus: 'INSPECTED / SCOUT NOTE READY',
    evidenceNote:
      'We tried to build it and never reached runtime. Interesting software does not have to pass every test to deserve coverage.',
    evidenceBoundary:
      'No credentials were created, read or used. No provider login, model session, interactive chat, persistence, branching, Git command or web tool was tested.',
    reviewedDate: '6 September 2026',
    visual: 'termai',
    receipt: [
      { label: 'Status', value: 'INSPECTED' },
      { label: 'Platform', value: 'Windows 10 Pro, x64' },
      { label: 'Build', value: 'Failed before launch' },
      { label: 'Runtime', value: 'Not tested' },
      { label: 'Model access', value: 'Not used' },
      { label: 'Build attempted', value: 'cargo build --release' },
      { label: 'Revisit', value: 'Yes' },
      { label: 'Checked', value: '06 September 2026' },
    ],
    sections: [
      {
        heading: 'Why we noticed it',
        paragraphs: [
          'TermAI is not presented as merely a way to send text to a model. Its documentation describes a terminal-native workflow around persistent SQLite sessions, Git-style conversation branching, smart context discovery, reusable prompts, Git integration and provider flexibility across Claude, OpenAI and Codex via ChatGPT OAuth.',
          'That is a coherent reason to look. The interesting question is what behaviour would make somebody choose it over a plain provider CLI or an established terminal agent.',
        ],
      },
      {
        heading: 'What happened',
        paragraphs: [
          'We inspected the source and attempted the documented source build: cargo build --release on the Windows Toolglass machine. The build failed before a binary was created.',
          'Two relevant classes of error appeared: src/git/hooks.rs imports Unix-only std::os::unix::fs::PermissionsExt and calls Permissions::set_mode, while src/auth/pkce.rs has two rand calls whose rng.gen() type cannot be inferred by the current compiler.',
          'We never reached TermAI’s chat prompt. The compiler had other plans. This is a statement about the version and environment we inspected, not a verdict that TermAI can never build.',
        ],
      },
      {
        heading: 'What we did not test',
        paragraphs: [
          'No provider credentials were created, read or used. We did not run provider authentication, model interaction, interactive chat, session persistence or branching, Git commands through the application, smart context or web tools. There is no honest runtime evidence for those documented features yet.',
        ],
      },
      {
        heading: 'Why we still want to revisit it',
        paragraphs: [
          'TermAI’s source documentation gives it a plausible workflow: a local assistant that keeps its conversations inspectable and close to the repository. But a source-built tool needs a reliable first launch on the platform where it is being evaluated.',
          'The useful report is the narrow one: the version Toolglass inspected did not build successfully on our Windows test machine. The project may simply need a portability repair and a clearer supported-platform statement. For now, this is a scout note, not a negative product review.',
        ],
      },
    ],
  },
  {
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
