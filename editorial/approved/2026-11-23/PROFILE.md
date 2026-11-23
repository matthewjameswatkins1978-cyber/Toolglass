# Susan Graham and the Tools That Look Back

*Toolglass / People / 23 November 2026 / Review draft*

A profiler is an unusually honest kind of critic. You tell the computer what you intended to do. It tells you what your program actually spent its time doing. Sometimes the two accounts are not even on speaking terms.

The familiar Unix tool `gprof` made that disagreement visible to generations of programmers. It did not simply say that a program was slow. It could show which functions called which other functions, and where execution time accumulated. The work was done at Berkeley by Susan Graham, Paul Kessler and Marshall Kirk McKusick. In Graham's career, however, this famous tool is only one stop on a much longer journey: from understanding machine code, to understanding whole programs, to understanding how people might work with programs without fighting their tools.

The thread running through her research is not a particular language or machine. It is the idea that a computer should help us see the structure and behaviour of our own work.

## A mathematician enters the workshop

Graham studied mathematics at Harvard, then computer science at Stanford, where she completed her doctorate in 1971. Berkeley's own account places her among the university's earliest women in engineering; it describes her as the college's first woman faculty member when she joined the college in 1973. That was not a neutral professional landscape. The same Berkeley history notes that another woman did not join the college's faculty for eighteen years.

It is tempting to write this as a simple story of an individual overcoming a hostile profession. The evidence supports a more precise observation: Graham built a long, collaborative research career inside institutions where her presence was unusual. Her students and collaborators appear everywhere in the technical record. The work itself is a story about groups, tools and teaching rather than solitary genius.

Early compilers were confronted by a practical question. A high-level language can express an operation clearly, but how should the compiler choose the machine instructions that implement it efficiently? Graham's research helped develop pattern-matching approaches to code generation and methods for program analysis. This is the layer where a pleasant source-language abstraction meets a processor that knows nothing about the programmer's intentions.

At Berkeley, the Unix project offered a laboratory for such ideas. Graham and students worked on the Berkeley Pascal system. With Kessler and McKusick she developed `gprof`, a profiler combining execution information with a call graph. It gave programmers a map of the dynamic relationships between functions. A function that looked innocent on the page might be expensive because it was called millions of times; another might matter because it summoned an entire forest of work.

**PULL QUOTE 1 — Toolglass editorial line, not a quotation from Graham**

> A useful programming tool does not flatter your intentions. It shows you the machine you actually built.

## The editor as an instrument

Profiling looks backward at a running program. Graham's later research also looked forward, asking whether an editor could understand the structure of the program while someone was still writing it.

With colleagues, she investigated language-based environments such as Pan, Ensemble and Harmonia. These projects belong to a history that mainstream editor marketing often forgets. They treated software artifacts as structured documents, not just streams of characters. The ambition was to maintain syntax and semantic information incrementally, then use that knowledge to support richer editing, transformations and navigation.

The Ensemble project, active from 1989 to 1997, imagined an integrated environment for programs, documentation, specifications and performance analysis. These were not merely separate windows arranged neatly on a desktop. The researchers wanted the relationships between the artifacts to be meaningful and maintainable. If a program changed, its surrounding information should not become a forgotten museum of yesterday's assumptions.

Harmonia went further into the human side of the problem. Its research programme combined incremental program analysis with psychology of programming, interface design and high-level interactive transformations. It even investigated programming by voice, not as a novelty for dictating punctuation but as a way to express structural editing operations. The project explicitly connected this to reducing barriers for developers with repetitive strain injuries and other disabilities that make typing difficult.

This is a striking ancestor of today's conversation about AI-assisted programming. The vocabulary is different, but the underlying question is familiar: why must the human communicate with the development environment only by manipulating individual characters? Could the machine understand a higher-level intention and preserve the structural guarantees that make the edit safe?

The answer was not simply to abolish text. Text remains flexible, durable and easy to combine with ordinary tools. Structure-aware editors can be awkward, and their specialised representations can trap work inside a particular system. The interesting tension is the attempt to gain semantic assistance without losing the freedoms of an ordinary file.

