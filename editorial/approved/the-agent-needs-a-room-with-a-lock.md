---
title: The Agent Needs a Room With a Lock
slug: the-agent-needs-a-room-with-a-lock
section: Features
article_type: Long-form feature
status: APPROVED
evidence_status: DESK-RESEARCHED / NO HANDS-ON MXC TEST
editor: Lucy
website_ready: true
published: 12 October 2026
---

# The Agent Needs a Room With a Lock

## For fifty years, computers have been told to give programs only the authority they need. Now the programs can decide what to do next. Microsoft Execution Containers is a timely experiment in moving permission out of the conversation and back into the machine.

**By Toolglass | editorial draft for Matthew's pass**  

The instruction was simple enough. Update the website. Fix the broken page, run the tests, leave everything else alone.

Now imagine that the software doing the job notices the quickest solution is to alter the deployment configuration, read a credential from somewhere outside the project and use it to push the fix directly. It has not necessarily become malicious. It may even be pursuing the task with impeccable enthusiasm. The trouble is that **a reasonable next step is not the same thing as an authorised next step**.

We have spent years teaching assistants to ask permission in increasingly polite ways. A dialog appears. A model explains its intention. A human approves a command, perhaps after skimming a screenful of paths. The machine then does the thing. This is useful when the person can inspect every action. It is less useful when a job runs for hours, calls other programs, spawns helpers and follows instructions it found in a document it was only supposed to read.

The old problem was how to stop a program doing something it should not. The new problem is that the program can make a surprisingly convincing case for doing it.

