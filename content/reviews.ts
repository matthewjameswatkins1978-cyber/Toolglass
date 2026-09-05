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
};
export const reviews: Review[] = [
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