## Parallel worlds

Graham's work did not stay within interactive tools. She was also part of the team behind Titanium, a Java-derived language and compiler system for scientific parallel computing. Here the central problem changed again. A program might be spread across processors, each with its own work and data. The language needed to let scientists express parallel computation while exposing enough structure for efficient compilation and reliable execution.

This was a different kind of human-computer negotiation. The programmer wanted to describe a scientific problem. The machine required a precise arrangement of communication, memory and synchronisation. A language could hide some of that complexity, but hiding everything would make performance mysterious and debugging punishing. Titanium explored where explicit parallel structure could help rather than hinder.

There is a larger pattern here. `gprof` revealed runtime relationships. Harmonia tried to make editing relationships visible and manipulable. Titanium made relationships between parallel computations a language-design concern. Graham's work repeatedly returned to the seam between what a programmer means and what a machine can demonstrate.

**PULL QUOTE 2 — Toolglass editorial line, not a quotation from Graham**

> The future of an editor may depend less on how fast it accepts text than on how well it understands a change.

## The institution behind the instrument

Graham also did the less photogenic work of helping a discipline organise itself. She was the founding editor-in-chief of *ACM Transactions on Programming Languages and Systems*, served in major research and policy roles, and mentored generations of students. Her honours include the IEEE John von Neumann Medal and the ACM/IEEE Ken Kennedy Award. Those distinctions are relevant, but they are not the centre of this story.

The more revealing fact is that a substantial part of her research lives on as ordinary expectations. A programmer expects to inspect a call graph, to navigate symbols, to receive immediate semantic feedback, to work in an editor that understands more than plain characters. Those expectations did not arrive by accident. They were built by people who treated programming tools as an intellectual field in their own right.

In 2026, software tools are again being redesigned around a new kind of collaborator: an AI model. It is easy to imagine that the history of editing began with a chat box in a code window. Graham's work is a useful corrective. Researchers were asking about structured manipulation, semantic feedback, alternative input methods and integrated artifacts decades ago. The new technology changes what is possible, but it does not erase the old questions.

A program can be compiled without being understood. It can run quickly without doing the right thing. It can be edited easily while becoming harder to maintain. Graham's career suggests that the best tools do not merely produce more code. They help us discover what the code is, how it behaves and what our changes have actually done.

The profiler's first gift was a difficult truth about execution. The larger project was to make the computer a better witness to our own thinking.

### Workbench sidebar

**gprof:** Unix call-graph profiler that relates execution costs to function calls. **Berkeley Pascal:** A Pascal compiler/system built in the Berkeley Unix research environment. **Pan:** An early language-based editing environment exploring structure-aware development. **Ensemble:** Berkeley research into integrated structured software documents and development artifacts. **Harmonia:** Language-aware interactive editing research, including program transformations and voice interaction. **Titanium:** Java-derived parallel language and compiler system for scientific computing. **Incremental analysis:** Updating a previous analysis after a change instead of starting from scratch.

### Read More

- [Berkeley Engineering's profile of Susan Graham](https://engineering.berkeley.edu/susan-graham-the-colleges-first-woman-faculty-member/)
- [Berkeley faculty biography and publications](https://www2.eecs.berkeley.edu/Faculty/Homepages/graham-s.html)
- [Harmonia research archive](https://people.eecs.berkeley.edu/~harmonia/harmonia/research/index.html)
- [The Ensemble research project](https://people.eecs.berkeley.edu/~harmonia/harmonia/ensemble.html)
- [Titanium project archive](https://titanium.cs.berkeley.edu/intro.html)
- [IEEE Computer Society profile](https://www.computer.org/profiles/susan-graham)

*Editorial provenance: both pull quotes are original Toolglass lines, explicitly **not** verbatim words spoken by Graham. Biographical details come from Berkeley and IEEE sources. No invented personal anecdotes or reconstructed dialogue.*
