---
title: When the Tool Becomes the Teacher
slug: when-the-tool-becomes-the-teacher
section: Feature
article_type: Long-form feature
status: APPROVED
evidence_status: DEVELOPMENT OBSERVATIONS; NOT A CONTROLLED COMPARISON
tested_version:
tested_platform:
tested_date: 13 October 2026
editor: Matthew Watkins
website_ready: true
---

# When the Tool Becomes the Teacher

*We keep asking how AI agents can become better at using software. Perhaps we should also be asking how software can become better at teaching agents.*

**TOOLGLASS | FEATURE | OCTOBER 2026**

---

Two AI agents were given a remarkably unremarkable instruction:

**Use Threadmoth for edits.**

No elaborate training manual. No carefully engineered twenty-paragraph system prompt. No special collection of skills explaining when to choose one operation over another.

Just the name of a program and a familiar activity.

Threadmoth is a source-editing tool designed to make controlled changes to files. It can identify targets, preview proposed modifications, enforce constraints and provide evidence of what actually changed. Its purpose is not to write software on behalf of an AI. It is to make the act of changing software more predictable.

The two agents, running in Pi with skills and extensions disabled, approached the problem differently.

Muse 1.3c was an experimenter. It tried operations, encountered refusals and gradually worked out what the tool expected. At one point it attempted to match text using Unix-style line endings against a Windows file containing CRLF line endings. Threadmoth refused the replacement rather than guessing. Muse investigated the mismatch, corrected its request and continued.

MiMo 2.6 Flash was more methodical.

It inspected Threadmoth's help, considered its providers and transaction capabilities, and then began constructing a PowerShell system to manufacture editing requests. It created temporary files, manifests, source anchors and scripts to locate exact sections of code.

Eventually, the machinery around the tool became a project of its own.

One attempt failed because two methods shared the same name. Another failed because an end marker appeared before the code the agent wanted to replace. MiMo inspected the source, repaired its helper and tried again.

Yet it continued using Threadmoth for the actual repository modifications. Six batches of edits were reported applied, and the C# solution subsequently compiled with no warnings or errors. The broader tests were still outstanding.

This wasn't a controlled scientific comparison. The agents worked on different tasks, and the first initially encountered an older Threadmoth installation. Their observations cannot establish which model is better at using tools.

But they exposed a fascinating problem.

**The agents were capable of learning the software. The software wasn't yet particularly good at teaching them.**

And that distinction may become increasingly important.

## The programmer who never read the manual

For much of computing history, software documentation has assumed a human reader.

A programmer downloads a package, studies its API, reads a tutorial, remembers some commands and gradually develops expertise. When the software changes, the programmer consults the release notes or learns the difference through experience.

This model works reasonably well because humans accumulate knowledge across years of using computers.

AI agents are different.

A deployed language model arrives with whatever capabilities and general knowledge its training has given it. It may know Rust, Python, SQL and the conventions of hundreds of command-line tools, but a program released yesterday might be entirely unfamiliar.

The model's underlying weights generally don't change when it discovers that program.

It can learn within its working context, use documentation, retain notes and adapt its immediate behaviour. But that is not the same thing as retraining the model.

Meanwhile, the tools themselves can change constantly.

A new release might introduce a safer operation, remove an obsolete argument, support another file format or change its recommended workflow.

That produces an awkward asymmetry.

**The agent's underlying knowledge may be old, while the tool's current behaviour is new.**

Our usual solution is to write more instructions for the agent.

But perhaps that has the relationship backwards.

If the software already knows its capabilities, limitations and accepted inputs, why should a separate document have to reconstruct that knowledge for every agent that encounters it?

Why can't the tool explain itself?

## An old idea wearing a new pair of shoes

This problem has surprisingly deep roots.

In 1962, Douglas Engelbart published *Augmenting Human Intellect: A Conceptual Framework*. Long before the mouse became an everyday object, Engelbart was thinking about people and their tools as parts of a larger system.

His concern wasn't merely building more powerful machines. It was improving the whole process through which an intelligent user, language, methods and technical artefacts worked together.

