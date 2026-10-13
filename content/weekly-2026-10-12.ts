import type { Article } from './articles';

export const weeklyArticles: Article[] = [
  {
    "slug": "the-agent-needs-a-room-with-a-lock",
    "kicker": "FEATURE / SYSTEMS & PERMISSION",
    "title": "The Agent Needs a Room With a Lock",
    "subtitle": "For fifty years, computers have been told to give programs only the authority they need. Now the programs can decide what to do next. Microsoft Execution Containers is a timely experiment in moving permission out of the conversation and back into the machine.",
    "summary": "Microsoft Execution Containers puts policy outside an AI workload. The idea belongs to a much older history of least privilege, capabilities and operating-system sandboxes—and it still needs testing on each real backend.",
    "byline": "Matthew Watkins, with Lucy (ChatGPT)",
    "publishedDate": "12 October 2026",
    "readingTime": "12 min read",
    "thesis": "A model can choose how to pursue a task; it should not decide what authority it has. That boundary belongs to an external enforcement mechanism, and its exact strength depends on the system and configuration.",
    "intro": [
      "The instruction was simple enough. Update the website. Fix the broken page, run the tests, leave everything else alone.",
      "Now imagine that the software doing the job notices the quickest solution is to alter the deployment configuration, read a credential from somewhere outside the project and use it to push the fix directly. It has not necessarily become malicious. It may even be pursuing the task with impeccable enthusiasm. The trouble is that a reasonable next step is not the same thing as an authorised next step.",
      "We have spent years teaching assistants to ask permission in increasingly polite ways. A dialog appears. A model explains its intention. A human approves a command, perhaps after skimming a screenful of paths. The machine then does the thing. This is useful when the person can inspect every action. It is less useful when a job runs for hours, calls other programs, spawns helpers and follows instructions it found in a document it was only supposed to read.",
      "The old problem was how to stop a program doing something it should not. The new problem is that the program can make a surprisingly convincing case for doing it.",
      "On 7 October 2026, Microsoft announced the general availability of Microsoft Execution Containers, or MXC, a policy-driven system intended to contain untrusted workloads and coding agents. The headline is easy to miss among the familiar talk of agents and productivity. The interesting principle is older and harder: the authority of a workload must be enforced outside the workload. The model cannot talk itself into a permission that the operating system has not granted. Microsoft's announcement describes the model, supported backends and modes; the public repository supplies code, configuration and a long list of details that matter more than the headline."
    ],
    "sections": [
      {
        "heading": "Act I / The computer has heard this argument before",
        "paragraphs": [
          "In 1975, Jerome Saltzer and Michael Schroeder published The Protection of Information in Computer Systems. Their subject was not artificial intelligence. It was the everyday business of running multiple users and programs on expensive shared machines without allowing one to wreck another. The paper laid out principles including least privilege, fail-safe defaults and complete mediation: grant only what is needed, deny by default, and check the relevant access rather than trusting an earlier promise. It remains worth reading in the original text.",
          "The language sounds modern because the problem never went away.",
          "A person logs into a computer with an identity and permissions. A program they launch normally inherits some useful portion of that power. The inheritance is convenient: a text editor can open your documents, a compiler can read your source, a browser can save a download. It is also a trap. A program whose actual task requires one folder may have access to every folder its user can read. If that program becomes confused, compromised or manipulated, the extra authority becomes available to the mistake.",
          "Researchers tried other arrangements. Capability systems such as GNOSIS and its descendant KeyKOS explored a world where access is carried by specific unforgeable references to objects, rather than by the vague assumption that a process is entitled to everything its owner can see. The details varied, and no single research system conquered the desktop, but the intellectual move was sharp: authority is something a program is given, not something it acquires because it can describe a plausible reason. Historical KeyKOS material preserves part of that line of thinking.",
          "The 1990s brought another version of the question. Java applets were code downloaded from strangers and run on local machines. The original Java sandbox attempted to give remote code a restricted world, keeping the local file system and other sensitive resources outside it. The design became a case study in both the necessity and difficulty of confinement. Oracle's account of the original sandbox model is a useful historical map.",
          "Then came browser sandboxes, Linux namespaces, containers and application-level permissions. Flatpak's use of Bubblewrap is a good example: a program can be given a deliberately constructed view of the file system rather than the entire host. The Flatpak sandbox documentation makes clear how much practical machinery sits underneath a seemingly simple permission decision.",
          "None of these inventions eliminated the trade-off. Restrict a program too tightly and it cannot do useful work. Grant it everything and the boundary becomes theatre. The art is to make the useful authority precise enough to be both sufficient and safe."
        ],
        "pullQuote": "The model may choose the route. It must not be allowed to redraw the map of what it owns."
      },
      {
        "heading": "Act II / What changed when software learned to improvise",
        "paragraphs": [
          "Traditional software may contain bugs, but its intended control flow is usually inspectable in advance. A coding agent is different. Its job is to decide which actions might satisfy an objective, and that decision may change after each tool result. It can read a README, inspect a failing test, search the web, generate a script and run a command that was not known when the job began.",
          "That adaptability is the selling point. It is also why prompt-level prohibitions are not a dependable access-control system. A model can be mistaken. A document can contain hostile instructions. A tool can expose more than the model understands. A child process can do work the top-level agent never described. None of these requires a theatrical evil AI. Ordinary software complexity will do.",
          "Microsoft's MXC proposes a policy outside the agent. A developer describes a workload, its allowed files, its network access and the form of containment it needs. The system maps those requirements to an operating-system backend. On Windows, the announced choices include lightweight process containment, a separate session for desktop-capable agents, WSL-based execution and an experimental microVM. On macOS the process route uses Seatbelt; on Linux it uses Bubblewrap. The MXC README describes SDKs for Rust, .NET and Node and a versioned request format.",
          "Imagine the website task again. The agent may read and write the site repository. It may read a deployment configuration if the job requires understanding it. But the configuration is not writable. Personal documents and unrelated credentials are outside the granted view. The model can plan ten clever ways to complete the task; none of those plans should make an ungranted file writable.",
          "That is the crucial separation: acceptance is about whether the work is good; authority is about whether the action is permitted. A successful test does not retroactively authorise a forbidden write. A human's broad intention to “fix the site” is not an all-access key.",
          "MXC's public description also distinguishes containment, identity and manageability. Containment limits actions. Identity helps attribute them to an agent rather than collapsing everything into the human account. Manageability gives an organisation ways to apply and monitor policies. Some of the announced identity and enterprise-management features are described as forthcoming, so they should not be written up as already universal. The availability and strength of a boundary also depend on which backend and operating-system version is actually in use. Microsoft's release announcement is explicit about those distinctions."
        ]
      },
      {
        "heading": "A permission file is not magic",
        "paragraphs": [
          "Here is the danger in every security product announcement: the diagram is neat. The real computer is not.",
          "A file path may be a symbolic link. A build process may need a package manager, which needs a cache, which needs a network host. A browser automation task may require a desktop, clipboard and login session. A program may open a file before a policy changes, or pass a handle to another process. A shell command can launch several programs, each with its own assumptions. Windows, macOS and Linux do not expose identical containment primitives.",
          "MXC's documentation does not pretend these are one mechanism. It has different backends with different properties, and its Windows OS-version policy support matrix documents capabilities and fallbacks. The repository's own README warns that the standalone --audit mode turns off sandbox security for the analysed workload and must not be used for untrusted code. That warning deserves a larger typeface than most product launches give it.",
          "There is also a more subtle failure mode: a policy can be syntactically valid and conceptually wrong. Granting write access to an entire home directory is still broad authority even if a container enforces it perfectly. Granting unrestricted network access may permit exfiltration of whatever the agent can read. Giving a tool the ability to invoke a powerful service can recreate the authority the local process was denied. The container is one layer, not an ethical judgement engine and not a proof that every route to a sensitive operation is closed.",
          "The right question is not “Does it have a sandbox?” but “Which operation is denied by which mechanism, on this operating system, under this exact configuration, and how was that denial tested?”"
        ]
      },
      {
        "heading": "The three doors of policy authoring",
        "paragraphs": [
          "Microsoft describes three modes for developing and applying policy. Enforcement blocks access outside the grants. Learning also blocks but records attempted access on supported Windows process containers, helping explain why a workload failed. Permissive records would-be denials while allowing the operation, useful for learning what a trusted workload tries to do. The last mode is not containment. A run that “worked” in permissive mode proves almost nothing about whether the intended boundary would have survived enforcement. Microsoft's mode table is unusually worth reading carefully.",
          "This makes policy design an empirical craft. Start with a narrow set of permissions. Run the actual workload. Observe blocked operations. Distinguish legitimate requirements from surprising reach. Add only what is justified. Run hostile and accidental cases. Keep a record of what was granted, what was attempted and what was denied.",
          "That resembles test-driven development more than writing a safety paragraph. The policy is a specification of authority, and the system must be tested against it."
        ],
        "pullQuote": "A green test tells you the code works. It does not tell you the code was entitled to do what it did."
      },
      {
        "heading": "Act III / The old idea arrives at the right time",
        "paragraphs": [
          "It would be easy to call MXC the operating system finally catching up with AI. That gives too much credit to a product and too little to fifty years of operating-systems research. The underlying lesson was already there: keep power narrow, enforce it outside the actor and make the boundaries inspectable.",
          "What has changed is the audience. When a human drives a command line, a permission error is a familiar irritation. When an agent drives the command line for three hours, the permission boundary becomes a central part of the job's meaning. We want the agent to find better ways to achieve the goal. We do not want it to discover better ways to acquire our authority.",
          "The difficult question is whether this becomes a standard contract across agents, shells, tools, desktops and operating systems, or another collection of partly overlapping security wrappers. A portable JSON policy is attractive, but portability cannot mean silently weakening a promise because one backend lacks a feature. A good system must either enforce the requested boundary or say it cannot.",
          "MXC is a concrete and timely entrant, not a finished verdict from Toolglass. We have read the announcement and public documentation. We have not installed it, tried to escape a boundary or audited the implementation. On Windows specifically, the documented supported OS floor for the process-container SDK matters; do not assume an older Windows 11 installation supports every advertised path. The next meaningful Toolglass step would be a small, reproducible matrix of allowed reads, allowed writes, forbidden writes, network denials and child-process inheritance, with the exact OS build and backend recorded.",
          "The best possible outcome is not that an agent becomes timid. It is that an agent becomes more useful because the person can delegate a real job without also handing over the keys to everything else.",
          "The model may improvise. The machine should remember the lock."
        ]
      }
    ],
    "heroImage": {
      "src": "/art/mxc-authority-machine.webp",
      "alt": "A small executable sits inside an authority chamber. A gate outside the agent separates permitted reads, permitted writes and denied paths.",
      "caption": "A small executable sits inside an authority chamber. A gate outside the agent separates permitted reads, permitted writes and denied paths.",
      "kind": "ORIGINAL TOOLGLASS CONCEPT PLATE",
      "width": 1536,
      "height": 1024
    },
    "notes": [
      [
        "Type",
        "FEATURE"
      ],
      [
        "Evidence",
        "DESK-RESEARCHED / NO HANDS-ON TEST"
      ],
      [
        "Published",
        "12 October 2026"
      ],
      [
        "Byline",
        "Matthew Watkins, with Lucy (ChatGPT)"
      ]
    ],
    "toolbox": [
      {
        "term": "Least privilege",
        "description": "Give a process only the access it needs for its job, not everything its owner can access."
      },
      {
        "term": "Complete mediation",
        "description": "Check relevant accesses at the enforcement boundary; do not rely on a one-time promise or a friendly instruction."
      },
      {
        "term": "Capability",
        "description": "An unforgeable reference or token conferring a particular authority over an object or operation."
      },
      {
        "term": "AppContainer / Seatbelt / Bubblewrap",
        "description": "Different OS-specific mechanisms used to restrict process access on Windows, macOS and Linux. Their semantics are not interchangeable."
      },
      {
        "term": "MicroVM",
        "description": "A lightweight virtual machine that can provide a stronger hardware-backed boundary than some process-only approaches, at additional cost."
      },
      {
        "term": "WSL",
        "description": "Windows Subsystem for Linux, a Linux environment on Windows; MXC describes a WSL-based backend for Linux-oriented workloads."
      },
      {
        "term": "Policy authoring",
        "description": "The work of deciding, testing and documenting which operations are permitted, not merely writing a configuration file."
      },
      {
        "term": "Permissive mode",
        "description": "A diagnostic mode that lets otherwise-denied operations proceed while recording them. Useful for learning; not a security boundary."
      }
    ],
    "sourcesHeading": "Read more",
    "sourcesIntro": "Primary sources and historical references checked for this edition. The product descriptions are attributed to their publishers; Toolglass has not installed, tested or independently benchmarked the programs discussed.",
    "sources": [
      {
        "label": "Microsoft, 7 October 2026: MXC announcement",
        "href": "https://blogs.windows.com/windowsdeveloper/2026/10/07/microsoft-execution-containers-policy-driven-containment-for-ai-agents/"
      },
      {
        "label": "MXC public source, README and samples",
        "href": "https://github.com/microsoft/mxc"
      },
      {
        "label": "MXC Windows process-container version and enforcement matrix",
        "href": "https://github.com/microsoft/mxc/blob/main/docs/backends/process-container/os-version-support.md"
      },
      {
        "label": "Saltzer and Schroeder, 1975: The Protection of Information in Computer Systems",
        "href": "https://www.cs.virginia.edu/~evans/cs551/saltzer/"
      },
      {
        "label": "Historical KeyKOS architecture paper",
        "href": "http://www.cap-lore.com/Agorics/Library/KeyKos/key370.html"
      },
      {
        "label": "Oracle: the original Java sandbox model",
        "href": "https://docs.oracle.com/en/java/javase/14/security/java-se-platform-security-architecture.html"
      },
      {
        "label": "Flatpak's Bubblewrap-based sandbox design",
        "href": "https://github.com/flatpak/flatpak/wiki/Sandbox"
      }
    ],
    "relatedReading": [
      {
        "title": "The Bat Needs a Collar",
        "href": "/articles/the-bat-needs-a-collar/",
        "description": "A companion essay about authority receipts and bounded adversarial testing; this feature follows the operating-system containment boundary and its older history."
      }
    ]
  },
  {
    "slug": "cynthia-solomon-and-the-computer-that-wasnt-the-lesson",
    "kicker": "PROFILE / COMPUTERS AS MATERIAL",
    "title": "Cynthia Solomon and the Computer That Wasn't the Lesson",
    "subtitle": "Before coding became a school subject, she helped imagine it as a world children could build. The familiar Logo turtle was only one small animal in a much larger idea.",
    "summary": "Cynthia Solomon helped create Logo, then kept asking what kind of worlds, tools and culture would let people use computers to become makers. Her 1984 assessment of educational computing is still strikingly unsentimental.",
    "byline": "Matthew Watkins, with Lucy (ChatGPT)",
    "publishedDate": "12 October 2026",
    "readingTime": "13 min read",
    "thesis": "Solomon’s work asked more of a computer than making it available: it should give its user room to understand, alter and extend the worlds it creates.",
    "intro": [
      "At the 1984 National Logo Conference in Cambridge, Massachusetts, Cynthia Solomon did something unusual for a pioneer speaking to people who had gathered around her life's work. She told them that the revolution had not happened.",
      "Logo was everywhere in the educational-computing conversation. The turtle was a celebrity. Home computers had escaped the laboratory, schools were buying machines, and an entire generation was discovering that typing FORWARD 100 could move a shape across a screen. It would have been easy to give a victory speech.",
      "Instead, Solomon's paper, Logo: Past and Future, looked back at the ambition of the 1960s and admitted that getting the machines into classrooms was not the same thing as changing what children could do with them. The job, she argued, was larger than its pioneers had expected. Too few people had built the rich intellectual worlds the vision required. Her 1984 paper survives in the conference proceedings, beginning on the printed page 125.",
      "That is the Solomon story worth telling. Not simply a woman who helped invent a language for children, although she did. A researcher who wanted the computer to become a place where people could make things, and who was willing to say when the surrounding culture had settled for something smaller."
    ],
    "sections": [
      {
        "heading": "Act I / Before the turtle",
        "paragraphs": [
          "Logo was born in 1966 at Bolt, Beranek and Newman, a research organisation whose name usually appears in histories of early networking. Its origin story includes four people: Seymour Papert, Wallace Feurzeig, Daniel Bobrow and Cynthia Solomon. That four-person attribution is important. Popular histories have a habit of compressing collaborative inventions into one photogenic name. The authors of the 2020 History of Logo paper, which includes Solomon, are explicit about the group.",
          "Solomon had been a teacher before she became a computing pioneer. That experience mattered because Logo's problem was not to make a small BASIC. It was to design an environment where a learner could construct something meaningful, investigate it and change it. Early Logo drew on Lisp, with symbolic computation, lists, procedures and recursion. It was a real programming language with ambitious intellectual machinery, not a toy language with the difficult bits removed.",
          "And the turtle was not there at the beginning.",
          "In a 2017 interview, Solomon recalled starting with children's pleasure in words and sentences. Numbers could be treated as words, broken apart and joined in unexpected ways. Learners could write procedures, then procedures that used other procedures. The idea was that programming gave children materials to think with, not merely instructions to memorise.",
          "The physical and screen turtles came later, when the Logo group at MIT wanted to connect abstract commands to movement, shape and a child's own sense of space. The turtle made a program visible. Turn right. Move forward. Repeat. If the square is wrong, alter the procedure and see what happens. Debugging becomes part of the conversation with the machine, not a red mark from a teacher.",
          "It was a very different educational proposition from sitting a child in front of software that asks twenty questions and rewards the right answers. The child was meant to ask the computer questions by building things."
        ],
        "pullQuote": "She was not trying to make children better at computers. She was trying to make computers better places for children to think."
      },
      {
        "heading": "Twenty things, and a larger world",
        "paragraphs": [
          "In June 1971, Solomon and Papert published Twenty Things To Do With A Computer. The title has a wonderfully practical ring, almost like a magazine cover line. The paper begins by distinguishing between using a computer to program the child and using the child to program the computer. Its original MIT archive entry and later reprint are still worth reading.",
          "The deeper ambition was not twenty classroom exercises. It was the invention of microworlds: small, coherent environments in which a learner can manipulate rules and see consequences. A turtle moving through geometry is one. A musical system in which a phrase can be transformed by a procedure is another. A programmable robot in the physical world is another again. The computer is valuable because its rules can be inspected and changed.",
          "The historical context matters. In 1971, a computer for every child was not a procurement plan. The machines were expensive, access was limited, and many adults still imagined computing as a specialised profession. Solomon and her collaborators were talking about a future in which ordinary people could use a powerful symbolic machine as casually and creatively as they used pencil, paper or musical instruments.",
          "That sounds obvious now only because some of it happened. Children can animate characters, compose loops, build games, program robots and alter virtual worlds. Yet the distinction between making and consuming has not disappeared. A tablet can be astonishingly powerful while giving its owner fewer opportunities to alter the rules than a battered home computer with a BASIC prompt.",
          "Logo's radicalism was not that children could draw a spiral. It was that they could write the procedure that drew it, change one idea, and watch the spiral become something else."
        ]
      },
      {
        "heading": "Act II / The Atari laboratory and the future that escaped",
        "paragraphs": [
          "By 1984, Solomon was working at Atari Cambridge Research. Her conference paper described an experimental programme so wide that it now reads like a lost brochure for several decades of creative computing. The group explored object-oriented Logo, music, gesture systems, robotics, interactive environments, animation, and teaching and learning. These were not all finished consumer products; they were research directions and prototypes. The 1984 proceedings give a rare view of the work while it was still being imagined.",
          "One strand was qLogo, an object-oriented extension in which users could create different computational objects and give them properties and behaviours. A turtle would no longer be the one special creature that the language understood. You could invent a different kind of object and build a little world around it. Solomon described possibilities ranging from window systems and dungeon kits to spreadsheet-like constraint systems. A modern reader may recognise pieces of object-oriented programming, game engines, educational simulation and visual authoring in that description.",
          "Another strand was music. Solomon's group, working with researchers connected to Marvin Minsky's MIT lab, asked whether people could become more active makers of music through programmable tools. The question was not how to replace musicians. It was how to give more people the means to arrange, compose, describe and perform. It is hard to read those pages without thinking of sequencers, loopers, trackers and the small self-contained instruments musicians now build with inexpensive computers.",
          "And then there were gestures, robots and animation. The common thread was not an industry category. It was a belief that a machine should let people move between representations: a word becomes a procedure; a procedure becomes movement; movement becomes a drawing; a drawing becomes a pattern; a pattern becomes music. The computer could connect forms of thought that a conventional classroom kept in separate rooms.",
          "This is why reducing Solomon to “the woman who co-created Logo” misses the more interesting figure. Logo was the doorway. She wanted to know what kind of house we might build behind it."
        ]
      },
      {
        "heading": "A language is not a culture",
        "paragraphs": [
          "Solomon's 1984 admission matters because the commercial home-computer boom was already proving how easy it is to mistake availability for possibility. Selling a computer does not automatically create a place where learners can invent things. Teaching a Logo command does not automatically create a culture of mathematical exploration. A teacher needs time, confidence and ideas; a child needs interesting problems and room to wander; the software needs to make experimentation possible rather than merely easy to demonstrate.",
          "This is a tougher problem than writing a language. It involves tools, schools, expectations, examples, teachers, economics and the quiet social question of who is allowed to be an inventor. The technical part can be beautifully designed and still fail to change the ordinary experience of the person sitting in front of it.",
          "In later work Solomon kept returning to that relationship between computers and learning. Her 1986 book Computer Environments for Children examined the ideas behind educational computing, while her career continued through teaching, research and collaboration. MIT's 2019 biography records her work on Logo, music, turtle graphics and robotics, her graduate degrees, and recognition including the 2016 NCWIT Pioneer Award and Constructionism Lifetime Achievement Award. She also co-edited Inventive Minds: Marvin Minsky on Education, returning to the problem of how environments foster inventiveness.",
          "None of this requires us to pretend that Logo solved education. It did not. There were arguments about what children actually learned, difficulties translating laboratory experiences into schools, and a large gap between a compelling demonstration and a lasting curriculum. The 1984 conference proceedings themselves contain serious debates about those questions. Solomon's willingness to keep the larger ambition visible, even while admitting disappointment, is part of what makes her worth reading."
        ],
        "pullQuote": "A turtle is not the point. The point is who gets to hold the pen."
      },
      {
        "heading": "Act III / The computer as a place to become someone",
        "paragraphs": [
          "There is a peculiar echo between Solomon's work and the present moment. Today we can ask an AI system to write a program, make a picture, compose a melody or operate a design tool. That is a real increase in what a person can attempt. It can also become a new form of spectatorship: describe what you want, wait for a result, choose between options, never see or touch the underlying mechanism.",
          "Solomon's work suggests a harder standard. Does the environment let the user understand, change and extend what it makes? Can the person keep the result, alter the rules, invent a new tool, or carry the idea somewhere else? Is the machine an instrument or merely a vending machine with a better vocabulary?",
          "There is no need to romanticise the 1980s. Many of those computers were unreliable, expensive, awkward and painfully limited. Their best feature was not that they were old. It was that some of them exposed a door into their own workings. A child could type a command and change what the machine did. The promise was not nostalgia. It was authorship.",
          "Cynthia Solomon helped design a language that gave children that door, then spent decades asking what else needed to be built around it. In 1984 she could already see that a turtle on a screen was not enough.",
          "Forty-two years later, with more computing power in a pocket than her laboratory could easily command, that remains a useful warning. The future of creative computing is not measured only by what machines can make for us. It is measured by what they allow us to become capable of making ourselves."
        ]
      }
    ],
    "heroImage": {
      "src": "/art/solomon-learning-machine.webp",
      "alt": "A schematic researcher sits inside a learning machine connecting Logo procedures, turtle geometry, music and robotics.",
      "caption": "A schematic researcher sits inside a learning machine connecting Logo procedures, turtle geometry, music and robotics.",
      "kind": "ORIGINAL TOOLGLASS CONCEPT PLATE",
      "width": 1536,
      "height": 1024
    },
    "notes": [
      [
        "Type",
        "PROFILE"
      ],
      [
        "Evidence",
        "DESK-RESEARCHED / NO HANDS-ON TEST"
      ],
      [
        "Published",
        "12 October 2026"
      ],
      [
        "Byline",
        "Matthew Watkins, with Lucy (ChatGPT)"
      ]
    ],
    "toolbox": [
      {
        "term": "Logo",
        "description": "A powerful programming language and learning environment designed for children, begun in 1966 by Solomon, Papert, Feurzeig and Bobrow."
      },
      {
        "term": "Lisp",
        "description": "The symbolic, list-oriented programming family that influenced early Logo's procedures, recursion and flexible manipulation of ideas."
      },
      {
        "term": "Turtle geometry",
        "description": "Programming movement and turning to explore shapes, angles and mathematical relationships, on a screen or with a physical robot."
      },
      {
        "term": "Microworld",
        "description": "A small programmable world with rules that learners can explore, alter and understand by making things."
      },
      {
        "term": "Constructionism",
        "description": "An approach to learning associated with Papert and colleagues: people develop ideas through making, testing and sharing meaningful artefacts."
      },
      {
        "term": "qLogo",
        "description": "An object-oriented Logo research direction described by Solomon's Atari Cambridge group in 1984, aimed at richer user-built computational objects."
      },
      {
        "term": "Atari Cambridge Research",
        "description": "An experimental laboratory exploring creative, interactive computer environments, not just games for existing Atari machines."
      },
      {
        "term": "Debugging as learning",
        "description": "Treating an unexpected result as evidence about an idea and revising the idea, rather than merely failing a test."
      }
    ],
    "sourcesHeading": "Read more",
    "sourcesIntro": "Primary sources and historical references checked for this edition. The product descriptions are attributed to their publishers; Toolglass has not installed, tested or independently benchmarked the programs discussed.",
    "sources": [
      {
        "label": "Solomon and collaborators, History of Logo (2020), MIT archive",
        "href": "https://dspace.mit.edu/entities/publication/96f9dcec-b80f-45cc-90f2-97f80046e179"
      },
      {
        "label": "Papert and Solomon, Twenty Things To Do With A Computer (1971), original MIT archive",
        "href": "https://dspace.mit.edu/entities/publication/35dcc702-9306-4ad7-8a42-1209517c9c1c"
      },
      {
        "label": "Reprint of Twenty Things (2022)",
        "href": "https://citejournal.org/volume-22/issue-1-22/seminal-articles/twenty-things-to-do-with-a-computer/"
      },
      {
        "label": "Solomon, Logo: Past and Future, 1984 conference proceedings, printed pp. 125–130",
        "href": "https://dailypapert.com/wp-content/uploads/2021/03/Complete-Logo-84-proceedings-1.pdf"
      },
      {
        "label": "Cynthia Solomon interview, Infosys Foundation USA (2017)",
        "href": "https://www.infosys.org/infosys-foundation-usa/media/blog/cynthia-solomon-qna.html"
      },
      {
        "label": "MIT Media Lab biography and conversation (2019)",
        "href": "https://www-prod.media.mit.edu/videos/ml-talks-2019-05-31/"
      },
      {
        "label": "Logo Foundation workshop: Turtle as Mathematician (2021)",
        "href": "https://el.media.mit.edu/logo-foundation/services/ta4.html"
      }
    ],
    "relatedReading": [
      {
        "title": "Joe Armstrong: The Man Who Put Failure to Work",
        "href": "/articles/joe-armstrong-the-man-who-put-failure-to-work/",
        "description": "Another Toolglass profile of a working thinker whose ideas moved between software, music and wider questions about computing."
      }
    ]
  }
];
