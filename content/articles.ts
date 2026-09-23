export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  kicker: string;
  title: string;
  subtitle: string;
  summary: string;
  byline: string;
  publishedDate: string;
  readingTime: string;
  thesis: string;
  intro: string[];
  sections: ArticleSection[];
  heroImage?: {
    src: string;
    alt: string;
    caption: string;
    kind?: string;
    width?: number;
    height?: number;
  };
  notes?: [string, string][];
  sources: { label: string; href: string }[];
};

export const articles: Article[] = [
  {
    slug: "please-stop-making-ai-sound-so-uncool",
    kicker: "COLUMN / LANGUAGE & AI",
    title: "Please Stop Making AI Sound So Fucking Uncool",
    subtitle:
      "Trump wants artificial intelligence renamed super intelligence. We can do worse. Welcome to Super Uber Mega Intelligence™, vibe coding, digital workers and the rest of AI's naming catastrophe.",
    summary:
      "Artificial intelligence may be the strangest technology in public life. Its vocabulary increasingly sounds like it was approved by a committee at an airport hotel. Vibe coding, agentic AI, digital coworkers and the rest are not harmless cringe: bad language flattens useful distinctions and makes new ideas harder to think about.",
    byline: "Matthew Watkins, with Lucy (ChatGPT)",
    publishedDate: "23 September 2026",
    readingTime: "9 min read",
    thesis:
      "AI has genuine new concepts that need names. Too often we turn them into status jargon, stretch them until they mean everything, then wonder why nobody can tell what the technology actually does.",
    notes: [
      ["Type", "Opinion column"],
      ["Published", "23 September 2026"],
      ["Byline", "Matthew Watkins, with Lucy (ChatGPT)"],
      ["Reading time", "9 min read"],
      ["Victims", "vibe coding, agentic AI, digital workers, copilots"],
      ["Survivor", "slop"],
    ],
    intro: [
      "This article exists because Donald Trump tried to rename artificial intelligence.",
      "At the United Nations on 22 September 2026, Trump said the word artificial makes intelligence sound fake and announced that United States documents would instead use the term super intelligence. He even supplied the new abbreviation: SI.",
      "My immediate reaction was that this could obviously be improved. If the President of the United States gets Super Intelligence, I am claiming Super Uber Mega Intelligence. SUMI. Trademark pending, in the extremely important sense that I have just typed the symbol in my head.",
      "Then I realised we had accidentally arrived at a much larger problem.",
      "Artificial intelligence is, objectively, an absurd thing to have lying around the house. You can open a laptop, describe a half-formed idea in ordinary language, and a machine can search documentation, write software, analyse a contract, explain a paper, draw a picture, argue with your assumptions and occasionally make up a citation with the serene confidence of a man giving directions in a town he has never visited.",
      "This should feel like science fiction.",
      "So why does so much of the language around it sound like a regional sales conference at a Holiday Inn?",
      "We have vibe coding. Agentic workflows. Digital workers. AI coworkers. Prompt engineers. Human-in-the-loop systems. Copilots everywhere. Somewhere, presumably, an agentic copilot is synergising with a digital colleague while a human remains available in case anybody needs the password.",
      "The technology is weird, consequential and unfinished. The vocabulary has all the glamour of a conference lanyard."
    ],
    sections: [
      {
        heading: "Super intelligence is already a thing",
        paragraphs: [
          "There is an extra problem with Trump's proposed rename beyond taste: superintelligence already means something.",
          "In AI research and public discussion, superintelligence normally refers to a hypothetical system whose capabilities broadly exceed those of humans. It is a category about capability, not a jaunty replacement label for every chatbot, image generator and autocomplete box.",
          "Renaming ordinary AI 'super intelligence' therefore does not merely make the language more bombastic. It collapses two different concepts into one.",
          "That is the perfect miniature of the naming problem around AI. A term sounds exciting, useful or fundable, so it expands until the distinction it once carried disappears.",
          "Which is why Super Uber Mega Intelligence™ has one important advantage over SI: nobody could possibly mistake it for a serious technical category. Yet."
        ]
      },
      {
        heading: "Vibe coding: a joke that escaped",
        paragraphs: [
          "Start with vibe coding, because somebody has to.",
          "Andrej Karpathy coined the phrase in February 2025 for a deliberately loose way of building little projects with an LLM. The important part was not simply that AI wrote the code. It was that the human could largely stop caring about the code as code, accept changes, run the thing, report what broke and keep going. IBM's current explanation still traces the term to Karpathy and describes the shift toward natural-language, AI-generated implementation.",
          "That is a perfectly legitimate thing to name. It is also obviously a joke. The phrase works when it means: I am throwing this together, I am following the result more than the implementation, and for this job I am comfortable with that bargain.",
          "Then the phrase escaped.",
          "Now people use vibe coding for almost any development involving AI, including work where the human is designing architecture, defining constraints, reviewing behaviour, writing tests, measuring performance and deciding what gets shipped. At that point the name stops describing a method and starts describing the presence of an AI.",
          "This matters. If one phrase covers both 'I barely read the diff' and 'I delegated implementation inside a tested engineering process', the phrase has become informationally useless.",
          "It has also achieved the remarkable feat of making programming with a machine that understands natural language sound less futuristic than arranging cushions."
        ]
      },
      {
        heading: "Agentic: useful adjective, terminal disease",
        paragraphs: [
          "Agentic AI at least began with a useful distinction. A chatbot answers. An agent can pursue a goal across multiple steps, use tools, observe results and decide what to do next. There is real architecture hiding under the adjective.",
          "Unfortunately, the adjective has been discovered by marketing.",
          "Gartner wrote in May 2026 that the terms 'AI agents' and 'agentic AI' were already overused. That was not a prediction. It was a diagnosis.",
          "Once a word becomes desirable, everything wants it. We get agentic workflows, agentic organisations, agentic commerce, agentic infrastructure and agentic workforces. The word gradually stops telling you how the system works and starts telling you that somebody would like you to perceive it as advanced.",
          "This is how technical vocabulary dies. First it distinguishes something. Then it sells something. Then it decorates everything."
        ]
      },
      {
        heading: "Meet your new digital colleague, apparently",
        paragraphs: [
          "Enterprise AI has produced an especially damp family of euphemisms: digital worker, digital employee, digital colleague, AI teammate.",
          "These are not parody terms. Salesforce currently defines a digital worker as an AI software application that can act like a colleague or virtual employee, and its broader language talks about digital labour and digital workforces.",
          "There can be practical reasons to model a system around a job role. If software handles invoices, triages support tickets and escalates exceptions, describing the responsibilities in human terms can make workflow design easier.",
          "But 'AI employee' does something more than describe capability. It quietly changes the comparison. Software stops being compared with other software and starts being compared with a salary.",
          "That is branding doing economics in a false moustache.",
          "Call it an agent. Call it automation. Call it a service. Call it Derek if you absolutely must. But if Derek has no employment contract, cannot resign and can be duplicated 4,000 times before lunch, perhaps Derek is software."
        ]
      },
      {
        heading: "Prompt engineer: a real skill wearing a novelty hat",
        paragraphs: [
          "Prompt engineering has the opposite problem. The underlying activity is real.",
          "OpenAI defines prompt engineering as designing and optimising instructions so a model produces the required result consistently. In production systems that can involve schemas, examples, tool policies, context management, evaluations and repeated testing. That is engineering work when it is treated as engineering work.",
          "But the title also enjoyed a period where ordinary competence at talking to a model was inflated into a mysterious priesthood. Write a clear instruction, add 'act as an expert', sprinkle three hashes over it and apparently you had entered a new profession.",
          "The joke is that the genuinely difficult part of working with AI increasingly lies beyond the clever sentence. It is deciding what the model should know, what it may do, where deterministic constraints belong, how failure is detected and which decisions remain human.",
          "The magic prompt was always going to have a short half-life."
        ]
      },
      {
        heading: "Human in the loop, like a fuse",
        paragraphs: [
          "Human-in-the-loop is technically clear and often useful. It describes systems where people provide feedback, corrections, approval or final judgement.",
          "It is also a magnificent piece of accidental dystopian comedy.",
          "The human is no longer the person operating the system. The human is a component in the diagram.",
          "Stanford HAI noticed the problem years ago. At its 2022 conference on the subject, researchers explicitly argued for reversing the frame: humans are in charge, AI is in the loop.",
          "That tiny grammatical change is more important than it looks. Language has architecture. If you repeatedly describe the person as the intermittent intervention mechanism, eventually somebody will design the system that way."
        ]
      },
      {
        heading: "Copilot is where metaphors go to die",
        paragraphs: [
          "Copilot was once a good metaphor. The human is flying. The machine assists. Everybody understands the relationship.",
          "Then AI discovered aviation.",
          "Microsoft turned Copilot into a major product identity and the wider industry adopted the same basic metaphor everywhere: coding copilots, sales copilots, security copilots, research copilots. The word is now so familiar that it barely paints the cockpit anymore.",
          "This is the natural life cycle of a successful technology metaphor. It begins by making the unfamiliar legible. It ends as a grey rectangle containing a sparkle icon.",
          "At some point there are six copilots and nobody appears to be flying the fucking plane."
        ]
      },
      {
        heading: "Why slop survived",
        paragraphs: [
          "Which brings us to slop, one of the few pieces of recent AI vocabulary worth protecting.",
          "Cambridge now defines AI slop as low-quality digital content created by artificial intelligence. More broadly, slop has returned as a wonderfully efficient word for cheap, excessive, semi-liquid cultural output: material produced because producing it is easy, not because anybody had much reason to make it.",
          "It works because it does not flatter the technology or the speaker.",
          "Slop is physical. You can hear the bucket. You can smell the canteen. It tells you about quality, abundance and appetite in one syllable.",
          "More importantly, it names the result rather than pretending to explain the mechanism. A human can make slop. An AI can make slop. A corporation can commission slop at industrial scale. The criticism survives changes in tooling.",
          "That is good language. Short, concrete, mean when it needs to be, and difficult to turn into a consultancy."
        ]
      },
      {
        heading: "No, the nerds are not getting all the blame",
        paragraphs: [
          "It is tempting to blame nerds for this. That would be unfair.",
          "Nerds also gave us names like Unix, Python, Smalltalk, Git, Doom and Raspberry Pi. Technical culture is perfectly capable of producing names with wit, texture and a pulse.",
          "The really lethal mixture is technical shorthand plus status anxiety plus enterprise marketing. Engineers coin an internal term. Founders realise investors recognise it. Consultants discover there is a workshop in it. LinkedIn performs the final embalming.",
          "Soon the term no longer helps people think. It helps people signal that they are standing near the future.",
          "That is the part worth being vicious about, because AI is difficult enough without a layer of ceremonial fog poured over it."
        ]
      },
      {
        heading: "A final service to the industry",
        paragraphs: [
          "It would be unfair to spend an entire article criticising AI names without contributing some fresh damage of our own.",
          "So, free of charge, here are several names the industry is welcome to steal immediately:",
          "ThoughtOps™ — DevOps for thinking. Horribly believable.",
          "VibeOps™ — deploying vibes to production.",
          "Human Amplification Layer™ — congratulations, you are middleware.",
          "Synthetic Colleague™ — bleak enough to be real.",
          "Intelligence Fabric™ — enterprise-grade polyester for the mind.",
          "Digital Workforce Swarm™ — HR has discovered bees.",
          "Cognitive Control Plane™ — your chatbot now has NATO insignia.",
          "Collaborative Reasoning Assistant Platform™ (CRAP™) — almost too perfect.",
          "Autonomous Reasoning Support Environment™ (ARSE™) — the British edition.",
          "Large Autonomous Decision System™ (LADS™) — deploy the LADS.",
          "If any of these appear in a keynote within twelve months, Toolglass accepts no responsibility."
        ]
      },
      {
        heading: "A modest proposal: say what the thing does",
        paragraphs: [
          "We do need new language. New technology creates genuinely new behaviours, and forcing every new thing into an old category can be just as misleading as inventing jargon.",
          "But a useful term should buy us precision.",
          "If an AI answers questions, call it an assistant. If it can choose actions and use tools, call it an agent and say what authority it has. If code was generated without meaningful review, say that. If a human must approve a decision, say where. If software performs a business process, describe the process before pretending it has joined payroll.",
          "And if the output is slop, for God's sake call it slop.",
          "The future does not need to sound futuristic. It needs to be legible.",
          "These machines are already strange enough. We can stop helping them become uncool."
        ]
      }
    ],
    sources: [
      {
        label: "White House — President Trump at the United Nations, 22 September 2026",
        href: "https://www.whitehouse.gov/releases/2026/09/president-trump-at-the-united-nations-while-others-have-talked-i-have-acted/"
      },
      {
        label: "Reuters — Trump says U.S. will henceforth call AI 'super intelligence'",
        href: "https://www.reuters.com/legal/government/trump-says-us-will-henceforth-call-ai-super-intelligence-2026-09-22/"
      },
      {
        label: "Oxford University Press — Superintelligence: Paths, Dangers, Strategies",
        href: "https://www.oup.com.au/books/general-interest/art-technology/9780198739838"
      },
      {
        label: "IBM — What is vibe coding?",
        href: "https://www.ibm.com/think/topics/vibe-coding"
      },
      {
        label: "Gartner — What Are AI Agents and Agentic AI for Service and Support?",
        href: "https://www.gartner.com/en/documents/7833117"
      },
      {
        label: "OpenAI — Prompt engineering best practices for ChatGPT",
        href: "https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt"
      },
      {
        label: "Salesforce — What Is a Digital Worker?",
        href: "https://www.salesforce.com/agentforce/digital-worker/"
      },
      {
        label: "Salesforce — What Is Digital Labor?",
        href: "https://www.salesforce.com/agentforce/digital-labor/"
      },
      {
        label: "Stanford HAI — AI in the Loop: Humans Must Remain in Charge",
        href: "https://hai.stanford.edu/news/ai-loop-humans-must-remain-charge"
      },
      {
        label: "Microsoft — Get started with the Microsoft Copilot app",
        href: "https://support.microsoft.com/en-us/microsoft-365-copilot/what-is-microsoft-copilot-app"
      },
      {
        label: "Cambridge Dictionary — AI slop",
        href: "https://dictionary.cambridge.org/dictionary/english/ai-slop"
      }
    ]
  },
  {
    slug: 'the-prize-is-the-cheapest-part-of-a-hackathon',
    kicker: 'FEATURE / AI & OPEN INNOVATION',
    title: 'The Prize Is the Cheapest Part of a Hackathon',
    subtitle:
      'AI has made the losing pile easier to read. The bargain should become easier to read too.',
    summary:
      'Hackathons do more than produce winners. They produce a field of experiments, ideas, pain points and prototypes. AI makes that field cheaper to analyse, while some competition rules explicitly permit internal research, AI training or commercial reuse. That does not prove theft. It does mean entrants should know exactly what they are giving away.',
    byline: 'Matthew Watkins, with Lucy (ChatGPT)',
    publishedDate: '21 September 2026',
    readingTime: '11 min read',
    thesis:
      'A hackathon prize rewards a few winners. The sponsor may still learn from everybody else. AI has made that long tail more valuable, so rights around research, training and commercial reuse should be explicit and unbundled.',
    heroImage: {
      src: '/art/hackathon-field-machine-plate.webp',
      alt: 'A small cobalt prize block sits on a visible tray attached to a much larger filing and sorting machine full of cards, drawers and punched tape.',
      caption:
        'The prize tray is visible. The filing cabinet is the point.',
      kind: 'CONCEPT PLATE / MACHINE FOLKLORE',
      width: 1600,
      height: 900,
    },
    notes: [
      ['Type', 'Reported argument'],
      ['Published', '21 September 2026'],
      ['Byline', 'Matthew Watkins, with Lucy (ChatGPT)'],
      ['Reading time', '11 min read'],
      ['Core distinction', 'Ownership is not the same thing as a narrow licence'],
      ['Proposal', 'A standard Hackathon Rights Card'],
    ],
    intro: [
      'The public story of a hackathon is simple. A company presents a challenge. Developers build things. Judges choose the best. Somebody gets a large novelty cheque. Everyone learns something. Stickers are distributed.',
      'That story is true. It is also incomplete.',
      'A hackathon also gives an organiser a field full of external experimentation: new uses for its technology, repeated complaints, strange combinations, unfinished prototypes, market signals and ideas its own team may never have tried. A few people receive prizes. The organiser gets to see the field.',
      'That has always been useful. AI changes the economics of it.'
    ],
    sections: [
      {
        heading: 'This is not a theft story',
        paragraphs: [
          'There is no good evidence that technology companies generally run hackathons as covert operations for stealing entrants’ inventions. That claim would be dramatic and, on the evidence available, unjustified.',
          'The more defensible point is already well established. Hackathons are a form of open innovation: organisations deliberately invite knowledge, experimentation and ideas from outside their own boundaries. A 2026 Wharton working paper treats hackathons, crowdsourcing and innovation labs as mechanisms for sourcing external knowledge. A peer-reviewed 2023 study of hackathon value capture goes further, warning that organisers can end up “capturing the lion’s share of the generated value.”',
          'Devpost’s own material for corporate customers makes the commercial purpose unusually clear. It promotes public hackathons as a way to surface new use cases and integrations, drive adoption and learn what developers build. That is not scandalous. It is what open innovation is for.',
          'The interesting question is therefore not whether organisers learn from hackathons. Of course they do. It is how much continuing value can be extracted from the submissions, and whether participants understand the bargain.'
        ]
      },
      {
        heading: 'Read past “you retain your IP”',
        paragraphs: [
          'Bria’s FIBO Hackathon provides a striking example. Its rules say entrants retain ownership, but also grant Bria a non-exclusive, worldwide, perpetual, royalty-free licence covering several uses of a submission. One of the listed purposes is “AI training or internal research.” The rules also waive further compensation for those permitted uses.',
          'That does not prove Bria actually fed every losing entry into a model. Permission is not evidence of practice. But the permission itself matters: continuing research value from submissions is contemplated explicitly by the contract.',
          'The 2026 GitLab AI Hackathon uses different language. Entrants retain ownership, while GitLab receives a broad licence over entrant-created submission material, suggestions, ideas, enhancement requests, feedback and recommendations. The rules say the sponsor may use the submission to “develop, market, and commercialize products and services.”',
          'Microsoft’s 2025 Fabric FabCon Global Hackathon used another broad formulation, granting a worldwide, perpetual, irrevocable, royalty-free licence for commercial or non-commercial uses, including marketing, sale or promotion of Microsoft products and services, with no additional compensation or credit beyond the contest terms.',
          'Not every hackathon does this. DigitalOcean’s Gradient AI Hackathon uses a much narrower structure centred on judging and specified promotional rights. That variation is exactly the point. “You retain your intellectual property” can be true while the sponsor also receives substantial rights. Ownership and licence are not the same question.'
        ]
      },
      {
        heading: 'AI makes the losing pile cheaper to understand',
        paragraphs: [
          'Before modern code models, the long tail of hackathon submissions had a natural defence: human attention. Somebody had to open the repositories, read the READMEs, inspect the code, understand the demos and separate the interesting failures from the merely broken ones.',
          'That does not scale pleasantly across hundreds of projects.',
          'Modern repository-aware AI can perform much of the first pass. It can summarise unfamiliar codebases, locate important components, explain architectures, identify recurring mechanisms and compare patterns across projects. Research on language models for mining software repositories describes exactly this broader shift toward machine-assisted analysis of large, heterogeneous code corpora.',
          'That means a sponsor could, in principle, ask a much larger field of questions: Which problems keep recurring? Which API limitations appear repeatedly? Which obscure project contains an elegant mechanism? Which workflows are developers independently inventing because the platform itself does not provide them?',
          'To be clear, I found no evidence that Bria, GitLab, Microsoft or any other named sponsor runs this exact pipeline over losing entries. The capability is real. The incentives are obvious. The specific practice is not established here.',
          'But that distinction does not weaken the argument. It sharpens it. AI has reduced the cost of turning a pile of external experiments into a map.'
        ]
      },
      {
        heading: 'The eighty-third best project may contain the best observation',
        paragraphs: [
          'Judging and innovation are not the same process. A project can lose because its demo crashes, its interface is ugly, its creator presents badly, it does not maximise the rubric, or it is simply unfinished.',
          'None of that tells you whether one idea inside it is commercially useful.',
          'The sponsor does not necessarily need to copy the project. It may only need to notice the observation. UK Intellectual Property Office guidance makes the underlying legal distinction important: copyright generally protects the expression of a work, not the bare idea behind it. Code, graphics and text can be protected. A general concept or workflow is not automatically fenced off merely because somebody demonstrated it first.',
          'That creates a wide territory between blatant copying and complete irrelevance. A losing project can teach a company what customers want without anybody lifting a line of source code.'
        ]
      },
      {
        heading: 'The real asymmetry is synthesis',
        paragraphs: [
          'The strongest commercial insight may not exist in any single submission.',
          'One participant discovers a good permissions mechanism. Another invents better onboarding. A third exposes a painful platform limitation. A fourth finds an unexpected market. A fifth solves the limitation with a clever architecture.',
          'Each entrant sees a small part of the field. The organiser can potentially see all of it. AI makes it progressively easier to connect those fragments.',
          'So the future argument may be less “did Company X steal Project Y?” and more: who captures the value when thousands of individually modest contributions can be combined into commercially useful knowledge?',
          'That problem does not require a villain. It can emerge naturally from the structure.'
        ]
      },
      {
        heading: 'A fairer hackathon does not need weaker innovation',
        paragraphs: [
          'The answer is not to stop sponsors learning. That would be both impossible and absurd. Public repositories are public. People remember ideas. Companies notice recurring needs. Sponsors also pay for infrastructure, APIs, staff, compute, prizes and administration, and participants receive genuine benefits: experience, access, deadlines, contacts, visibility and sometimes jobs or investment.',
          'The problem is bundling several different transactions into one button marked Submit.',
          'Judging rights can be automatic and narrow. Promotional rights can be clear and time-limited. If a sponsor also wants AI-training rights, internal-research rights or a broad commercial licence, those should be separate and conspicuous choices rather than luggage hidden inside the judging ticket.',
          'And if a non-winning submission later becomes valuable enough for a sponsor to adopt protected material from it commercially, there is an easy mechanism available: contact the entrant and make another deal. A licence, a grant, consulting work, an acquisition, or even a pre-declared adoption bounty would all be cleaner than assuming the later commercial value must be priced at zero.'
        ]
      },
      {
        heading: 'The Hackathon Rights Card',
        paragraphs: [
          'A useful standard could fit on one screen before submission: Ownership — who owns the work? Judging — what may judges inspect and for how long? Promotion — what may the organiser publish? Public repository — is one required, and under which licence? Internal research — yes, no or opt-in? AI training — yes, no or opt-in? Commercial reuse — automatic or separate agreement? Retention — how long is non-public material kept? Later adoption — will the entrant be notified or compensated?',
          'Call it the Hackathon Rights Card.',
          'It would not prevent broad licences. Some entrants may willingly accept them. It would simply make the exchange legible before somebody has spent a weekend building the thing.',
          'That transparency could even improve the events. Developers who trust the rules have less reason to keep their most interesting ideas away from the competition. A cleaner bargain may produce better submissions.'
        ]
      },
      {
        heading: 'Read the rules as if you are going to lose',
        paragraphs: [
          'Ignore the grand prize for a moment. Assume you finish ninety-fourth.',
          'Would you still publish the repository? Would you still reveal the mechanism? Would you be comfortable with internal research? AI training? A perpetual commercial-use licence? Would you be happy if the organiser learned something genuinely valuable from your work and you never heard about it again?',
          'If the answer is yes, enter. Hackathons can be tremendous fun and spectacularly productive.',
          'But enter with your eyes open.',
          'Because the most valuable thing a technology company receives from a hackathon may not be the winning project. It may be the map produced by everybody who tried.',
          'AI has made that map easier to read. The least we can do now is make the bargain just as readable.'
        ]
      }
    ],
    sources: [
      {
        label: 'Bria FIBO Hackathon — official rules',
        href: 'https://bria-ai.devpost.com/rules'
      },
      {
        label: 'GitLab AI Hackathon 2026 — official rules',
        href: 'https://gitlab.devpost.com/rules'
      },
      {
        label: 'Microsoft Fabric FabCon Global Hackathon 2025 — contest rules',
        href: 'https://github.com/microsoft/fabcon-global-hack-25/blob/main/CONTEST_RULES.md'
      },
      {
        label: 'DigitalOcean Gradient AI Hackathon — official rules',
        href: 'https://digitalocean.devpost.com/rules'
      },
      {
        label: 'Devpost — Public hackathons for organisations',
        href: 'https://info.devpost.com/product/public-hackathons'
      },
      {
        label: 'Wharton — Open Innovation Initiatives and Firm Outcomes',
        href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5150413'
      },
      {
        label: 'Creativity and Innovation Management — Value creation and capture in hackathons',
        href: 'https://onlinelibrary.wiley.com/doi/10.1111/caim.12552'
      },
      {
        label: 'GitHub Docs — Exploring a codebase with Copilot',
        href: 'https://docs.github.com/en/copilot/tutorials/explore-a-codebase'
      },
      {
        label: 'UK Intellectual Property Office — IP basics',
        href: 'https://www.gov.uk/government/publications/ip-basics/ip-basics'
      }
    ]
  },
  {
    slug: 'the-thinking-surface',
    kicker: 'ESSAY / HUMAN–AI COLLABORATION',
    title: 'The Thinking Surface',
    subtitle: 'A postmortem on first-generation AI and a manifesto for what comes next.',
    summary:
      'Generative AI proved that machines can produce. The more interesting problem now is how to build systems that remove dead cognitive labour without removing the human thinking, judgement and creative struggle that give work meaning.',
    byline: 'Matthew Watkins, with Lucy (ChatGPT)',
    publishedDate: '13 September 2026',
    readingTime: '18 min read',
    thesis:
      'AI should take away the work that prevents us from thinking, not the thinking that gives the work meaning.',
    intro: [
      'We are living through the first clumsy years of a new relationship.',
      'Artificial intelligence has become astonishingly capable, astonishingly quickly. It can write software, analyse information, generate images, search enormous bodies of material and complete useful work at a speed that would have sounded ridiculous only a few years ago.',
      'This is no longer a speculative technology. But capability has developed faster than our understanding of the relationship.',
      'The first great interface to generative AI was the prompt box. You ask for something. The machine disappears behind a curtain. A few seconds later the answer arrives.',
      'That is a technological miracle. It may also turn out to have been a conceptual mistake.'
    ],
    sections: [
      {
        heading: 'Output at any cost',
        paragraphs: [
          'The early generative-AI industry naturally optimised around the most spectacular demonstration: look what the machine can make. A picture. A song. An essay. A website. A program. A presentation. An answer.',
          'The shorter the distance between request and finished object, the more magical the demonstration appeared. That made sense. Capability had to be demonstrated before anyone would believe it.',
          'But somewhere along the way, we began confusing the reduction of friction with the reduction of human involvement. Those are not the same thing.',
          'If I ask an AI to sort 4,000 records, removing me from the process is probably excellent design. If I ask it to help me decide what I believe, removing me from the process is catastrophic design.',
          'The difference is not technical complexity. It is human value.'
        ]
      },
      {
        heading: 'Not all effort is waste',
        paragraphs: [
          'One of AI’s greatest promises is its ability to remove drudgery: searching, formatting, comparing, checking, translating, organising, transporting information, boilerplate coding, repetitive administration and thousands of other little taxes on human attention. Let the machine eat those.',
          'The mistake is assuming that because AI can remove effort, all effort is waste.',
          'Some effort is the work. Thinking through an idea changes the thinker. Playing with a musical phrase develops taste. Wrestling with a design problem reveals what we actually wanted. Writing forces vague feelings into language. Making choices develops judgement. Failing at something teaches us its shape.',
          'When an AI jumps immediately from intention to finished result, it can remove not merely labour but the process through which understanding, skill and ownership are formed.',
          'That is the problem we need to solve next.'
        ]
      },
      {
        heading: 'The warning signs are already visible',
        paragraphs: [
          'The evidence does not support the lazy slogan that AI simply makes people stupid. It suggests something more useful: the interaction design matters enormously.',
          'A 2025 Microsoft Research study of knowledge workers found that higher confidence in AI was associated with less critical-thinking effort, while confidence in one’s own abilities was associated with more. Critical thinking did not simply vanish; it shifted toward verification, integration and supervision.',
          'A much-publicised MIT Media Lab experiment found weaker neural connectivity, poorer recall and lower feelings of ownership among participants using an LLM for essay writing than among participants writing without one. The study was small, so grand claims about AI “rotting the brain” would outrun the evidence. But it raises exactly the right question: when the machine performs the cognitive act for us, what happens to our engagement with the act itself?',
          'Other research finds the other side of the bargain. Human–AI collaboration can improve immediate performance, expose people to ideas they would not otherwise have considered and help break cognitive fixation. Some experiments also find costs to intrinsic motivation, control and ownership when AI takes over too much of an interesting task.',
          'The useful conclusion is not AI good or AI bad. The architecture of the collaboration matters.'
        ]
      },
      {
        heading: 'The black box is the primitive form',
        paragraphs: [
          'The prompt box encourages us to think of AI as a vending machine for cognition: insert intention, receive artefact.',
          'Sometimes that is exactly what we need. But it is the least interesting relationship we can have with this technology.',
          'The richer possibility is AI as a thinking surface. A thinking surface does not merely answer. It reflects, challenges, combines, retrieves, reframes and extends. The human pushes something into it and receives something unexpected back. That response changes the next human thought, which changes the next machine response.',
          'The important unit is no longer the answer. It is the loop: human proposes, AI expands, human judges, AI responds, human redirects, AI searches, human rejects, AI recombines, human recognises something.',
          'Eventually something appears that neither side would have produced through the same route alone.'
        ]
      },
      {
        heading: 'Put AI inside the human’s loop',
        paragraphs: [
          '“Human in the loop” often implies an autonomous machine occasionally stopping for permission. Reverse it. The human owns the process. AI enters where it can extend perception, memory, exploration, execution or imagination.',
          'This is especially important in art, music, design, writing and invention. The aim should not be to build a more efficient machine for removing the artist from art.',
          'Good co-creative systems preserve control, alternatives, reversibility and ownership. They let the human keep this, push that, reject another path, return to an earlier state and understand how the work changed.',
          'A good musical collaborator does not simply play more notes. They listen. The same principle should apply to AI.'
        ]
      },
      {
        heading: 'A manifesto for reciprocal AI',
        paragraphs: [
          '1. Automate friction, not meaning. Give machines the clerical, repetitive and mechanical work that consumes attention without enriching the person doing it. Be much more cautious about automating the parts through which people develop judgement, identity, mastery or understanding.',
          '2. Keep intent visible. Human goals, constraints, taste and priorities should remain identifiable throughout the process. The machine’s output must not silently become the purpose of the system.',
          '3. Put AI inside the human’s loop. The human owns the process; AI enters where it can extend perception, memory, exploration, execution or imagination.',
          '4. Build for reciprocity. Good AI should bring out capabilities in the human that would otherwise remain inaccessible. Good human direction should, in turn, bring out capabilities in the AI that generic prompting would never reach.',
          '5. Be generative where ambiguity helps and deterministic where truth matters. Let AI interpret, explore, compare, imagine and propose. Use tests, evidence and explicit rules where correctness, permission or provenance matter.',
          '6. Expose uncertainty. Sources, assumptions, confidence, competing interpretations and reversibility should be treated as features rather than embarrassing plumbing.',
          '7. Preserve the path, not merely the destination. Creative and intellectual work develops through branches, discarded ideas, revisions and discoveries. Do not flatten all of that into a final output and throw the route away.',
          '8. Design against dependency. The best AI system should not require the human to become progressively less capable in order for the product to appear progressively more useful.',
          '9. Measure human outcomes. Faster output is useful but insufficient. Ask whether the person understood more, discovered more, retained ownership, made a better decision or avoided pointless labour.',
          '10. Know when to disappear. When software can reliably handle plumbing, let it disappear. When judgement, taste, uncertainty or invention matters, bring the human back into the centre.'
        ]
      },
      {
        heading: 'These ideas did not begin as a manifesto',
        paragraphs: [
          'They emerged from practical irritations.',
          'Threadmoth began one evening with a simple question from Matthew to an AI collaborator: out of everything we do together, what makes your life difficult? What problems keep getting in the way when we write code and build things? The answer led toward a deterministic structural tool. The principle that eventually emerged was simple: AI reasons; Threadmoth proves and cuts.',
          'Lantern Keeper came from another kind of friction. Once several AI tools became involved in a project, the human gradually became the network cable between them, manually transporting plans, decisions, reports and historical context. The desired outcome was never an omniscient AI memory. It was to let the human spend less time reconstructing history and more time thinking.',
          'Bunny Deluxe emerged from a musician’s frustration with digital drummers. The problem was not that drum software could not make beats. It could. The problem was that it did not really play with you. So the principles became “listen first, play second” and “blind drummer with good habits”: listen for the pulse, wait, enter conservatively, respond at musical boundaries and behave more like a bandmate than a backing track.',
          'Pochade, whether or not it is ever built, asks the equivalent question about visual art. What happens if generative AI stops being a slot machine for finished pictures and becomes an environment in which a person can explore? Keep this part. Change that. Branch here. Return there. Combine these. Preserve the gesture. Show me something I would not have imagined. Let me judge it. Now push further.',
          'These projects look superficially different because one deals with code, another with memory, another with music and another with visual creation. Underneath, they keep asking the same question: how can we redesign the relationship so that the human and the AI bring out something better in one another?'
        ]
      },
      {
        heading: 'Post-programming',
        paragraphs: [
          'Software development itself is beginning to expose the same shift.',
          'Traditional programming places code at the centre of the craft. But when machines can produce increasing quantities of implementation, another layer becomes more important: deciding what should exist, specifying behaviour, identifying failure modes, establishing constraints, evaluating results, orchestrating tools and recognising when the implementation has betrayed the intention.',
          'This is not the death of programming. Good programmers remain enormously valuable. It is an expansion of the field. Some builders will work primarily in implementation. Others will work increasingly in systems, direction, evaluation and intent.',
          'The distinction can be expressed simply: the programmer’s primary material is code. The post-programmer’s primary material is intent.',
          'That is not a hierarchy. It is a different layer of the work.'
        ]
      },
      {
        heading: 'AI should not make humanity smaller',
        paragraphs: [
          'The worst possible future for artificial intelligence would not necessarily be one in which machines become spectacularly hostile. A quieter failure is imaginable.',
          'We could build extraordinarily capable systems and use them mostly to eliminate the need to wonder, practise, remember, discover, argue, learn, improvise and make. Everything becomes easier. And something becomes smaller.',
          'That future is not inevitable. The same technology can remove pointless cognitive labour while giving people access to larger intellectual and creative spaces than they could navigate alone.',
          'It can help a musician without a drummer experience something closer to a band. It can allow someone with an idea but limited conventional programming ability to build serious software. It can help an artist explore fifty directions without surrendering authorship. It can become a thinking surface upon which half-formed ideas acquire enough resistance to become real ones.',
          'The distinction is not whether AI performs work. The distinction is what happens to the human while it does.',
          'The first era of generative AI proved that machines could generate. The next should discover how they can collaborate.',
          'AI should not make humanity unnecessary. It should make unnecessary things consume less of humanity.',
          'And where the work matters, where there is art, invention, judgement, curiosity, meaning or play, the machine should not close the black box and announce that it has finished. It should open another door.'
        ]
      }
    ],
    sources: [
      {
        label: 'Stanford HAI — 2026 AI Index Report',
        href: 'https://hai.stanford.edu/ai-index/2026-ai-index-report'
      },
      {
        label: 'Microsoft Research — The Impact of Generative AI on Critical Thinking',
        href: 'https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/'
      },
      {
        label: 'MIT Media Lab — Your Brain on ChatGPT',
        href: 'https://www.media.mit.edu/publications/your-brain-on-chatgpt/'
      },
      {
        label: 'Scientific Reports — Human–AI collaboration and motivation',
        href: 'https://www.nature.com/articles/s41598-025-98385-2'
      },
      {
        label: 'Frontiers in Computer Science — Human–AI collaborative design',
        href: 'https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2025.1672735/full'
      },
      {
        label: 'UK Government — DSIT Public Engagement Survey 2025/26',
        href: 'https://www.gov.uk/government/statistics/dsit-public-engagement-survey-20252026/dsit-public-engagement-survey-20252026'
      },
      {
        label: 'Pew Research Center — Americans and AI 2026',
        href: 'https://www.pewresearch.org/internet/2026/06/17/americans-and-ai-2026-chatbots-smart-devices-and-views-on-impact/'
      }
    ]
  }
];