That distinction matters.

A useful tool doesn't have to reproduce the intelligence of its operator. It has to provide capabilities that complement that intelligence.

Unix made a different but related contribution.

The original *UNIX Programmer's Manual*, published by Ken Thompson and Dennis Ritchie in November 1971, described the facilities of the operating system as they actually existed.

By 1972, the Second Edition of Unix included `man`, a command for consulting manual entries from within the system.

This was an important shift. Information about a program no longer needed to live exclusively in a book sitting beside the terminal.

It could be encountered through the computer itself.

Later, command-line help, interactive language environments, IDEs and error diagnostics extended the principle.

Rust provides a particularly useful modern example. Its compiler assigns unique codes to many error messages, and `rustc --explain` can supply a longer explanation of what went wrong.

The compiler isn't another AI. It doesn't need to speculate about the programmer's intentions.

It knows which rule failed, and it can explain that rule.

By 1990, human-computer interaction researcher John M. Carroll was advocating *minimalist instruction*: help people begin real tasks quickly, support exploration and recovery, and avoid forcing them through large amounts of preliminary teaching material.

Jakob Nielsen later popularised the related principle of *progressive disclosure*: expose the capabilities people need now and make more specialised functionality available when required.

The thread running through these ideas is straightforward.

**People often learn software most effectively while trying to accomplish something with it.**

What happens when the person using the software is an AI agent?

## A tool does not need to be an AI

There is a temptation in contemporary software development to answer every usability problem with another language model.

A tool is difficult to use? Put an AI assistant inside it.

Its documentation is complicated? Add an AI search interface.

An agent struggles to understand an operation? Give it another agent to consult.

Sometimes those approaches are justified. But they also introduce another probabilistic system, additional expense and a new source of possible misunderstanding.

For deterministic editing tools, there is a simpler possibility.

Let the AI do the reasoning.

Let the tool do the things it can know with certainty.

Threadmoth knows which editing operations it supports. It knows which file providers are available. It knows whether a target matched, whether a path is authorised, whether a source hash is stale and whether a proposed change satisfies its declared limits.

These are not matters of opinion.

They are facts about its own operation.

So imagine an unfamiliar agent making its first successful exact replacement.

Threadmoth completes the operation, reports the result, and adds one short observation:

*If you're making several related edits, I can apply them as a guarded transaction.*

The agent has learned something new at precisely the moment it may become useful.

Now imagine an agent constructs a gigantic replacement request, manually copying hundreds of lines from an existing file.

Threadmoth accepts the request, but notices that a supported source-preparation operation could have derived the exact original text and its guards automatically.

It might respond:

*This works. For supported source regions, I can prepare the original text and guards for you.*

The tool hasn't guessed what the agent intended. It has recognised an operation it supports and presented a simpler alternative.

Or suppose an agent asks Threadmoth to determine whether a complex refactoring preserves a program's behaviour.

Threadmoth should be equally comfortable saying:

*I can help apply the change safely. I cannot establish that its behaviour is equivalent. Use your tests or language tooling for that.*

This may be the most important capability of all.

**A trustworthy tool needs to know when it is not the right tool.**

## The peculiar advantage of determinism

Language models produce responses through learned statistical computation. Their behaviour can vary with prompts, context, model configuration and generation settings.

That flexibility is what makes them useful.

They can interpret vague instructions, solve unfamiliar problems, devise plans and adapt to unexpected circumstances.

But flexibility is not always desirable inside a file mutation engine.

When the same request is evaluated against the same source bytes, version, configuration and relevant environment, we generally want the same decision.

A target either matches or it doesn't.

A path is either authorised or it isn't.

A declared change budget is either satisfied or exceeded.

Threadmoth can provide a predictable structure around those decisions.

The teaching can follow the same principle.

A known failure gets a stable error code. That error identifies a supported recovery procedure. The procedure produces a small, consistent explanation and an actionable next step.

Different agents may respond differently to the advice. One may follow it immediately. Another may inspect the documentation. A third may choose an alternative approach.

But the tool's explanation remains grounded in the same facts.

