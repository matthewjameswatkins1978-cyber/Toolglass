# The Program Has Two Faces

*Toolglass / Feature / 23 November 2026 / Review draft*

For most of computing's history, source code has been a compromise. It must be precise enough for a machine to execute and legible enough for a person to write, read and repair. We have become so accustomed to that compromise that we sometimes mistake it for a law of nature.

It isn't. The computer does not read the file in quite the way we do. A compiler takes the text apart, discovers its grammatical structure, checks relationships, and constructs a more exact internal representation. The familiar lines and braces are a doorway into the program, not necessarily the program's most useful form.

Now there is a second kind of author at the door. A language model does not need the same visual cues as a person; it consumes tokens, patterns and constraints. Meanwhile the human reviewing its work needs more explanation, not less. A single notation is being pulled in opposite directions.

The experimental language [Tacit](https://github.com/weetster/tacit) makes that tension explicit. Its repository describes an abstract syntax tree as the source of truth, with a compact authoring view and a lossless inspection view. The project is early and its efficiency claims need independent measurement. But the question it raises is worth a magazine feature even if Tacit itself never becomes a widely used language: **what happens when the text file stops being the sovereign object of programming?**

## The file that pretended to be the program

A programmer can point to a function in a source file and say, reasonably, 'there is my program.' Yet much of what matters is absent from the visible page. A name resolves to a particular declaration. An operation has a type. A call has effects. A variable has a lifetime. A compiler can discover some of these facts, reject others and lower the remainder into instructions that look nothing like the original prose.

We already live with multiple representations. Debuggers show stacks and values; IDEs show symbols and references; compilers produce intermediate representations; profilers display flame graphs. The source file has remained the official record because it is portable, editable, diffable and pleasantly ordinary. It survives tools, vendors and decades. That is a tremendous advantage, not an embarrassing relic.

But it has a peculiar weakness. A textual edit can be tiny while its semantic consequences are enormous. Rename a variable in the wrong scope; change the precedence of an expression; move a function across a module boundary. A diff can show every character and still fail to explain the actual change. Conversely, a refactoring can alter hundreds of lines while preserving the program's behaviour.

The dream of a structure-aware editor is therefore old. In the 1970s and 1980s, syntax-directed editors tried to let programmers manipulate grammatical objects rather than arbitrary characters. The Cornell Program Synthesizer is a famous example. Later came the work on intentional programming and projectional editors, including JetBrains MPS. A projection is a view onto a structured program: one underlying object might be shown as text, a table, a mathematical expression or a diagram.

These systems discovered a stubborn human fact. People like to type. Text is fast, flexible, composable and easy to exchange. A structured editor can feel like a clerk demanding that every thought arrive on the correct form. Some systems also create problems for ordinary diffs, version control and unfamiliar tools. The historical lesson is not that structured programming environments were wrong, but that a superior representation can lose to a superior workflow.

## The new author does not type

A model changes the balance. It can generate a constrained sequence of tokens, choose among grammar-valid continuations, or emit a structured object directly. It can also produce confident-looking nonsense. A machine-oriented representation could reduce syntactic ambiguity, but it would not magically solve semantic correctness, security or design intent.

Tacit's premise is to separate the dense representation used for authoring from the expanded representation used for inspection while keeping both lossless. That last property is decisive. A human-readable explanation that omits a branch, an effect or a conversion is not a faithful view of the program. A model-friendly compression that cannot be reconstructed exactly is not a safe source format. The two views must point to one canonical structure, not two approximations that slowly drift apart.

Imagine a simple operation: read a file, parse its contents, update a database and report success. The compact form might be economical for generation. The inspection form could expose four obligations: which file may be read, what happens on malformed input, whether the database write is atomic, and which failure paths return success. The extra detail is not decoration. It is where review begins.

But there is a trap. A tool can print 'safe' in a beautifully formatted inspector without having proved safety. A typed AST records what the compiler knows, not everything a program will do in the world. External calls, concurrency, hardware and human requirements still escape the diagram. A trustworthy inspection view must show uncertainty and missing evidence as carefully as established facts.

## A language is also a social agreement

The most interesting comparison is not between a new syntax and Python or Rust. It is between *who is authorised to say what the program means*. In conventional practice, source code is the common legal document. A compiler interprets it; a reviewer reads it; tests exercise it. When the AST becomes canonical, the editor, serializer and migration machinery become more central. A bug in a projection can mislead the human without changing the executable program. A bug in the serializer can corrupt the canonical record itself.

This introduces difficult but answerable engineering questions. Can the representation be stored in ordinary Git without opaque binary blobs? Can two branches merge independent changes without silently changing meaning? Are comments, layout and names preserved? Can a human recover the program with a simple text tool when the specialised editor disappears? Can an auditor compare a generated view against the exact compiler input, by hash and by structural identity?

Those questions are less glamorous than 'AI-native language', but they determine whether the idea is a tool or a dependency trap.

There is a related movement in literate programming. Donald Knuth's WEB separated the order in which a program was explained from the order in which a compiler consumed it. The programmer could write for human understanding while a tool rearranged the code for execution. Tacit's proposal is different, but it belongs in that family of attempts to escape the tyranny of one presentation. The old literate systems began with the human reader. The new proposals begin with a second, machine author and ask how to keep the human in charge of meaning.

## The test that matters

The decisive demonstration would be modest. Take a corpus of small programs, including deliberately awkward errors. Convert each into the canonical structure, display both views, edit in each direction and reconstruct the exact program. Check that hashes, types, effects, diagnostics and source locations remain consistent. Then ask people to review actual bugs. Do they find more of them? Do they understand the changes faster? Does the compact representation really reduce model tokens when error-repair turns are included?

Until those tests are done, 'more efficient for AI' is a design hypothesis. The project's reported compiler capabilities establish that there is a working experiment to investigate, not that the central human-computer bargain has been improved.

A final complication is historical. Languages outlive their original tooling. Some of the most useful programs are written in systems nobody would choose for a new project. If canonical structure requires a fragile ecosystem to interpret, the code may become unreadable sooner than plain text would. A language designed for tomorrow's agents must also be readable by tomorrow's archivist.

## Two readers, one truth

There is something appealingly modest beneath the grand claim of an AI-first language. We need not force every participant in software development to stare at the same representation. A model might benefit from a constrained, compact form. A reviewer might need a rich account of contracts and consequences. A compiler needs a precise internal structure. A historian may need a durable text export. None should be permitted to invent a different program.

Perhaps the future is not one new language but a stronger agreement between representations: exact round trips, visible provenance, explicit uncertainty, reproducible compilation and human-friendly views that never pretend to be proof.

The file has served us extraordinarily well. The next step is not to throw it away. It is to ask whether the program can have more than one face without acquiring more than one truth.

### The side corridor

**AST:** Abstract syntax tree, the compiler's structured account of a program's grammar. **Projectional editing:** Changing a structured program through one of several presentations rather than editing only raw text. **Intermediate representation:** A compiler's internal form used for analysis or optimisation. **Literate programming:** Writing code and explanation in an order suited to readers, then mechanically producing executable source. **Lossless round trip:** A conversion that can recover the original canonical structure exactly, including details that affect meaning.

### Primary reading and verification

- [Tacit source and design claims](https://github.com/weetster/tacit)
- [JetBrains MPS, projectional language workbench](https://www.jetbrains.com/mps/)
- [Donald Knuth's literate programming archive](https://www-cs-faculty.stanford.edu/~knuth/lp.html)
- [Cornell Program Synthesizer historical paper](https://doi.org/10.1145/357980.358004)

*Fact/interpretation boundary: Tacit's AST-first and dual-view design are project claims. The suggested review experiments and wider implications are Toolglass analysis, not published comparative results. No compiler benchmark was run for this draft.*
