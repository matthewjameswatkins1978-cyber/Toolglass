import type { MagazineArticle } from './articles-all';

export const resolve01Article: MagazineArticle = {
  slug: 'when-ai-work-needs-a-place-to-live',
  kicker: 'ESSAY / AUTONOMOUS SYSTEMS & COORDINATION',
  title: 'When AI Work Needs a Place to Live',
  subtitle:
    'Resolve01 is a small Rust system for tracking active commitments between an agent’s plan and the action it may take.',
  summary:
    'An agent can make a plan in seconds. The harder question is what happens to that promise when a worker stalls, a lease expires, or the outside world gives an uncertain answer. Resolve01 is building the durable coordination layer for that middle ground.',
  byline: 'Matthew Watkins, with Lucy (ChatGPT)',
  publishedDate: '4 October 2026',
  readingTime: '7 min read',
  thesis:
    'Resolve01 coordinates live commitments: what work is active, who owns it, what it depends on, and what outcome has been recorded. It deliberately leaves long-term memory to Lantern Keeper and permission and execution to Tethers.',
  notes: [
    ['Type', 'Project essay'],
    ['Published', '4 October 2026'],
    ['Byline', 'Matthew Watkins, with Lucy (ChatGPT)'],
    ['Reading time', '7 min read'],
    ['Canonical repository', 'github.com/matthewjameswatkins1978-cyber/Resolve01'],
    ['Current main', '29412cbe3e9ede18908f5ac676bb64fcfa887129'],
    ['Local checkout', 'D:\\Projects\\Resolve AI\\Resolve01 — older branch; GitHub main is current'],
    ['Readiness', 'Core and transport slices merged; not production-ready'],
  ],
  intro: [
    'An AI agent can make a plan in seconds. It can inspect a repository, split a job into steps and tell you what it intends to do next.',
    'Then the worker crashes.',
    'Which parts of the plan still count? Has another worker taken over? Is the first one merely slow, or has its right to act expired? Did an external action succeed just before the network vanished?',
    'Those questions are not about how clever the agent is. They are about whether a system can keep an honest account of work after the conversation moves on.',
    'Resolve01 is Matthew Watkins’ attempt to build that missing middle: a durable place for live commitments, between the moment work is proposed and the moment an authorised action produces an outcome.',
  ],
  sections: [
    {
      heading: 'A promise needs an owner',
      paragraphs: [
        'A task list can say “publish the report”. An orchestration service can say that a process is running. Neither statement is enough when several workers, dependencies and restarts are involved.',
        'Resolve needs to know what has actually been committed, who currently holds it, what must happen first, whether that ownership is still valid, and what result has been recorded. A commitment is more than a row of text with a status badge. It has an identity, a lifecycle, dependencies and rules about which worker may change it.',
        'That distinction matters most during failure. If an agent disappears halfway through a job, blindly handing the same work to another agent can duplicate an email, payment, deployment or publication. Resolve gives the work a durable identity so a replacement can inspect its state before deciding what can safely happen next.',
      ],
    },
    {
      heading: 'The fence that stops yesterday’s worker',
      paragraphs: [
        'Imagine worker A claims a piece of work and then stalls. Its lease expires. Worker B takes over. If A wakes up later, it must not be able to act as though nothing changed.',
        'Resolve uses fencing epochs to make that handover explicit. Worker A might have held epoch 4; the new claim advances to epoch 5. A write or guard admission carrying the old epoch is stale and must fail. The lease says who may currently coordinate the commitment. The fence lets the store reject an old owner even if that process wakes up and still believes it is in charge.',
        'ExecutionGuard adds a second boundary around consequential work. Resolve can reserve a scope and record which action is prepared for admission. It cannot turn that record into permission. That final authority belongs elsewhere.',
      ],
      pullQuote:
        'If A wakes up later, it must not be able to act as though nothing changed.',
    },
    {
      heading: 'Lantern knows. Resolve coordinates. Tethers controls.',
      paragraphs: [
        'The three projects answer different questions. Lantern Keeper owns historical evidence, memory and provenance: what do we know about what happened? Resolve owns live commitments, claims, dependencies, waiting and recovery: what are we currently committed to doing, and who owns the next step? Tethers owns authority and consequential execution: is this action allowed, and what did the provider actually do?',
        'That is a documented division of responsibility, not a working Lantern link: Resolve has no Lantern integration in the repository yet.',
        'Keeping those answers separate stops one component from quietly becoming memory system, task manager, permission engine and executor all at once. Resolve may pass a narrow guard request to Tethers and record the resulting outcome. It does not inspect Tethers policy or carry out the provider action itself.',
        'The current guard protocol makes that boundary concrete. It passes opaque identifiers, an exact set of scope keys and a preparation digest. Resolve checks the identity it was given; it does not interpret provider arguments or decide what policy means. A matching digest ties the eventual outcome to the same prepared action that was admitted.',
      ],
      pullQuote: 'Lantern knows. Resolve coordinates. Tethers controls.',
    },
    {
      heading: 'What the repository proves today',
      paragraphs: [
        'Resolve began with R0: a Rust domain model and a local SQLite store using write-ahead logging. That first stage established the commitment lifecycle, claims and fencing, scope reservations, guard admission, recovery, outcomes and a deliberately closed boundary for structural proposals. Its invariant and adversarial test work is recorded in the repository. The important limit is just as clear: R0 is one local SQLite authority, not a distributed service.',
        'On the project’s roadmap, R0 is the completed local, single-authority foundation. R1 has delivered the typed service boundary and Tethers HTTPS integration slices through PRs #19 and #21, but wider R1 acceptance work is not complete. These changes bind a Tethers preparation digest at admission and check it again when the outcome arrives. The transport accepts only two narrow operations, uses an explicit bridge key, rejects duplicate JSON keys and unexpected fields, caps request bodies, and checks digests over the complete request.',
        'The latest public main commit is 29412cbe3e9ede18908f5ac676bb64fcfa887129, merged on 3 October 2026. Its GitHub Actions CI run is green. That is evidence for the repository’s current checks; it is not a claim that Resolve has been deployed as a production service.',
      ],
    },
    {
      heading: 'Where the files live—and which path is current',
      paragraphs: [
        'The public repository is matthewjameswatkins1978-cyber/Resolve01. Its core is intentionally split into three Rust crates: resolve-core contains the domain and coordination model; resolve-store owns the SQLite persistence boundary and typed service; resolve-transport contains the narrow HTTPS bridge. The docs folder records the state machine, persistence rules, Tethers protocol and ownership boundaries.',
        'A Windows checkout currently exists at D:\\Projects\\Resolve AI\\Resolve01, but it is on an older September branch rather than current main. For this article, GitHub main at the commit above is the source of truth. Earlier notes record a WSL checkout at /home/matmus/mino2codex; that is historical, not a confirmed current path. The similarly named C:\\dev\\resolve-ai directory belongs to the older resolve-ai project and is not Resolve01.',
      ],
    },
    {
      heading: 'The next work is about trust at the edges',
      paragraphs: [
        'Resolve is not production-ready. The HTTPS bridge is a narrow integration seam, not a scheduler, retry engine, reconciliation service, operator console or distributed database. Its arrival makes the next questions sharper: how should a host run and monitor the bridge, what evidence should flow back to Lantern, and how should the system help a human resolve work whose external outcome is uncertain?',
        'Resolve already represents UNCERTAIN outcomes and protects held scopes around them. What it does not provide is an automatic reconciliation engine that can safely decide whether an external side effect happened and whether a retry is harmless. That gap matters: a timeout after a successful payment is not the same thing as a failed payment.',
        'The sensible direction is to complete those operational boundaries one at a time, with Tethers remaining the authority for permission and execution and Lantern remaining the owner of history. Multi-machine coordination can wait until a real use case requires it. There is no prize for adding distributed consensus before the single-authority contract has a real operator.',
        'The goal is smaller and more useful than “an AI that manages everything”. When a worker stalls, authority changes or the outside world behaves badly, Resolve should still be able to answer one plain question: what have we actually committed ourselves to doing?',
      ],
      pullQuote: 'That gap matters: a timeout after a successful payment is not the same thing as a failed payment.',
    },
  ],
  sources: [
    { label: 'Resolve01 repository', href: 'https://github.com/matthewjameswatkins1978-cyber/Resolve01' },
    { label: 'Current main commit — merged 3 October 2026', href: 'https://github.com/matthewjameswatkins1978-cyber/Resolve01/commit/29412cbe3e9ede18908f5ac676bb64fcfa887129' },
    { label: 'PR #19 — typed in-process service boundary', href: 'https://github.com/matthewjameswatkins1978-cyber/Resolve01/pull/19' },
    { label: 'PR #21 — Tethers HTTPS transport', href: 'https://github.com/matthewjameswatkins1978-cyber/Resolve01/pull/21' },
    { label: 'Resolve Service and Tethers Transport Boundaries', href: 'https://github.com/matthewjameswatkins1978-cyber/Resolve01/blob/29412cbe3e9ede18908f5ac676bb64fcfa887129/docs/SERVICE_BOUNDARY.md' },
    { label: 'Tethers Guard Protocol v1', href: 'https://github.com/matthewjameswatkins1978-cyber/Resolve01/blob/29412cbe3e9ede18908f5ac676bb64fcfa887129/docs/TETHERS_GUARD_PROTOCOL.md' },
    { label: 'R0 invariants and implementation boundary', href: 'https://github.com/matthewjameswatkins1978-cyber/Resolve01/blob/29412cbe3e9ede18908f5ac676bb64fcfa887129/docs/R0_INVARIANTS.md' },
    { label: 'CI for current main', href: 'https://github.com/matthewjameswatkins1978-cyber/Resolve01/actions/runs/37153458168' },
  ],
};