This creates a useful division of labour:

**The agent supplies judgement. The tool supplies reproducible procedure.**

Determinism does not mean every run produces identical hashes or timestamps regardless of changing files and environments. It means the rules governing the operation remain consistent when their relevant inputs remain consistent.

That predictability is valuable for both safety and learning.

An unfamiliar agent can encounter the same shape of refusal repeatedly and begin to recognise the pattern.

It no longer needs to invent a new theory of the tool every time something goes wrong.

## The research is meeting us halfway

Recent work on AI tool use is beginning to explore similar territory.

In September 2025, Anthropic published *Writing effective tools for AI agents, with agents*. Its engineers recommended building tools around actual agent behaviour, examining execution traces, measuring failures and refining interfaces rather than assuming a conventional API will be easy for a model to use.

Two research projects published in early 2026 offer further evidence of the difficulties involved.

*MCP-Atlas* introduced a benchmark involving 36 real Model Context Protocol servers, 220 tools and 1,000 tasks. It examined problems including tool discovery, parameter selection, execution and recovery.

*OpaqueToolsBench* investigated agents working with tools whose behaviour wasn't fully documented. Its accompanying ToolObserver approach improved guidance by examining feedback from previous tool interactions.

ToolObserver uses AI in its documentation-refinement process. That is an important difference from a purely deterministic teaching layer.

Nevertheless, the underlying research question is closely related:

How does an agent learn the behaviour of a tool it doesn't already understand?

Most work in this area approaches the problem from the agent's side. How can we improve exploration? How can we provide better examples? How can we train models to recover from unfamiliar APIs?

There is another direction worth investigating.

**What happens if the tool takes greater responsibility for explaining itself?**

These approaches needn't compete.

Research into how agents learn can help us discover how tools should teach.

## A little lesson at the right moment

The design challenge is not to make every program endlessly chatty.

Imagine a compiler that explained the history of type systems after every successful build.

Or a text editor that offered a miniature tutorial every time somebody pressed Save.

An agent performing thirty operations shouldn't receive thirty identical lessons about transactions.

Useful teaching requires restraint.

A practical self-teaching tool might have a small registry of guidance records. Each record would have a stable identifier, a precise triggering condition, an explanation and a supported next action.

The tool would select at most one relevant suggestion, often none at all.

A failed safety check would take priority over a productivity tip. Advanced operations would appear when the agent encountered a situation where they were useful. A client could suppress lessons it had already seen.

And the guidance would come from the same capability definitions used to validate operations.

That last requirement is important.

If the help system and the actual implementation maintain separate understandings of what the tool can do, they will eventually disagree.

The best teacher is one whose lessons are generated from the same rules it actually follows.

The same principle should extend across command-line interfaces, MCP tools and other integrations.

Different presentations, one underlying truth.

There is also a security boundary here. A tool's explanation must never silently expand its permissions, override its guards or cause an agent to mistake untrusted source content for instructions.

Teaching should explain a decision, not alter the authority behind it.

## When the agent builds a tool around your tool

The MiMo experiment revealed another subtle problem.

The agent understood Threadmoth's purpose and continued using it. On that measure, adoption looked successful.

But it also spent significant effort maintaining its own PowerShell helper.

It wrote code to identify source boundaries, build request manifests, distinguish identically named methods and handle replacements extending to the end of a file.

Some of that work was reasonable. Threadmoth's supported interfaces may not have provided the exact high-level operation the agent wanted.

But the repeated failures suggest an opportunity.

Perhaps a future editing tool should recognise when an agent is doing mechanical preparation that the tool itself could safely perform.

Instead of forcing the agent to construct an enormous request, it might provide a source-aware preparation operation.

Instead of asking the agent to reproduce exact text with the correct line endings, it could obtain those bytes from the authorised file.

Instead of requiring the agent to devise its own ambiguity resolution, it could expose the candidate regions and allow an exact selection.

The agent would still decide what code to write.

The tool would take responsibility for the mechanical details it was specifically built to handle.