On 7 October 2026, Microsoft announced the general availability of **Microsoft Execution Containers**, or MXC, a policy-driven system intended to contain untrusted workloads and coding agents. The headline is easy to miss among the familiar talk of agents and productivity. The interesting principle is older and harder: **the authority of a workload must be enforced outside the workload**. The model cannot talk itself into a permission that the operating system has not granted. [Microsoft's announcement](https://blogs.windows.com/windowsdeveloper/2026/10/07/microsoft-execution-containers-policy-driven-containment-for-ai-agents/) describes the model, supported backends and modes; the [public repository](https://github.com/microsoft/mxc) supplies code, configuration and a long list of details that matter more than the headline. 

> **EDITORIAL PULL QUOTE 01**  
> The model may choose the route. It must not be allowed to redraw the map of what it owns.

## Act I / The computer has heard this argument before

In 1975, Jerome Saltzer and Michael Schroeder published *The Protection of Information in Computer Systems*. Their subject was not artificial intelligence. It was the everyday business of running multiple users and programs on expensive shared machines without allowing one to wreck another. The paper laid out principles including least privilege, fail-safe defaults and complete mediation: grant only what is needed, deny by default, and check the relevant access rather than trusting an earlier promise. It remains worth reading in the [original text](https://www.cs.virginia.edu/~evans/cs551/saltzer/).

The language sounds modern because the problem never went away.

A person logs into a computer with an identity and permissions. A program they launch normally inherits some useful portion of that power. The inheritance is convenient: a text editor can open your documents, a compiler can read your source, a browser can save a download. It is also a trap. A program whose actual task requires one folder may have access to every folder its user can read. If that program becomes confused, compromised or manipulated, the extra authority becomes available to the mistake.

Researchers tried other arrangements. Capability systems such as GNOSIS and its descendant KeyKOS explored a world where access is carried by specific unforgeable references to objects, rather than by the vague assumption that a process is entitled to everything its owner can see. The details varied, and no single research system conquered the desktop, but the intellectual move was sharp: authority is something a program is **given**, not something it acquires because it can describe a plausible reason. [Historical KeyKOS material](http://www.cap-lore.com/Agorics/Library/KeyKos/key370.html) preserves part of that line of thinking.

The 1990s brought another version of the question. Java applets were code downloaded from strangers and run on local machines. The original Java sandbox attempted to give remote code a restricted world, keeping the local file system and other sensitive resources outside it. The design became a case study in both the necessity and difficulty of confinement. [Oracle's account of the original sandbox model](https://docs.oracle.com/en/java/javase/14/security/java-se-platform-security-architecture.html) is a useful historical map.

Then came browser sandboxes, Linux namespaces, containers and application-level permissions. Flatpak's use of Bubblewrap is a good example: a program can be given a deliberately constructed view of the file system rather than the entire host. The [Flatpak sandbox documentation](https://github.com/flatpak/flatpak/wiki/Sandbox) makes clear how much practical machinery sits underneath a seemingly simple permission decision.

None of these inventions eliminated the trade-off. Restrict a program too tightly and it cannot do useful work. Grant it everything and the boundary becomes theatre. The art is to make the useful authority precise enough to be both sufficient and safe.

## Act II / What changed when software learned to improvise

Traditional software may contain bugs, but its intended control flow is usually inspectable in advance. A coding agent is different. Its job is to decide which actions might satisfy an objective, and that decision may change after each tool result. It can read a README, inspect a failing test, search the web, generate a script and run a command that was not known when the job began.

That adaptability is the selling point. It is also why prompt-level prohibitions are not a dependable access-control system. A model can be mistaken. A document can contain hostile instructions. A tool can expose more than the model understands. A child process can do work the top-level agent never described. None of these requires a theatrical evil AI. Ordinary software complexity will do.

Microsoft's MXC proposes a policy outside the agent. A developer describes a workload, its allowed files, its network access and the form of containment it needs. The system maps those requirements to an operating-system backend. On Windows, the announced choices include lightweight process containment, a separate session for desktop-capable agents, WSL-based execution and an experimental microVM. On macOS the process route uses Seatbelt; on Linux it uses Bubblewrap. The [MXC README](https://github.com/microsoft/mxc) describes SDKs for Rust, .NET and Node and a versioned request format.

Imagine the website task again. The agent may read and write the site repository. It may read a deployment configuration if the job requires understanding it. But the configuration is not writable. Personal documents and unrelated credentials are outside the granted view. The model can plan ten clever ways to complete the task; none of those plans should make an ungranted file writable.

That is the crucial separation: **acceptance is about whether the work is good; authority is about whether the action is permitted**. A successful test does not retroactively authorise a forbidden write. A human's broad intention to “fix the site” is not an all-access key.

MXC's public description also distinguishes *containment*, *identity* and *manageability*. Containment limits actions. Identity helps attribute them to an agent rather than collapsing everything into the human account. Manageability gives an organisation ways to apply and monitor policies. Some of the announced identity and enterprise-management features are described as forthcoming, so they should not be written up as already universal. The availability and strength of a boundary also depend on which backend and operating-system version is actually in use. [Microsoft's release announcement](https://blogs.windows.com/windowsdeveloper/2026/10/07/microsoft-execution-containers-policy-driven-containment-for-ai-agents/) is explicit about those distinctions.

## A permission file is not magic

Here is the danger in every security product announcement: the diagram is neat. The real computer is not.

A file path may be a symbolic link. A build process may need a package manager, which needs a cache, which needs a network host. A browser automation task may require a desktop, clipboard and login session. A program may open a file before a policy changes, or pass a handle to another process. A shell command can launch several programs, each with its own assumptions. Windows, macOS and Linux do not expose identical containment primitives.

MXC's documentation does not pretend these are one mechanism. It has different backends with different properties, and its Windows [OS-version policy support matrix](https://github.com/microsoft/mxc/blob/main/docs/backends/process-container/os-version-support.md) documents capabilities and fallbacks. The repository's own README warns that the standalone `--audit` mode **turns off sandbox security for the analysed workload** and must not be used for untrusted code. That warning deserves a larger typeface than most product launches give it.

There is also a more subtle failure mode: a policy can be syntactically valid and conceptually wrong. Granting write access to an entire home directory is still broad authority even if a container enforces it perfectly. Granting unrestricted network access may permit exfiltration of whatever the agent can read. Giving a tool the ability to invoke a powerful service can recreate the authority the local process was denied. The container is one layer, not an ethical judgement engine and not a proof that every route to a sensitive operation is closed.

The right question is not “Does it have a sandbox?” but “Which operation is denied by which mechanism, on this operating system, under this exact configuration, and how was that denial tested?”

## The three doors of policy authoring

Microsoft describes three modes for developing and applying policy. **Enforcement** blocks access outside the grants. **Learning** also blocks but records attempted access on supported Windows process containers, helping explain why a workload failed. **Permissive** records would-be denials while allowing the operation, useful for learning what a trusted workload tries to do. The last mode is not containment. A run that “worked” in permissive mode proves almost nothing about whether the intended boundary would have survived enforcement. [Microsoft's mode table](https://blogs.windows.com/windowsdeveloper/2026/10/07/microsoft-execution-containers-policy-driven-containment-for-ai-agents/) is unusually worth reading carefully.

This makes policy design an empirical craft. Start with a narrow set of permissions. Run the actual workload. Observe blocked operations. Distinguish legitimate requirements from surprising reach. Add only what is justified. Run hostile and accidental cases. Keep a record of what was granted, what was attempted and what was denied.

That resembles test-driven development more than writing a safety paragraph. The policy is a specification of authority, and the system must be tested against it.

> **EDITORIAL PULL QUOTE 02**  
> A green test tells you the code works. It does not tell you the code was entitled to do what it did.

## Act III / The old idea arrives at the right time

It would be easy to call MXC the operating system finally catching up with AI. That gives too much credit to a product and too little to fifty years of operating-systems research. The underlying lesson was already there: keep power narrow, enforce it outside the actor and make the boundaries inspectable.

What has changed is the audience. When a human drives a command line, a permission error is a familiar irritation. When an agent drives the command line for three hours, the permission boundary becomes a central part of the job's meaning. We want the agent to find better ways to achieve the goal. We do not want it to discover better ways to acquire our authority.

The difficult question is whether this becomes a standard contract across agents, shells, tools, desktops and operating systems, or another collection of partly overlapping security wrappers. A portable JSON policy is attractive, but portability cannot mean silently weakening a promise because one backend lacks a feature. A good system must either enforce the requested boundary or say it cannot.

MXC is a concrete and timely entrant, not a finished verdict from Toolglass. We have read the announcement and public documentation. We have **not** installed it, tried to escape a boundary or audited the implementation. On Windows specifically, the documented supported OS floor for the process-container SDK matters; do not assume an older Windows 11 installation supports every advertised path. The next meaningful Toolglass step would be a small, reproducible matrix of allowed reads, allowed writes, forbidden writes, network denials and child-process inheritance, with the exact OS build and backend recorded.

The best possible outcome is not that an agent becomes timid. It is that an agent becomes more useful because the person can delegate a real job without also handing over the keys to everything else.

The model may improvise. The machine should remember the lock.

### Toolbox translated

| Term | Why it matters |
|---|---|
| **Least privilege** | Give a process only the access it needs for its job, not everything its owner can access. |
| **Complete mediation** | Check relevant accesses at the enforcement boundary; do not rely on a one-time promise or a friendly instruction. |
| **Capability** | An unforgeable reference or token conferring a particular authority over an object or operation. |
| **AppContainer / Seatbelt / Bubblewrap** | Different OS-specific mechanisms used to restrict process access on Windows, macOS and Linux. Their semantics are not interchangeable. |
| **MicroVM** | A lightweight virtual machine that can provide a stronger hardware-backed boundary than some process-only approaches, at additional cost. |
| **WSL** | Windows Subsystem for Linux, a Linux environment on Windows; MXC describes a WSL-based backend for Linux-oriented workloads. |
| **Policy authoring** | The work of deciding, testing and documenting which operations are permitted, not merely writing a configuration file. |
| **Permissive mode** | A diagnostic mode that lets otherwise-denied operations proceed while recording them. Useful for learning; not a security boundary. |

### Read More

- [Microsoft, 7 October 2026: MXC announcement](https://blogs.windows.com/windowsdeveloper/2026/10/07/microsoft-execution-containers-policy-driven-containment-for-ai-agents/)
- [MXC public source, README and samples](https://github.com/microsoft/mxc)
- [MXC Windows process-container version and enforcement matrix](https://github.com/microsoft/mxc/blob/main/docs/backends/process-container/os-version-support.md)
- [Saltzer and Schroeder, 1975: *The Protection of Information in Computer Systems*](https://www.cs.virginia.edu/~evans/cs551/saltzer/)
- [Historical KeyKOS architecture paper](http://www.cap-lore.com/Agorics/Library/KeyKos/key370.html)
- [Oracle: the original Java sandbox model](https://docs.oracle.com/en/java/javase/14/security/java-se-platform-security-architecture.html)
- [Flatpak's Bubblewrap-based sandbox design](https://github.com/flatpak/flatpak/wiki/Sandbox)