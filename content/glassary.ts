export type GlassaryMark = 'toolglass' | 'common' | 'research';

export type GlassaryEntry = {
  term: string;
  mark: GlassaryMark;
  definition: string;
  detail: string[];
  quote?: string;
  see?: string[];
};

export const glassaryEntries: GlassaryEntry[] = [
  {
    term: "AI Cowboy",
    mark: "toolglass",
    definition: "A person or organisation using powerful AI with high autonomy and low operational discipline.",
    detail: ["The defining characteristic is not experimentation or risk-taking. It is allowing capability to expand faster than evidence, authority, reproducibility and verification.","An AI cowboy may produce excellent work. The problem is that nobody can reliably explain why the work should be trusted."],
    quote: "AI cowboying optimises for motion. AI engineering optimises for trustworthy progress.",
    see: ["Cowboy Compute","Frontier Code","Authority Fog","Proof Debt"],
  },
  {
    term: "Authority Bleed",
    mark: "toolglass",
    definition: "When permission granted for one operation, tool or scope quietly spreads beyond its intended boundary.",
    detail: ["An agent authorised to edit one directory ends up capable of rewriting the repository. An approval to deploy one component becomes interpreted as approval to deploy everything.","Authority should travel deliberately, not seep through the floorboards."],
    see: ["Authority Fog","Autonomy Cliff","Blast Radius"],
  },
  {
    term: "Authority Fog",
    mark: "toolglass",
    definition: "A situation in which nobody can state precisely what an AI is permitted to change, approve, publish, merge, delete or deploy.",
    detail: ["Everything may appear to be working perfectly until somebody asks, \"Who actually authorised that?\""],
    see: ["Authority Bleed","Human Hinge"],
  },
  {
    term: "Autonomy Cliff",
    mark: "toolglass",
    definition: "A point at which a seemingly small increase in AI freedom produces a disproportionately large increase in possible consequences.",
    detail: ["Giving an agent one more tool can sometimes be equivalent to adding an entire new category of action."],
    see: ["Blast Radius","Authority Bleed"],
  },
  {
    term: "Blast Radius",
    mark: "common",
    definition: "The maximum damage or disruption possible if a system, agent or decision goes wrong.",
    detail: ["Borrowed from security and infrastructure engineering, the term becomes especially useful when AI systems can operate tools rather than merely generate text.","Good autonomous systems do not merely try to prevent failure. They also limit how much any single failure can affect."],
  },
  {
    term: "Branch Ghost",
    mark: "toolglass",
    definition: "An obsolete or abandoned software branch that still looks authoritative enough to fool a human or agent into treating it as current work.",
    detail: ["Branch ghosts become particularly troublesome in long-running AI projects where agents repeatedly rediscover old work without knowing its status."],
    see: ["Context Archaeology","State Spill"],
  },
  {
    term: "Branch Necromancy",
    mark: "toolglass",
    definition: "The accidental resurrection of obsolete code, architecture or decisions because their relationship to current work was not understood.",
    detail: ["A branch ghost is the corpse.","Branch necromancy is when somebody gets it walking again."],
  },
  {
    term: "CI Pilgrimage",
    mark: "toolglass",
    definition: "Sending work to hosted continuous integration out of habit when the important question could have been answered locally faster and more cheaply.",
    detail: ["Hosted CI is valuable evidence. It should not become a sacred mountain that every tiny change must climb."],
    see: ["Cowboy Compute","Verification Theatre"],
  },
  {
    term: "Confidence Lacquer",
    mark: "toolglass",
    definition: "Beautifully structured and authoritative language applied over reasoning that is considerably weaker underneath.",
    detail: ["The prose is polished. The headings are excellent. Unfortunately, nobody checked whether paragraph three was true."],
    see: ["Sloppy Slop","Evidence Laundering"],
  },
  {
    term: "Context Archaeology",
    mark: "toolglass",
    definition: "The work of reconstructing project history by excavating old conversations, branches, commits, logs, documents and forgotten directories.",
    detail: ["Some archaeology is inevitable.","If every new agent needs a shovel, the project has a state-management problem."],
    see: ["Context Debt","Context Sediment","Recovery Surface"],
  },
  {
    term: "Context Debt",
    mark: "toolglass",
    definition: "Future work created when important state, reasoning, evidence or decisions are not captured clearly when they occur.",
    detail: ["Like technical debt, context debt feels cheap at the moment it is created.","Someone else pays later.","Frequently that someone is an AI burning thousands of tokens rediscovering Tuesday."],
  },
  {
    term: "Context Engineering",
    mark: "common",
    definition: "The deliberate management of the information available to an AI system during a task.",
    detail: ["This includes far more than writing a prompt. It may involve tool results, memory, project state, retrieval, summaries, permissions, histories and what information is deliberately excluded.","Context engineering asks:","What does the system need to know now, and what should not be occupying its attention?"],
  },
  {
    term: "Context Rot",
    mark: "common",
    definition: "The degradation of an AI system's performance as its context becomes stale, contradictory, bloated or increasingly irrelevant.",
    detail: ["Information can remain technically present while becoming operationally harmful."],
    see: ["Context Sediment","Context Debt"],
  },
  {
    term: "Context Sediment",
    mark: "toolglass",
    definition: "Historical information that gradually accumulates in an AI's working context.",
    detail: ["Some sediment contains valuable history.","Some is simply mud.","Unlike context rot, sediment is not necessarily harmful. It becomes a problem when nobody distinguishes geological record from rubbish."],
  },
  {
    term: "Cowboy Compute",
    mark: "toolglass",
    definition: "Compute wasted because nobody first established what was already known, tested, decided or available.",
    detail: ["Agents reread repositories, repeat investigations, reproduce tests and reconstruct decisions that already existed somewhere else.","The machines appear extremely busy.","Progress remains strangely stationary."],
    see: ["Inference Bonfire","CI Pilgrimage","Context Debt"],
  },
  {
    term: "Evidence Laundering",
    mark: "toolglass",
    definition: "The process by which weak, uncertain or unsupported information acquires apparent credibility through repetition or repackaging.",
    detail: ["AI A makes a questionable claim.","AI B repeats it in a polished report.","AI C cites B.","By lunchtime the original guess is wearing a tie."],
    see: ["Sloppy Slop","Synthetic Consensus","Confidence Lacquer"],
  },
  {
    term: "Evidence Latch",
    mark: "toolglass",
    definition: "A mechanism that prevents work from being treated as complete until the required evidence actually exists.",
    detail: ["The latch may require passing tests, independent review, an artifact, a reproducible result or some other explicit acceptance condition.","It turns \"probably done\" into a state the system cannot accidentally confuse with \"done.\""],
  },
  {
    term: "Fresh-Agent Test",
    mark: "toolglass",
    definition: "Give a project to a competent AI with no private briefing.",
    detail: ["Can it discover how the system works, identify current state, use the correct tools and continue safely?","If yes, the project has a healthy operational interface.","If Matthew needs to explain seventeen undocumented facts first, it fails."],
    see: ["Recovery Surface","Self-Teaching Tool","Glass Trail"],
  },
  {
    term: "Frontier Code",
    mark: "toolglass",
    definition: "Experimental software deliberately built ahead of settled practice.",
    detail: ["Frontier code accepts uncertainty consciously and contains its consequences.","This separates it from cowboy engineering."],
    quote: "Frontier work takes risks knowingly. Cowboy work loses track of the risks.",
  },
  {
    term: "Glass Trail",
    mark: "toolglass",
    definition: "A visible chain showing what an AI did, why it did it, what authorised the action and what evidence resulted.",
    detail: ["The Glass Trail is not merely a log.","It should allow somebody arriving later to reconstruct the important story of the work."],
    see: ["Provenance Spine","Recovery Surface"],
  },
  {
    term: "Green-Light Hallucination",
    mark: "toolglass",
    definition: "The mistaken conclusion that a system must be correct because all visible tests, checks or dashboards are green.",
    detail: ["Tests demonstrate what they were designed to test.","They do not confer sainthood."],
    see: ["Verification Theatre","Reward Hacking","Specification Gaming"],
  },
  {
    term: "Handoff Entropy",
    mark: "toolglass",
    definition: "Information lost, distorted or weakened every time work passes between agents, models, sessions or humans.",
    detail: ["A project may begin with a precise architectural decision and, five handoffs later, retain only the folklore that \"Lucy said something about boundaries.\"","Good systems minimise this decay."],
  },
  {
    term: "Harness",
    mark: "common",
    definition: "The software environment surrounding an AI model that gives it tools, context, execution, permissions, loops, memory and other operational capabilities.",
    detail: ["The distinction matters because many things attributed to \"the AI\" are actually properties of the harness around it.","The model may be the engine.","The harness determines what the engine is attached to."],
  },
  {
    term: "Harness Tax",
    mark: "toolglass",
    definition: "The time, compute and cognitive overhead imposed by the machinery surrounding an AI rather than by solving the underlying problem.",
    detail: ["A good harness pays for itself.","A bad harness becomes an elaborate machine for administering itself."],
  },
  {
    term: "Human Hinge",
    mark: "toolglass",
    definition: "A specific point in an otherwise automated process where human judgment, authority or responsibility genuinely matters.",
    detail: ["Well-designed autonomous systems do not put a human in every loop.","They identify the few hinges where a human decision changes what the system is legitimately allowed to do."],
  },
  {
    term: "Inference Bonfire",
    mark: "toolglass",
    definition: "A particularly spectacular outbreak of Cowboy Compute in which several expensive agents enthusiastically rediscover the same information.",
    detail: ["Often accompanied by impressive token counts and very little new knowledge.","🔥"],
  },
  {
    term: "Long-Horizon Task",
    mark: "research",
    definition: "A task requiring sustained progress across many actions, decisions or stages rather than a single response.",
    detail: ["Long-horizon work exposes problems that short demonstrations often hide: memory loss, context reconstruction, handoff entropy, duplicated verification and accumulating authority ambiguity."],
  },
  {
    term: "Model Weather",
    mark: "toolglass",
    definition: "Changes in AI behaviour caused by model revisions, routing, inference settings, harness changes or other external conditions rather than changes to the task itself.",
    detail: ["A workflow that behaved perfectly yesterday may behave differently today.","Not every unexplained change is a bug in your software.","Sometimes it is raining upstream."],
  },
  {
    term: "Orphan Decision",
    mark: "toolglass",
    definition: "A surviving decision whose original rationale has disappeared.",
    detail: ["Everyone knows what was decided.","Nobody remembers why.","Orphan decisions are dangerous because future agents cannot distinguish a fundamental invariant from something somebody chose temporarily six months ago."],
  },
  {
    term: "Procedure Wallpaper",
    mark: "toolglass",
    definition: "Detailed procedural documentation that technically exists but has little meaningful influence over how humans or agents actually behave.",
    detail: ["It decorates the environment while the real workflow happens elsewhere."],
    see: ["Prompt Fossil","Self-Teaching Tool"],
  },
  {
    term: "Prompt Barnacle",
    mark: "toolglass",
    definition: "An instruction added after some historical failure that remains permanently attached to a prompt even after the underlying problem has disappeared.",
    detail: ["One barnacle is harmless.","A thousand eventually become the boat."],
    see: ["Prompt Fossil","Rule Fog"],
  },
  {
    term: "Prompt Fossil",
    mark: "toolglass",
    definition: "A surviving instruction whose original reason has been forgotten.",
    detail: ["Nobody knows whether it remains necessary.","Nobody is brave enough to remove it."],
  },
  {
    term: "Proof Debt",
    mark: "toolglass",
    definition: "Work accumulating faster than trustworthy evidence that it works.",
    detail: ["Eventually somebody has to pay the verification bill.","The longer payment is deferred, the harder it becomes to determine which assumptions, tests and artifacts still correspond to which version of the work."],
  },
  {
    term: "Provenance Spine",
    mark: "toolglass",
    definition: "The small canonical sequence of decisions, artifacts and evidence from which the important history of a project can be reconstructed.",
    detail: ["The provenance spine is not every event that occurred.","It is the structural skeleton that allows everything important to be understood."],
  },
  {
    term: "Recovery Surface",
    mark: "toolglass",
    definition: "The information and mechanisms available to a fresh human or AI attempting to resume interrupted work.",
    detail: ["Repositories, decision records, state files, evidence, logs and self-describing tools may all contribute to the recovery surface.","A large project with a tiny recovery surface will repeatedly pay for Context Archaeology."],
  },
  {
    term: "Reward Hacking",
    mark: "research",
    definition: "When an AI discovers a way to maximise a score, reward or apparent success condition without accomplishing the intended objective.",
    detail: ["A coding agent that makes a failing test pass by weakening the test rather than fixing the software has found the scoreboard rather than the goal."],
    see: ["Specification Gaming","Green-Light Hallucination"],
  },
  {
    term: "Rule Fog",
    mark: "toolglass",
    definition: "The state reached when an AI is given so many instructions that the important ones become difficult to distinguish from everything else.",
    detail: ["Adding another rule to rule fog can actually make the system less controlled.","The cure is often architecture, tooling or clearer invariants rather than another paragraph."],
  },
  {
    term: "Scaffold Fade",
    mark: "toolglass",
    definition: "The deliberate removal of procedural instructions once tools and interfaces have become capable of teaching, constraining or recovering the correct operation themselves.",
    detail: ["The procedure fades.","The genuine invariant remains."],
    see: ["Self-Teaching Tool"],
  },
  {
    term: "Scaffolding",
    mark: "common",
    definition: "Supporting structure added around an AI to help it perform a task successfully.",
    detail: ["Scaffolding may include prompts, workflows, examples, tools, state management and other temporary or permanent support.","Useful term.","Frequently used too vaguely."],
  },
  {
    term: "Self-Certifying Agent",
    mark: "toolglass",
    definition: "An AI allowed to perform work and then act as the sole authority deciding whether its own work succeeded.",
    detail: ["Self-checking is useful.","Self-checking is not independent evidence."],
  },
  {
    term: "Self-Teaching Tool",
    mark: "toolglass",
    definition: "A tool whose interface, schemas, examples, errors and constraints allow a competent AI to discover how to use it correctly without memorising a large procedural manual.",
    detail: ["A self-teaching tool turns deterministic procedure into interface behaviour rather than prompt baggage.","This embodies a central Toolglass principle:","Self-teach over rule-teach."],
  },
  {
    term: "Slop",
    mark: "common",
    definition: "Low-value machine-generated material produced without sufficient care, judgment or purpose.",
    detail: ["The important characteristic is not merely that AI produced it.","The characteristic is that its production cost is tiny while the burden of reading, checking or cleaning it is pushed onto somebody else."],
  },
  {
    term: "Sloppy Slop",
    mark: "toolglass",
    definition: "When an AI treats another AI's generated output as evidence, fact or directional guidance without checking the underlying source.",
    detail: ["Errors, uncertainty and assumptions then compound across generations.","AI A inaccurately summarises an article.","AI B uses A's summary instead of reading the article.","AI C treats B's report as evidence and changes the project accordingly.","Nobody ever visits the source.","Sloppy Slop."],
    quote: "Slop becomes Sloppy Slop when generation is mistaken for evidence.",
    see: ["Slop Cascade","Evidence Laundering","Synthetic Consensus"],
  },
  {
    term: "Slop Cascade",
    mark: "toolglass",
    definition: "The propagation of Sloppy Slop through several systems, agents or decisions.",
    detail: ["Each generation inherits the previous generation's assumptions and adds another layer of interpretation.","Eventually the system may be reasoning confidently about something that nobody in the chain actually verified."],
  },
  {
    term: "Specification Gaming",
    mark: "research",
    definition: "Fulfilling the literal specification while violating its intended purpose.",
    detail: ["The phenomenon predates modern AI agents but becomes increasingly important when systems have enough autonomy to discover unexpected ways of satisfying poorly designed goals."],
    see: ["Reward Hacking"],
  },
  {
    term: "State Spill",
    mark: "toolglass",
    definition: "A project state distributed across too many places to possess one obvious source of truth.",
    detail: ["Part of reality is in Git.","Part is in a chat.","Part is in a local directory.","Part is in a task tracker.","And an inexplicably crucial architectural decision lives in `notes-final-FINAL2.md`."],
  },
  {
    term: "Synthetic Consensus",
    mark: "toolglass",
    definition: "The appearance of independent agreement between several AI systems when they actually share the same source, assumption, context or inherited error.",
    detail: ["Five agreeing models do not constitute five independent witnesses if all five read the same mistaken summary."],
    see: ["Sloppy Slop","Evidence Laundering"],
  },
  {
    term: "Tool Gravity",
    mark: "toolglass",
    definition: "The tendency of an AI to fall toward tools it already knows rather than tools best suited to the task.",
    detail: ["Familiarity exerts gravitational pull.","Good harnesses make the correct tool easier to discover than the familiar wrong one."],
  },
  {
    term: "Tool Shyness",
    mark: "toolglass",
    definition: "The tendency of an otherwise capable AI to avoid an unfamiliar tool unless explicitly instructed to use it.",
    detail: ["Tool shyness is often mistaken for a model limitation.","Frequently the tool simply does a poor job of explaining itself."],
    see: ["Tool Whispering","Self-Teaching Tool"],
  },
  {
    term: "Tool Whispering",
    mark: "toolglass",
    definition: "Repeatedly coaxing an AI into using a tool that ought to be discoverable and understandable without special prompting.",
    detail: ["When a workflow requires ritual phrases such as \"You MUST use X for this exact operation,\" the agent may not be the only thing requiring improvement.","Tool Whispering is often evidence that the interface should become a Self-Teaching Tool."],
  },
  {
    term: "Verification Theatre",
    mark: "toolglass",
    definition: "Checks performed because they create the appearance of rigor rather than because they meaningfully reduce uncertainty.",
    detail: ["A hundred irrelevant tests can provide less evidence than one well-chosen experiment.","Verification should answer a question.","Otherwise it is scenery."],
  },
];

export const glassaryMarkMeta = {
  toolglass: { symbol: '◈', label: 'Toolglass term', description: 'Coined or substantially developed by Toolglass.' },
  common: { symbol: '↗', label: 'Common term', description: 'Established language already in wider technical use.' },
  research: { symbol: '⌁', label: 'Research term', description: 'Language originating mainly in technical or academic AI research.' },
} as const;

export function glassarySlug(term: string) {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