This is a useful boundary: the tool should reduce unnecessary work without taking over the agent's judgement.

And it gives us something measurable.

If the agent still writes hundreds of lines of helper code to perform an operation the tool already supports, something about the interface or its teaching has failed.

## Testing the teacher

Threadmoth's next development work offers an opportunity to test the idea.

The project is moving toward more accessible guided editing, with the possibility of adding small, deterministic lessons at key interaction points.

But success cannot simply mean forcing every agent to use Threadmoth.

A quick, low-risk edit may be better handled by an ordinary editor. A compiler is better suited to type checking. A language server may be better at navigating semantic relationships.

The question is whether an agent recognises when Threadmoth's guarantees are useful and chooses it naturally.

That can be tested.

Give several agents equivalent editing tasks with the same minimal introduction. Let them retain access to ordinary editing tools. Observe what they choose, how many commands they need, where they struggle and whether they invent workarounds.

Then give them another task without repeating the instruction.

Do they remember Threadmoth within their working context?

Do they reach for it when exact targeting and verifiable changes matter?

Do they avoid it when another tool is genuinely better?

And, after the work is complete, ask them why they made those choices.

Their explanations won't necessarily reveal their true internal causes. Language models can rationalise decisions after the fact.

But behaviour, reported explanations and subsequent changes in behaviour can provide useful evidence together.

A stronger experiment would compare the same tool with its guidance enabled and disabled, using comparable tasks and fresh agent contexts.

The point is not to prove that one model obeys instructions better than another.

It is to find out whether better-designed software produces better tool choices.

## The software can change tomorrow

There is a final advantage to teaching from the tooling side.

A language model may have been trained months before a particular program was released. Its internal knowledge of that program might be nonexistent.

But the program can be updated today.

Its next release can improve its commands, diagnostics, help text and explanations. Those improvements become available to any capable agent that encounters the new interface.

No retraining of the agent is required.

This does not mean the model permanently learns the new tool. Its immediate learning may live only in its current context, while longer-term retention depends on external memory or future training.

But the tool remains capable of teaching the next unfamiliar agent.

That makes software design a more important part of AI capability than it might initially appear.

Perhaps the future of agent tooling is not a vast collection of miniature intelligences supervising each other.

Perhaps much of it will consist of carefully designed, deterministic programs that understand their own boundaries, explain their decisions and reveal useful capabilities at the right moment.

The AI does the thinking.

The tool does its job.

And when the AI encounters something new, the tool knows how to help it learn.

**A good tool doesn't need to be intelligent. It needs to make intelligence easier to use.**

---

### Further reading

- [Douglas Engelbart, *Augmenting Human Intellect: A Conceptual Framework* (1962)](https://www.dougengelbart.org/content/view/138/)
- [Ken Thompson and Dennis Ritchie, *UNIX Programmer's Manual* (1971)](https://www.nokia.com/bell-labs/about/dennis-m-ritchie/manintro.html)
- [The Unix Heritage Society, *Second Edition Unix* (1972)](https://www.tuhs.org/testwiki/systems/2nd_edition/)
- [John M. Carroll, *Overview of Minimalist Instruction* (1990)](https://research.ibm.com/publications/overview-of-minimalist-instruction)
- [Jakob Nielsen, *Progressive Disclosure* (2006)](https://www.nngroup.com/articles/progressive-disclosure/)
- [Anthropic, *Writing Effective Tools for AI Agents, with Agents* (2025)](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [*MCP-Atlas: A Large-Scale Benchmark for Tool-Use Competency with Real MCP Servers* (2026)](https://arxiv.org/abs/2602.00933)
- [*OpaqueToolsBench: Learning Nuances of Tool Behavior Through Interaction* (2026)](https://arxiv.org/abs/2602.15197)
- [Rust Compiler Development Guide, Error Codes and Explanations](https://rustc-dev-guide.rust-lang.org/diagnostics/error-codes.html)

*Editorial note: The Threadmoth agent observations described here are development experiments, not controlled benchmark results. Threadmoth's proposed self-teaching behaviours are design ideas, not claims about existing released functionality.*
