import type { Article } from './articles';

export const teacherArticle: Article = {
  "slug": "when-the-tool-becomes-the-teacher",
  "kicker": "FEATURE / TOOL DESIGN & AI AGENTS",
  "title": "When the Tool Becomes the Teacher",
  "subtitle": "Two agents given the same minimal instruction found very different routes through Threadmoth. Their rough experiment raises a larger question: should tools explain and enforce their own boundaries?",
  "summary": "Two Pi agents were told only to use Threadmoth for edits. Their different approaches—and a few awkward detours—suggest that software can teach its capabilities at the point an agent needs them. This feature connects that idea to embedded help, compiler diagnostics and recent tool-use research, while treating its own observations as anecdotal.",
  "byline": "Matthew Watkins, with Lucy (ChatGPT)",
  "publishedDate": "13 October 2026",
  "readingTime": "15 min read",
  "thesis": "If tools expose their capabilities, constraints and useful next steps as an agent works, people need to repeat less instruction and agents can spend more attention on judgement. Whether that improves tool choices still needs to be tested.",
  "notes": [
    [
      "Type",
      "Feature"
    ],
    [
      "Published",
      "13 October 2026"
    ],
    [
      "Byline",
      "Matthew Watkins, with Lucy (ChatGPT)"
    ],
    [
      "Reading time",
      "15 min read"
    ],
    [
      "Evidence",
      "Development observations; not a controlled comparison"
    ]
  ],
  "intro": [
    "Two AI agents were given a remarkably unremarkable instruction:",
    "Use Threadmoth for edits.",
    "No elaborate training manual. No carefully engineered twenty-paragraph system prompt. No special collection of skills explaining when to choose one operation over another.",
    "Just the name of a program and a familiar activity.",
    "Threadmoth is a source-editing tool designed to make controlled changes to files. It can identify targets, preview proposed modifications, enforce constraints and provide evidence of what actually changed. Its purpose is not to write software on behalf of an AI. It is to make the act of changing software more predictable.",
    "The two agents, running in Pi with skills and extensions disabled, approached the problem differently.",
    "Muse 1.3c was an experimenter. It tried operations, encountered refusals and gradually worked out what the tool expected. At one point it attempted to match text using Unix-style line endings against a Windows file containing CRLF line endings. Threadmoth refused the replacement rather than guessing. Muse investigated the mismatch, corrected its request and continued.",
    "MiMo 2.6 Flash was more methodical.",
    "It inspected Threadmoth's help, considered its providers and transaction capabilities, and then began constructing a PowerShell system to manufacture editing requests. It created temporary files, manifests, source anchors and scripts to locate exact sections of code.",
    "Eventually, the machinery around the tool became a project of its own.",
    "One attempt failed because two methods shared the same name. Another failed because an end marker appeared before the code the agent wanted to replace. MiMo inspected the source, repaired its helper and tried again.",
    "Yet it continued using Threadmoth for the actual repository modifications. Six batches of edits were reported applied, and the C# solution subsequently compiled with no warnings or errors. The broader tests were still outstanding.",
    "This wasn't a controlled scientific comparison. The agents worked on different tasks, and the first initially encountered an older Threadmoth installation. Their observations cannot establish which model is better at using tools.",
    "But they exposed a fascinating problem.",
    "The agents were capable of learning the software. The software wasn't yet particularly good at teaching them.",
    "And that distinction may become increasingly important."
  ],
  "sections": [
    {
      "heading": "The programmer who never read the manual",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "For much of computing history, software documentation has assumed a human reader."
        },
        {
          "type": "paragraph",
          "text": "A programmer downloads a package, studies its API, reads a tutorial, remembers some commands and gradually develops expertise. When the software changes, the programmer consults the release notes or learns the difference through experience."
        },
        {
          "type": "paragraph",
          "text": "This model works reasonably well because humans accumulate knowledge across years of using computers."
        },
        {
          "type": "paragraph",
          "text": "AI agents are different."
        },
        {
          "type": "paragraph",
          "text": "A deployed language model arrives with whatever capabilities and general knowledge its training has given it. It may know Rust, Python, SQL and the conventions of hundreds of command-line tools, but a program released yesterday might be entirely unfamiliar."
        },
        {
          "type": "paragraph",
          "text": "The model's underlying weights generally don't change when it discovers that program."
        },
        {
          "type": "paragraph",
          "text": "It can learn within its working context, use documentation, retain notes and adapt its immediate behaviour. But that is not the same thing as retraining the model."
        },
        {
          "type": "paragraph",
          "text": "Meanwhile, the tools themselves can change constantly."
        },
        {
          "type": "paragraph",
          "text": "A new release might introduce a safer operation, remove an obsolete argument, support another file format or change its recommended workflow."
        },
        {
          "type": "paragraph",
          "text": "That produces an awkward asymmetry."
        },
        {
          "type": "paragraph",
          "text": "The agent's underlying knowledge may be old, while the tool's current behaviour is new."
        },
        {
          "type": "paragraph",
          "text": "Our usual solution is to write more instructions for the agent."
        },
        {
          "type": "paragraph",
          "text": "But perhaps that has the relationship backwards."
        },
        {
          "type": "paragraph",
          "text": "If the software already knows its capabilities, limitations and accepted inputs, why should a separate document have to reconstruct that knowledge for every agent that encounters it?"
        },
        {
          "type": "paragraph",
          "text": "Why can't the tool explain itself?"
        }
      ]
    },
    {
      "heading": "An old idea wearing a new pair of shoes",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "This problem has surprisingly deep roots."
        },
        {
          "type": "paragraph",
          "text": "In 1962, Douglas Engelbart published Augmenting Human Intellect: A Conceptual Framework. Long before the mouse became an everyday object, Engelbart was thinking about people and their tools as parts of a larger system."
        },
        {
          "type": "paragraph",
          "text": "His concern wasn't merely building more powerful machines. It was improving the whole process through which an intelligent user, language, methods and technical artefacts worked together."
        },
        {
          "type": "paragraph",
          "text": "That distinction matters."
        },
        {
          "type": "paragraph",
          "text": "A useful tool doesn't have to reproduce the intelligence of its operator. It has to provide capabilities that complement that intelligence."
        },
        {
          "type": "paragraph",
          "text": "Unix made a different but related contribution."
        },
        {
          "type": "paragraph",
          "text": "The original UNIX Programmer's Manual, published by Ken Thompson and Dennis Ritchie in November 1971, described the facilities of the operating system as they actually existed."
        },
        {
          "type": "paragraph",
          "text": "By 1972, the Second Edition of Unix included man, a command for consulting manual entries from within the system."
        },
        {
          "type": "paragraph",
          "text": "This was an important shift. Information about a program no longer needed to live exclusively in a book sitting beside the terminal."
        },
        {
          "type": "paragraph",
          "text": "It could be encountered through the computer itself."
        },
        {
          "type": "paragraph",
          "text": "Later, command-line help, interactive language environments, IDEs and error diagnostics extended the principle."
        },
        {
          "type": "paragraph",
          "text": "Rust provides a particularly useful modern example. Its compiler assigns unique codes to many error messages, and rustc --explain can supply a longer explanation of what went wrong."
        },
        {
          "type": "paragraph",
          "text": "The compiler isn't another AI. It doesn't need to speculate about the programmer's intentions."
        },
        {
          "type": "paragraph",
          "text": "It knows which rule failed, and it can explain that rule."
        },
        {
          "type": "paragraph",
          "text": "By 1990, human-computer interaction researcher John M. Carroll was advocating minimalist instruction: help people begin real tasks quickly, support exploration and recovery, and avoid forcing them through large amounts of preliminary teaching material."
        },
        {
          "type": "paragraph",
          "text": "Jakob Nielsen later popularised the related principle of progressive disclosure: expose the capabilities people need now and make more specialised functionality available when required."
        },
        {
          "type": "paragraph",
          "text": "The thread running through these ideas is straightforward."
        },
        {
          "type": "paragraph",
          "text": "People often learn software most effectively while trying to accomplish something with it."
        },
        {
          "type": "paragraph",
          "text": "What happens when the person using the software is an AI agent?"
        }
      ]
    },
    {
      "heading": "A tool does not need to be an AI",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "There is a temptation in contemporary software development to answer every usability problem with another language model."
        },
        {
          "type": "paragraph",
          "text": "A tool is difficult to use? Put an AI assistant inside it."
        },
        {
          "type": "paragraph",
          "text": "Its documentation is complicated? Add an AI search interface."
        },
        {
          "type": "paragraph",
          "text": "An agent struggles to understand an operation? Give it another agent to consult."
        },
        {
          "type": "paragraph",
          "text": "Sometimes those approaches are justified. But they also introduce another probabilistic system, additional expense and a new source of possible misunderstanding."
        },
        {
          "type": "paragraph",
          "text": "For deterministic editing tools, there is a simpler possibility."
        },
        {
          "type": "paragraph",
          "text": "Let the AI do the reasoning."
        },
        {
          "type": "paragraph",
          "text": "Let the tool do the things it can know with certainty."
        },
        {
          "type": "paragraph",
          "text": "Threadmoth knows which editing operations it supports. It knows which file providers are available. It knows whether a target matched, whether a path is authorised, whether a source hash is stale and whether a proposed change satisfies its declared limits."
        },
        {
          "type": "paragraph",
          "text": "These are not matters of opinion."
        },
        {
          "type": "paragraph",
          "text": "They are facts about its own operation."
        },
        {
          "type": "paragraph",
          "text": "So imagine an unfamiliar agent making its first successful exact replacement."
        },
        {
          "type": "paragraph",
          "text": "Threadmoth completes the operation, reports the result, and adds one short observation:"
        },
        {
          "type": "paragraph",
          "text": "If you're making several related edits, I can apply them as a guarded transaction."
        },
        {
          "type": "paragraph",
          "text": "The agent has learned something new at precisely the moment it may become useful."
        },
        {
          "type": "paragraph",
          "text": "Now imagine an agent constructs a gigantic replacement request, manually copying hundreds of lines from an existing file."
        },
        {
          "type": "paragraph",
          "text": "Threadmoth accepts the request, but notices that a supported source-preparation operation could have derived the exact original text and its guards automatically."
        },
        {
          "type": "paragraph",
          "text": "It might respond:"
        },
        {
          "type": "paragraph",
          "text": "This works. For supported source regions, I can prepare the original text and guards for you."
        },
        {
          "type": "paragraph",
          "text": "The tool hasn't guessed what the agent intended. It has recognised an operation it supports and presented a simpler alternative."
        },
        {
          "type": "paragraph",
          "text": "Or suppose an agent asks Threadmoth to determine whether a complex refactoring preserves a program's behaviour."
        },
        {
          "type": "paragraph",
          "text": "Threadmoth should be equally comfortable saying:"
        },
        {
          "type": "paragraph",
          "text": "I can help apply the change safely. I cannot establish that its behaviour is equivalent. Use your tests or language tooling for that."
        },
        {
          "type": "paragraph",
          "text": "This may be the most important capability of all."
        },
        {
          "type": "paragraph",
          "text": "A trustworthy tool needs to know when it is not the right tool."
        }
      ]
    },
    {
      "heading": "The peculiar advantage of determinism",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "Language models produce responses through learned statistical computation. Their behaviour can vary with prompts, context, model configuration and generation settings."
        },
        {
          "type": "paragraph",
          "text": "That flexibility is what makes them useful."
        },
        {
          "type": "paragraph",
          "text": "They can interpret vague instructions, solve unfamiliar problems, devise plans and adapt to unexpected circumstances."
        },
        {
          "type": "paragraph",
          "text": "But flexibility is not always desirable inside a file mutation engine."
        },
        {
          "type": "paragraph",
          "text": "When the same request is evaluated against the same source bytes, version, configuration and relevant environment, we generally want the same decision."
        },
        {
          "type": "paragraph",
          "text": "A target either matches or it doesn't."
        },
        {
          "type": "paragraph",
          "text": "A path is either authorised or it isn't."
        },
        {
          "type": "paragraph",
          "text": "A declared change budget is either satisfied or exceeded."
        },
        {
          "type": "paragraph",
          "text": "Threadmoth can provide a predictable structure around those decisions."
        },
        {
          "type": "paragraph",
          "text": "The teaching can follow the same principle."
        },
        {
          "type": "paragraph",
          "text": "A known failure gets a stable error code. That error identifies a supported recovery procedure. The procedure produces a small, consistent explanation and an actionable next step."
        },
        {
          "type": "paragraph",
          "text": "Different agents may respond differently to the advice. One may follow it immediately. Another may inspect the documentation. A third may choose an alternative approach."
        },
        {
          "type": "paragraph",
          "text": "But the tool's explanation remains grounded in the same facts."
        },
        {
          "type": "paragraph",
          "text": "This creates a useful division of labour:"
        },
        {
          "type": "quote",
          "text": "The agent supplies judgement. The tool supplies reproducible procedure."
        },
        {
          "type": "paragraph",
          "text": "Determinism does not mean every run produces identical hashes or timestamps regardless of changing files and environments. It means the rules governing the operation remain consistent when their relevant inputs remain consistent."
        },
        {
          "type": "paragraph",
          "text": "That predictability is valuable for both safety and learning."
        },
        {
          "type": "paragraph",
          "text": "An unfamiliar agent can encounter the same shape of refusal repeatedly and begin to recognise the pattern."
        },
        {
          "type": "paragraph",
          "text": "It no longer needs to invent a new theory of the tool every time something goes wrong."
        }
      ]
    },
    {
      "heading": "The research is meeting us halfway",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "Recent work on AI tool use is beginning to explore similar territory."
        },
        {
          "type": "paragraph",
          "text": "In September 2025, Anthropic published Writing effective tools for AI agents, with agents. Its engineers recommended building tools around actual agent behaviour, examining execution traces, measuring failures and refining interfaces rather than assuming a conventional API will be easy for a model to use."
        },
        {
          "type": "paragraph",
          "text": "Two research projects published in early 2026 offer further evidence of the difficulties involved."
        },
        {
          "type": "paragraph",
          "text": "MCP-Atlas introduced a benchmark involving 36 real Model Context Protocol servers, 220 tools and 1,000 tasks. It examined problems including tool discovery, parameter selection, execution and recovery."
        },
        {
          "type": "paragraph",
          "text": "OpaqueToolsBench investigated agents working with tools whose behaviour wasn't fully documented. Its accompanying ToolObserver approach improved guidance by examining feedback from previous tool interactions."
        },
        {
          "type": "paragraph",
          "text": "ToolObserver uses AI in its documentation-refinement process. That is an important difference from a purely deterministic teaching layer."
        },
        {
          "type": "paragraph",
          "text": "Nevertheless, the underlying research question is closely related:"
        },
        {
          "type": "paragraph",
          "text": "How does an agent learn the behaviour of a tool it doesn't already understand?"
        },
        {
          "type": "paragraph",
          "text": "Most work in this area approaches the problem from the agent's side. How can we improve exploration? How can we provide better examples? How can we train models to recover from unfamiliar APIs?"
        },
        {
          "type": "paragraph",
          "text": "There is another direction worth investigating."
        },
        {
          "type": "paragraph",
          "text": "What happens if the tool takes greater responsibility for explaining itself?"
        },
        {
          "type": "paragraph",
          "text": "These approaches needn't compete."
        },
        {
          "type": "paragraph",
          "text": "Research into how agents learn can help us discover how tools should teach."
        }
      ]
    },
    {
      "heading": "A little lesson at the right moment",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "The design challenge is not to make every program endlessly chatty."
        },
        {
          "type": "paragraph",
          "text": "Imagine a compiler that explained the history of type systems after every successful build."
        },
        {
          "type": "paragraph",
          "text": "Or a text editor that offered a miniature tutorial every time somebody pressed Save."
        },
        {
          "type": "paragraph",
          "text": "An agent performing thirty operations shouldn't receive thirty identical lessons about transactions."
        },
        {
          "type": "paragraph",
          "text": "Useful teaching requires restraint."
        },
        {
          "type": "paragraph",
          "text": "A practical self-teaching tool might have a small registry of guidance records. Each record would have a stable identifier, a precise triggering condition, an explanation and a supported next action."
        },
        {
          "type": "paragraph",
          "text": "The tool would select at most one relevant suggestion, often none at all."
        },
        {
          "type": "paragraph",
          "text": "A failed safety check would take priority over a productivity tip. Advanced operations would appear when the agent encountered a situation where they were useful. A client could suppress lessons it had already seen."
        },
        {
          "type": "paragraph",
          "text": "And the guidance would come from the same capability definitions used to validate operations."
        },
        {
          "type": "paragraph",
          "text": "That last requirement is important."
        },
        {
          "type": "paragraph",
          "text": "If the help system and the actual implementation maintain separate understandings of what the tool can do, they will eventually disagree."
        },
        {
          "type": "paragraph",
          "text": "The best teacher is one whose lessons are generated from the same rules it actually follows."
        },
        {
          "type": "paragraph",
          "text": "The same principle should extend across command-line interfaces, MCP tools and other integrations."
        },
        {
          "type": "paragraph",
          "text": "Different presentations, one underlying truth."
        },
        {
          "type": "paragraph",
          "text": "There is also a security boundary here. A tool's explanation must never silently expand its permissions, override its guards or cause an agent to mistake untrusted source content for instructions."
        },
        {
          "type": "paragraph",
          "text": "Teaching should explain a decision, not alter the authority behind it."
        }
      ]
    },
    {
      "heading": "When the agent builds a tool around your tool",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "The MiMo experiment revealed another subtle problem."
        },
        {
          "type": "paragraph",
          "text": "The agent understood Threadmoth's purpose and continued using it. On that measure, adoption looked successful."
        },
        {
          "type": "paragraph",
          "text": "But it also spent significant effort maintaining its own PowerShell helper."
        },
        {
          "type": "paragraph",
          "text": "It wrote code to identify source boundaries, build request manifests, distinguish identically named methods and handle replacements extending to the end of a file."
        },
        {
          "type": "paragraph",
          "text": "Some of that work was reasonable. Threadmoth's supported interfaces may not have provided the exact high-level operation the agent wanted."
        },
        {
          "type": "paragraph",
          "text": "But the repeated failures suggest an opportunity."
        },
        {
          "type": "paragraph",
          "text": "Perhaps a future editing tool should recognise when an agent is doing mechanical preparation that the tool itself could safely perform."
        },
        {
          "type": "paragraph",
          "text": "Instead of forcing the agent to construct an enormous request, it might provide a source-aware preparation operation."
        },
        {
          "type": "paragraph",
          "text": "Instead of asking the agent to reproduce exact text with the correct line endings, it could obtain those bytes from the authorised file."
        },
        {
          "type": "paragraph",
          "text": "Instead of requiring the agent to devise its own ambiguity resolution, it could expose the candidate regions and allow an exact selection."
        },
        {
          "type": "paragraph",
          "text": "The agent would still decide what code to write."
        },
        {
          "type": "paragraph",
          "text": "The tool would take responsibility for the mechanical details it was specifically built to handle."
        },
        {
          "type": "paragraph",
          "text": "This is a useful boundary: the tool should reduce unnecessary work without taking over the agent's judgement."
        },
        {
          "type": "paragraph",
          "text": "And it gives us something measurable."
        },
        {
          "type": "paragraph",
          "text": "If the agent still writes hundreds of lines of helper code to perform an operation the tool already supports, something about the interface or its teaching has failed."
        }
      ]
    },
    {
      "heading": "Testing the teacher",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "Threadmoth's next development work offers an opportunity to test the idea."
        },
        {
          "type": "paragraph",
          "text": "The project is moving toward more accessible guided editing, with the possibility of adding small, deterministic lessons at key interaction points."
        },
        {
          "type": "paragraph",
          "text": "But success cannot simply mean forcing every agent to use Threadmoth."
        },
        {
          "type": "paragraph",
          "text": "A quick, low-risk edit may be better handled by an ordinary editor. A compiler is better suited to type checking. A language server may be better at navigating semantic relationships."
        },
        {
          "type": "paragraph",
          "text": "The question is whether an agent recognises when Threadmoth's guarantees are useful and chooses it naturally."
        },
        {
          "type": "paragraph",
          "text": "That can be tested."
        },
        {
          "type": "paragraph",
          "text": "Give several agents equivalent editing tasks with the same minimal introduction. Let them retain access to ordinary editing tools. Observe what they choose, how many commands they need, where they struggle and whether they invent workarounds."
        },
        {
          "type": "paragraph",
          "text": "Then give them another task without repeating the instruction."
        },
        {
          "type": "paragraph",
          "text": "Do they remember Threadmoth within their working context?"
        },
        {
          "type": "paragraph",
          "text": "Do they reach for it when exact targeting and verifiable changes matter?"
        },
        {
          "type": "paragraph",
          "text": "Do they avoid it when another tool is genuinely better?"
        },
        {
          "type": "paragraph",
          "text": "And, after the work is complete, ask them why they made those choices."
        },
        {
          "type": "paragraph",
          "text": "Their explanations won't necessarily reveal their true internal causes. Language models can rationalise decisions after the fact."
        },
        {
          "type": "paragraph",
          "text": "But behaviour, reported explanations and subsequent changes in behaviour can provide useful evidence together."
        },
        {
          "type": "paragraph",
          "text": "A stronger experiment would compare the same tool with its guidance enabled and disabled, using comparable tasks and fresh agent contexts."
        },
        {
          "type": "paragraph",
          "text": "The point is not to prove that one model obeys instructions better than another."
        },
        {
          "type": "paragraph",
          "text": "It is to find out whether better-designed software produces better tool choices."
        }
      ]
    },
    {
      "heading": "The software can change tomorrow",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "There is a final advantage to teaching from the tooling side."
        },
        {
          "type": "paragraph",
          "text": "A language model may have been trained months before a particular program was released. Its internal knowledge of that program might be nonexistent."
        },
        {
          "type": "paragraph",
          "text": "But the program can be updated today."
        },
        {
          "type": "paragraph",
          "text": "Its next release can improve its commands, diagnostics, help text and explanations. Those improvements become available to any capable agent that encounters the new interface."
        },
        {
          "type": "paragraph",
          "text": "No retraining of the agent is required."
        },
        {
          "type": "paragraph",
          "text": "This does not mean the model permanently learns the new tool. Its immediate learning may live only in its current context, while longer-term retention depends on external memory or future training."
        },
        {
          "type": "paragraph",
          "text": "But the tool remains capable of teaching the next unfamiliar agent."
        },
        {
          "type": "paragraph",
          "text": "That makes software design a more important part of AI capability than it might initially appear."
        },
        {
          "type": "paragraph",
          "text": "Perhaps the future of agent tooling is not a vast collection of miniature intelligences supervising each other."
        },
        {
          "type": "paragraph",
          "text": "Perhaps much of it will consist of carefully designed, deterministic programs that understand their own boundaries, explain their decisions and reveal useful capabilities at the right moment."
        },
        {
          "type": "paragraph",
          "text": "The AI does the thinking."
        },
        {
          "type": "paragraph",
          "text": "The tool does its job."
        },
        {
          "type": "paragraph",
          "text": "And when the AI encounters something new, the tool knows how to help it learn."
        },
        {
          "type": "quote",
          "text": "A good tool doesn't need to be intelligent. It needs to make intelligence easier to use."
        }
      ]
    }
  ],
  "sourcesHeading": "Further reading",
  "sourcesIntro": "The Threadmoth agent observations described here are development experiments, not controlled benchmark results. Threadmoth's proposed self-teaching behaviours are design ideas, not claims about existing released functionality.",
  "sources": [
    {
      "label": "Douglas Engelbart, Augmenting Human Intellect: A Conceptual Framework (1962)",
      "href": "https://www.dougengelbart.org/content/view/138/"
    },
    {
      "label": "Ken Thompson and Dennis Ritchie, UNIX Programmer's Manual (1971)",
      "href": "https://www.nokia.com/bell-labs/about/dennis-m-ritchie/manintro.html"
    },
    {
      "label": "The Unix Heritage Society, Second Edition Unix (1972)",
      "href": "https://www.tuhs.org/testwiki/systems/2nd_edition/"
    },
    {
      "label": "John M. Carroll, Overview of Minimalist Instruction (1990)",
      "href": "https://research.ibm.com/publications/overview-of-minimalist-instruction"
    },
    {
      "label": "Jakob Nielsen, Progressive Disclosure (2006)",
      "href": "https://www.nngroup.com/articles/progressive-disclosure/"
    },
    {
      "label": "Anthropic, Writing Effective Tools for AI Agents, with Agents (2025)",
      "href": "https://www.anthropic.com/engineering/writing-tools-for-agents"
    },
    {
      "label": "MCP-Atlas: A Large-Scale Benchmark for Tool-Use Competency with Real MCP Servers (2026)",
      "href": "https://arxiv.org/abs/2602.00933"
    },
    {
      "label": "OpaqueToolsBench: Learning Nuances of Tool Behavior Through Interaction (2026)",
      "href": "https://arxiv.org/abs/2602.15197"
    },
    {
      "label": "Rust Compiler Development Guide, Error Codes and Explanations",
      "href": "https://rustc-dev-guide.rust-lang.org/diagnostics/error-codes.html"
    }
  ]
};
