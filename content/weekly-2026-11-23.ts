import type { Article } from './articles';

export const weeklyArticles: Article[] = [
  {
    "slug": "the-program-has-two-faces",
    "kicker": "FEATURE / PROGRAMMING LANGUAGES",
    "title": "The Program Has Two Faces",
    "subtitle": "What if a program could look different to the person reviewing it and the machine writing it?",
    "summary": "Tacit gives AI authors and human reviewers different views of one program. The experiment revives a much older question about what we gain when source text becomes one of several views.",
    "byline": "Toolglass Editorial Desk",
    "publishedDate": "23 November 2026",
    "readingTime": "7 min read",
    "thesis": "Multiple representations are useful only if each one faithfully reveals the same canonical program.",
    "intro": [
      "For most of computing's history, source code has been a compromise. It must be precise enough for a machine to execute and legible enough for a person to write, read and repair. We have become so accustomed to that compromise that we sometimes mistake it for a law of nature.",
      "It isn't. The computer does not read the file in quite the way we do. A compiler takes the text apart, discovers its grammatical structure, checks relationships, and constructs a more exact internal representation. The familiar lines and braces are a doorway into the program, not necessarily the program's most useful form.",
      "Now there is a second kind of author at the door. A language model does not need the same visual cues as a person; it consumes tokens, patterns and constraints. Meanwhile the human reviewing its work needs more explanation, not less. A single notation is being pulled in opposite directions.",
      "The experimental language Tacit makes that tension explicit. Its repository describes an abstract syntax tree as the source of truth, with a compact authoring view and a lossless inspection view. The project is early and its efficiency claims need independent measurement. But the question it raises is worth a magazine feature even if Tacit itself never becomes a widely used language: what happens when the text file stops being the sovereign object of programming?"
    ],
    "sections": [
      {
        "heading": "The file that pretended to be the program",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "A programmer can point to a function in a source file and say, reasonably, 'there is my program.' Yet much of what matters is absent from the visible page. A name resolves to a particular declaration. An operation has a type. A call has effects. A variable has a lifetime. A compiler can discover some of these facts, reject others and lower the remainder into instructions that look nothing like the original prose."
          },
          {
            "type": "paragraph",
            "text": "We already live with multiple representations. Debuggers show stacks and values; IDEs show symbols and references; compilers produce intermediate representations; profilers display flame graphs. The source file has remained the official record because it is portable, editable, diffable and pleasantly ordinary. It survives tools, vendors and decades. That is a tremendous advantage, not an embarrassing relic."
          },
          {
            "type": "paragraph",
            "text": "But it has a peculiar weakness. A textual edit can be tiny while its semantic consequences are enormous. Rename a variable in the wrong scope; change the precedence of an expression; move a function across a module boundary. A diff can show every character and still fail to explain the actual change. Conversely, a refactoring can alter hundreds of lines while preserving the program's behaviour."
          },
          {
            "type": "paragraph",
            "text": "The dream of a structure-aware editor is therefore old. In the 1970s and 1980s, syntax-directed editors tried to let programmers manipulate grammatical objects rather than arbitrary characters. The Cornell Program Synthesizer is a famous example. Later came the work on intentional programming and projectional editors, including JetBrains MPS. A projection is a view onto a structured program: one underlying object might be shown as text, a table, a mathematical expression or a diagram."
          },
          {
            "type": "paragraph",
            "text": "These systems discovered a stubborn human fact. People like to type. Text is fast, flexible, composable and easy to exchange. A structured editor can feel like a clerk demanding that every thought arrive on the correct form. Some systems also create problems for ordinary diffs, version control and unfamiliar tools. The historical lesson is not that structured programming environments were wrong, but that a superior representation can lose to a superior workflow."
          }
        ]
      },
      {
        "heading": "The new author does not type",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "A model changes the balance. It can generate a constrained sequence of tokens, choose among grammar-valid continuations, or emit a structured object directly. It can also produce confident-looking nonsense. A machine-oriented representation could reduce syntactic ambiguity, but it would not magically solve semantic correctness, security or design intent."
          },
          {
            "type": "paragraph",
            "text": "Tacit's premise is to separate the dense representation used for authoring from the expanded representation used for inspection while keeping both lossless. That last property is decisive. A human-readable explanation that omits a branch, an effect or a conversion is not a faithful view of the program. A model-friendly compression that cannot be reconstructed exactly is not a safe source format. The two views must point to one canonical structure, not two approximations that slowly drift apart."
          },
          {
            "type": "paragraph",
            "text": "Imagine a simple operation: read a file, parse its contents, update a database and report success. The compact form might be economical for generation. The inspection form could expose four obligations: which file may be read, what happens on malformed input, whether the database write is atomic, and which failure paths return success. The extra detail is not decoration. It is where review begins."
          },
          {
            "type": "paragraph",
            "text": "But there is a trap. A tool can print 'safe' in a beautifully formatted inspector without having proved safety. A typed AST records what the compiler knows, not everything a program will do in the world. External calls, concurrency, hardware and human requirements still escape the diagram. A trustworthy inspection view must show uncertainty and missing evidence as carefully as established facts."
          }
        ]
      },
      {
        "heading": "A language is also a social agreement",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "The most interesting comparison is not between a new syntax and Python or Rust. It is between who is authorised to say what the program means. In conventional practice, source code is the common legal document. A compiler interprets it; a reviewer reads it; tests exercise it. When the AST becomes canonical, the editor, serializer and migration machinery become more central. A bug in a projection can mislead the human without changing the executable program. A bug in the serializer can corrupt the canonical record itself."
          },
          {
            "type": "paragraph",
            "text": "This introduces difficult but answerable engineering questions. Can the representation be stored in ordinary Git without opaque binary blobs? Can two branches merge independent changes without silently changing meaning? Are comments, layout and names preserved? Can a human recover the program with a simple text tool when the specialised editor disappears? Can an auditor compare a generated view against the exact compiler input, by hash and by structural identity?"
          },
          {
            "type": "paragraph",
            "text": "Those questions are less glamorous than 'AI-native language', but they determine whether the idea is a tool or a dependency trap."
          },
          {
            "type": "paragraph",
            "text": "There is a related movement in literate programming. Donald Knuth's WEB separated the order in which a program was explained from the order in which a compiler consumed it. The programmer could write for human understanding while a tool rearranged the code for execution. Tacit's proposal is different, but it belongs in that family of attempts to escape the tyranny of one presentation. The old literate systems began with the human reader. The new proposals begin with a second, machine author and ask how to keep the human in charge of meaning."
          }
        ]
      },
      {
        "heading": "The test that matters",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "The decisive demonstration would be modest. Take a corpus of small programs, including deliberately awkward errors. Convert each into the canonical structure, display both views, edit in each direction and reconstruct the exact program. Check that hashes, types, effects, diagnostics and source locations remain consistent. Then ask people to review actual bugs. Do they find more of them? Do they understand the changes faster? Does the compact representation really reduce model tokens when error-repair turns are included?"
          },
          {
            "type": "paragraph",
            "text": "Until those tests are done, 'more efficient for AI' is a design hypothesis. The project's reported compiler capabilities establish that there is a working experiment to investigate, not that the central human-computer bargain has been improved."
          },
          {
            "type": "paragraph",
            "text": "A final complication is historical. Languages outlive their original tooling. Some of the most useful programs are written in systems nobody would choose for a new project. If canonical structure requires a fragile ecosystem to interpret, the code may become unreadable sooner than plain text would. A language designed for tomorrow's agents must also be readable by tomorrow's archivist."
          }
        ]
      },
      {
        "heading": "Two readers, one truth",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "There is something appealingly modest beneath the grand claim of an AI-first language. We need not force every participant in software development to stare at the same representation. A model might benefit from a constrained, compact form. A reviewer might need a rich account of contracts and consequences. A compiler needs a precise internal structure. A historian may need a durable text export. None should be permitted to invent a different program."
          },
          {
            "type": "paragraph",
            "text": "Perhaps the future is not one new language but a stronger agreement between representations: exact round trips, visible provenance, explicit uncertainty, reproducible compilation and human-friendly views that never pretend to be proof."
          },
          {
            "type": "paragraph",
            "text": "The file has served us extraordinarily well. The next step is not to throw it away. It is to ask whether the program can have more than one face without acquiring more than one truth."
          }
        ]
      }
    ],
    "heroImage": {
      "src": "/art/one-program-two-faces.webp",
      "alt": "Compact blue marks and labelled inspection fields flank a shared syntax tree.",
      "caption": "One Program, Two Readers. A concept plate for two views of a shared structure.",
      "kind": "CONCEPT PLATE / TOOLGLASS",
      "width": 1536,
      "height": 1024
    },
    "toolboxHeading": "The side corridor",
    "toolbox": [
      {
        "term": "AST",
        "description": "Abstract syntax tree, the compiler's structured account of a program's grammar."
      },
      {
        "term": "Projectional editing",
        "description": "Changing a structured program through one of several presentations rather than editing only raw text."
      },
      {
        "term": "Intermediate representation",
        "description": "A compiler's internal form used for analysis or optimisation."
      },
      {
        "term": "Literate programming",
        "description": "Writing code and explanation in an order suited to readers, then mechanically producing executable source."
      },
      {
        "term": "Lossless round trip",
        "description": "A conversion that can recover the original canonical structure exactly, including details that affect meaning."
      }
    ],
    "sourcesHeading": "Primary reading and verification",
    "sources": [
      {
        "label": "Tacit source and design claims",
        "href": "https://github.com/weetster/tacit"
      },
      {
        "label": "JetBrains MPS, projectional language workbench",
        "href": "https://www.jetbrains.com/mps/"
      },
      {
        "label": "Donald Knuth's literate programming archive",
        "href": "https://www-cs-faculty.stanford.edu/~knuth/lp.html"
      },
      {
        "label": "Cornell Program Synthesizer historical paper",
        "href": "https://pages.cs.wisc.edu/~fischer/papers/synthesizer.pdf"
      }
    ],
    "sourcesIntro": "Tacit’s design and implementation details are project claims. Toolglass did not benchmark the compiler."
  },
  {
    "slug": "susan-graham-and-the-tools-that-look-back",
    "kicker": "PROFILE / PROGRAMMING TOOLS",
    "title": "Susan Graham and the Tools That Look Back",
    "subtitle": "From the Unix call graph to programming by voice, a career spent making the structure of software visible.",
    "summary": "From gprof and Berkeley Pascal to voice-driven editing and parallel computing, Susan Graham helped build tools that reveal how programs work.",
    "byline": "Toolglass Editorial Desk",
    "publishedDate": "23 November 2026",
    "readingTime": "7 min read",
    "thesis": "Graham and her collaborators built programming tools that help people see the structure and behaviour of their own work.",
    "intro": [
      "A profiler is an unusually honest kind of critic. You tell the computer what you intended to do. It tells you what your program actually spent its time doing. Sometimes the two accounts are not even on speaking terms.",
      "The familiar Unix tool gprof made that disagreement visible to generations of programmers. It did not simply say that a program was slow. It could show which functions called which other functions, and where execution time accumulated. The work was done at Berkeley by Susan Graham, Peter B. Kessler and Marshall Kirk McKusick. In Graham's career, however, this famous tool is only one stop on a much longer journey: from understanding machine code, to understanding whole programs, to understanding how people might work with programs without fighting their tools.",
      "The thread running through her research is not a particular language or machine. It is the idea that a computer should help us see the structure and behaviour of our own work."
    ],
    "sections": [
      {
        "heading": "A mathematician enters the workshop",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "Graham studied mathematics at Harvard, then computer science at Stanford, where she completed her doctorate in 1971. She joined Berkeley's computer science faculty in 1971. In 1973, when computer science moved into the College of Engineering as part of EECS, she became the college's first woman faculty member. She remained the only woman on the EECS faculty until Avideh Zakhor arrived in 1988."
          },
          {
            "type": "paragraph",
            "text": "It is tempting to write this as a simple story of an individual overcoming a hostile profession. The evidence supports a more precise observation: Graham built a long, collaborative research career inside institutions where her presence was unusual. Her students and collaborators appear everywhere in the technical record. The work itself is a story about groups, tools and teaching rather than solitary genius."
          },
          {
            "type": "paragraph",
            "text": "Early compilers were confronted by a practical question. A high-level language can express an operation clearly, but how should the compiler choose the machine instructions that implement it efficiently? Graham's research helped develop pattern-matching approaches to code generation and methods for program analysis. This is the layer where a pleasant source-language abstraction meets a processor that knows nothing about the programmer's intentions."
          },
          {
            "type": "paragraph",
            "text": "At Berkeley, the Unix project offered a laboratory for such ideas. Graham and students worked on the Berkeley Pascal system. With Kessler and McKusick she developed gprof, a profiler combining execution information with a call graph. It gave programmers a map of the dynamic relationships between functions. A function that looked innocent on the page might be expensive because it was called millions of times; another might matter because it summoned an entire forest of work."
          },
          {
            "type": "pullquote",
            "text": "A useful programming tool does not flatter your intentions. It shows you the machine you actually built.",
            "attribution": "TOOLGLASS / EDITORIAL EXTRACT"
          }
        ]
      },
      {
        "heading": "The editor as an instrument",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "Profiling looks backward at a running program. Graham's later research also looked forward, asking whether an editor could understand the structure of the program while someone was still writing it."
          },
          {
            "type": "paragraph",
            "text": "With colleagues, she investigated language-based environments such as Pan, Ensemble and Harmonia. These projects belong to a history that mainstream editor marketing often forgets. They treated software artifacts as structured documents, not just streams of characters. The ambition was to maintain syntax and semantic information incrementally, then use that knowledge to support richer editing, transformations and navigation."
          },
          {
            "type": "paragraph",
            "text": "The Ensemble project, active from 1989 to 1997, imagined an integrated environment for programs, documentation, specifications and performance analysis. These were not merely separate windows arranged neatly on a desktop. The researchers wanted the relationships between the artifacts to be meaningful and maintainable. If a program changed, its surrounding information should not become a forgotten museum of yesterday's assumptions."
          },
          {
            "type": "paragraph",
            "text": "Harmonia went further into the human side of the problem. Its research programme combined incremental program analysis with psychology of programming, interface design and high-level interactive transformations. It even investigated programming by voice, not as a novelty for dictating punctuation but as a way to express structural editing operations. The project explicitly connected this to reducing barriers for developers with repetitive strain injuries and other disabilities that make typing difficult."
          },
          {
            "type": "paragraph",
            "text": "This is a striking ancestor of today's conversation about AI-assisted programming. The vocabulary is different, but the underlying question is familiar: why must the human communicate with the development environment only by manipulating individual characters? Could the machine understand a higher-level intention and preserve the structural guarantees that make the edit safe?"
          },
          {
            "type": "paragraph",
            "text": "The answer was not simply to abolish text. Text remains flexible, durable and easy to combine with ordinary tools. Structure-aware editors can be awkward, and their specialised representations can trap work inside a particular system. The interesting tension is the attempt to gain semantic assistance without losing the freedoms of an ordinary file."
          }
        ]
      },
      {
        "heading": "Parallel worlds",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "Graham's work did not stay within interactive tools. She was also part of the team behind Titanium, a Java-derived language and compiler system for scientific parallel computing. Here the central problem changed again. A program might be spread across processors, each with its own work and data. The language needed to let scientists express parallel computation while exposing enough structure for efficient compilation and reliable execution."
          },
          {
            "type": "paragraph",
            "text": "This was a different kind of human-computer negotiation. The programmer wanted to describe a scientific problem. The machine required a precise arrangement of communication, memory and synchronisation. A language could hide some of that complexity, but hiding everything would make performance mysterious and debugging punishing. Titanium explored where explicit parallel structure could help rather than hinder."
          },
          {
            "type": "paragraph",
            "text": "There is a larger pattern here. gprof revealed runtime relationships. Harmonia tried to make editing relationships visible and manipulable. Titanium made relationships between parallel computations a language-design concern. Graham's work repeatedly returned to the seam between what a programmer means and what a machine can demonstrate."
          },
          {
            "type": "pullquote",
            "text": "The future of an editor may depend less on how fast it accepts text than on how well it understands a change.",
            "attribution": "TOOLGLASS / EDITORIAL EXTRACT"
          }
        ]
      },
      {
        "heading": "The institution behind the instrument",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "Graham also did the less photogenic work of helping a discipline organise itself. She was the founding editor-in-chief of ACM Transactions on Programming Languages and Systems, served in major research and policy roles, and mentored generations of students. Her honours include the IEEE John von Neumann Medal and the ACM/IEEE Ken Kennedy Award. Those distinctions are relevant, but they are not the centre of this story."
          },
          {
            "type": "paragraph",
            "text": "The more revealing fact is that a substantial part of her research lives on as ordinary expectations. A programmer expects to inspect a call graph, to navigate symbols, to receive immediate semantic feedback, to work in an editor that understands more than plain characters. Those expectations did not arrive by accident. They were built by people who treated programming tools as an intellectual field in their own right."
          },
          {
            "type": "paragraph",
            "text": "In 2026, software tools are again being redesigned around a new kind of collaborator: an AI model. It is easy to imagine that the history of editing began with a chat box in a code window. Graham's work is a useful corrective. Researchers were asking about structured manipulation, semantic feedback, alternative input methods and integrated artifacts decades ago. The new technology changes what is possible, but it does not erase the old questions."
          },
          {
            "type": "paragraph",
            "text": "A program can be compiled without being understood. It can run quickly without doing the right thing. It can be edited easily while becoming harder to maintain. Graham's career suggests that the best tools do not merely produce more code. They help us discover what the code is, how it behaves and what our changes have actually done."
          },
          {
            "type": "paragraph",
            "text": "The profiler's first gift was a difficult truth about execution. The larger project was to make the computer a better witness to our own thinking."
          }
        ]
      }
    ],
    "heroImage": {
      "src": "/art/graham-tools-look-back.webp",
      "alt": "An anonymous programmer stands beneath a row of connected panels labelled call, time, parse, edit, voice, data and flow.",
      "caption": "The Tools Look Back. A concept plate about programming instruments.",
      "kind": "CONCEPT PLATE / TOOLGLASS",
      "width": 1536,
      "height": 1024
    },
    "toolboxHeading": "Workbench sidebar",
    "toolbox": [
      {
        "term": "gprof",
        "description": "Unix call-graph profiler that relates execution costs to function calls."
      },
      {
        "term": "Berkeley Pascal",
        "description": "A Pascal compiler/system built in the Berkeley Unix research environment."
      },
      {
        "term": "Pan",
        "description": "An early language-based editing environment exploring structure-aware development."
      },
      {
        "term": "Ensemble",
        "description": "Berkeley research into integrated structured software documents and development artifacts."
      },
      {
        "term": "Harmonia",
        "description": "Language-aware interactive editing research, including program transformations and voice interaction."
      },
      {
        "term": "Titanium",
        "description": "Java-derived parallel language and compiler system for scientific computing."
      },
      {
        "term": "Incremental analysis",
        "description": "Updating a previous analysis after a change instead of starting from scratch."
      }
    ],
    "sourcesHeading": "Read More",
    "sources": [
      {
        "label": "Berkeley Engineering's profile of Susan Graham",
        "href": "https://engineering.berkeley.edu/susan-graham-the-colleges-first-woman-faculty-member/"
      },
      {
        "label": "Berkeley faculty biography and publications",
        "href": "https://www2.eecs.berkeley.edu/Faculty/Homepages/graham-s.html"
      },
      {
        "label": "Harmonia research archive",
        "href": "https://people.eecs.berkeley.edu/~harmonia/harmonia/research/index.html"
      },
      {
        "label": "The Ensemble research project",
        "href": "https://people.eecs.berkeley.edu/~harmonia/harmonia/ensemble.html"
      },
      {
        "label": "Titanium project archive",
        "href": "https://titanium.cs.berkeley.edu/intro.html"
      },
      {
        "label": "Susan Graham biography",
        "href": "https://people.eecs.berkeley.edu/~graham/biography.html"
      },
      {
        "label": "Berkeley EECS faculty chronology",
        "href": "https://eecs.berkeley.edu/news/susan-graham-sole-woman-professor-berkeley-eecs-17-years/"
      },
      {
        "label": "Graham, Kessler and McKusick’s original gprof paper",
        "href": "https://web.eecs.umich.edu/~weimerw/2012-4610/reading/graham-gprof.pdf"
      }
    ],
    "sourcesIntro": "Both pull quotes are original Toolglass editorial lines."
  }
];
