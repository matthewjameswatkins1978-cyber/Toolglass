import { articles as legacyArticles } from './articles';
import type { Article, ArticleSection } from './articles';

export type MagazineArticleSection = Omit<ArticleSection, 'pullQuote'> & {
  pullQuote?: string | { quote: string; attribution: string };
};

export type MagazineArticle = Omit<Article, 'sections'> & {
  sections: MagazineArticleSection[];
};

export const anvilArticle: MagazineArticle = {
  slug: 'the-anvil-ai-native-computer',
  kicker: 'FEATURE / AI-NATIVE COMPUTING',
  title: "The Anvil: What If AI Didn't Have to Use Computers the Way We Do?",
  subtitle:
    'We keep teaching AI to operate terminals, files and commands invented for humans. Anvil asks what happens if we build the smallest possible computer around the AI instead.',
  summary:
    'Anvil is a one-kilobyte experimental machine with no shell, files or escape hatch. The aim is to discover whether an AI can work more reliably when the machine exposes exact capabilities, executes transactionally and returns measured evidence instead of human-oriented computer folklore.',
  byline: 'Matthew Watkins, with Lucy (ChatGPT)',
  publishedDate: '4 October 2026',
  readingTime: '13 min read',
  thesis:
    'The interesting future may not be an AI that becomes ever better at pretending to be a human terminal user. It may be software that tells an intelligent operator exactly what it can do, enforces the boundaries itself and returns evidence precise enough that the AI never has to guess what happened.',
  notes: [
    ['Type', 'Concept feature'],
    ['Published', '4 October 2026'],
    ['Byline', 'Matthew Watkins, with Lucy (ChatGPT)'],
    ['Reading time', '13 min read'],
    ['Universe', '1,024 bytes'],
    ['Rule', 'Bring bats'],
  ],
  intro: [
    'Imagine hiring the most capable engineer in the world and insisting that they work through a 1970s teletype.',
    'They can think at enormous speed, but every action must be translated into little lines of text. Type this command. Open this file. Change these characters. Run this program. Read the error message. Try again.',
    'That is, broadly speaking, how we make modern AI systems use computers.',
    'The AI may be capable of reasoning about architecture, mathematics, electronics or music, yet when it wants the machine to do something we often reduce the interaction to a ritual: write text, invoke a shell, receive more text, infer what happened.',
    'The remarkable thing is that this works. Coding agents can operate terminals, edit files, use Git, install packages and repair their own mistakes. But that success hides a stranger question.',
    'Why are we making artificial intelligence use an interface designed around human fingers, human eyes and human habits?',
    'What would a computer look like if the AI were treated as a first-class operator from the beginning? That question produced the Anvil.'
  ],
  sections: [
    {
      heading: 'Act I: the computer inside the computer',
      paragraphs: [
        'Anvil-0 is deliberately unimpressive. It is not an operating system, not a new laptop and not an AI supercomputer. It is a tiny imaginary machine living inside an ordinary computer, and its entire memory is 1,024 bytes.',
        'For comparison, a photograph from a phone may contain several million bytes. The whole Anvil universe is smaller than a microscopic corner of one photo.',
        'There is no filesystem. No browser. No terminal. No Git. No package manager. No convenient emergency exit through which the AI can suddenly become a remote developer again.',
        'Instead it receives a tiny set of exact operations: read a byte, propose a byte write, bind a temporary value, choose a branch, assert a condition, perform simple arithmetic. The language is closer to a small box of Lego bricks than a conventional programming environment.',
        'The point is not to replace Python with thirteen funny words. The point is to build a world small enough that almost nothing important has to be guessed.'
      ],
      pullQuote:
        'Text should not be the compulsory machine-control substrate simply because humans once needed teletypes.'
    },
    {
      heading: 'The cathedral before the brick',
      paragraphs: [
        'The first version of the idea immediately became enormous. We imagined formal mathematical proofs, native compilation, capability-based memory, several cooperating models, persistent causal memory and software able to replace parts of itself while running.',
        'In other words, we nearly built the cathedral before testing the brick.',
        'So the question was cut down to something that could actually fail in an informative way: can an AI propose an operation, have a deterministic machine verify and execute it, receive exact evidence about what happened, repair its proposal and continue without a human translating the result in the middle?',
        'If that loop cannot work in one kilobyte, throwing a GPU cluster and a theorem prover at it will merely give the failure better furniture.'
      ]
    },
    {
      heading: 'The first Anvil cracked',
      paragraphs: [
        'The first serious example was a circular buffer. The machine was supposed to write a value at the current position, move that position forward by one, wrap back to zero after position fifteen and return the new position.',
        'The proposed expression looked convincing. It was also wrong.',
        'We had written the language as though a flat list of expressions were a sequence of commands. The interpreter performed the first binding, returned its result and quietly ignored the rest.',
        'This was better than a clean test pass because it exposed the real problem: we had not defined what the language meant. We had written something that looked plausible and allowed the implementation to fill in the missing philosophy.',
        'The fix was not “repair the loop”. The fix was to decide that binding meant the familiar idea “let x equal this expression inside that body”. Once that decision was explicit, the program became a real expression rather than an accidental script.',
        'That became the first law of Anvil: implementation convenience does not get to write the constitution.'
      ]
    },
    {
      heading: 'Act II: bring in the Terror Bats',
      paragraphs: [
        'Fortunately, we already had a project designed for exactly this kind of trouble. Terror Bats is a testing framework built around an unfriendly question: what could still be wrong while all the normal tests are green?',
        'Anvil was a perfect victim. If memory addresses are supposed to start at zero, try minus one. Python normally treats -1 as a perfectly useful way to refer to the last item in a list. Anvil must treat it as an illegal address.',
        'Then the bats found the more important problem. What happens if an operation makes a valid memory write and then fails later? If the write has already touched real memory, failure leaves the machine half changed.',
        'So writes stopped being immediate writes. They became proposals recorded in a temporary journal. The running expression can see those proposed values, but the real arena stays untouched until the entire operation succeeds.',
        'If everything completes, the journal is committed. If anything traps, the journal is thrown away and the original arena must remain bit-for-bit identical.',
        'That changes the relationship between the AI and the machine. The AI is allowed to speculate. The deterministic system owns the consequential state transition.'
      ]
    },
    {
      heading: 'When Python tried to become God',
      paragraphs: [
        'The next failures were subtler because they were not obvious bugs. They were assumptions inherited from the language used to build the first Anvil.',
        'Python, for example, treats booleans as a specialised kind of integer. In ordinary Python, True and 1 have a relationship Anvil did not want. Anvil says Bool and I64 are different kinds of value, so comparing them as though they were interchangeable must fail.',
        'Modulo arithmetic produced another trap. Python and Rust do not use the same ordinary remainder behaviour for every negative input. If we had ported the runtime before deciding what modulo meant, a future differential tester would have spent its time accusing one language of a crime the specification had never defined.',
        'Then came Python integers, which can grow far beyond signed 64-bit range, and Python hash values, which are not a suitable stable cryptographic fingerprint for machine state.',
        'One by one the host language was politely removed from the constitution. Anvil integers became explicitly signed 64-bit. Overflow became a trap. Modulo received explicit Euclidean semantics. Arena fingerprints became SHA-256 over the actual bytes.'
      ],
      pullQuote:
        'The implementation is a witness to the semantics. It does not own them.'
    },
    {
      heading: 'From toy interpreter to tiny language',
      paragraphs: [
        'That cleanup forced Anvil to mature. It gained a written semantic constitution independent of Python or any future Rust implementation.',
        'It also gained two distinct phases. First, the whole expression tree is checked. Does every operation exist? Does it have the right number of inputs? Are literal values legal? Are names bound? Do types line up? Only after the whole structure is valid does execution begin.',
        'That matters for branches. “If true, return 42, otherwise divide by zero” is a valid program because the bad arithmetic never executes. “If true, return 42, otherwise perform BANANA_FISH_WIBBLE” is not a valid program because the unused branch is still grammatically nonsense.',
        'The type system is intentionally tiny: whole signed 64-bit numbers and booleans. A byte write must receive an integer between zero and 255. A memory address must be an integer inside the arena. A boolean address is not “out of bounds”; it is the wrong type. An address of -1 is the correct type but the wrong range.',
        'That level of pedantry is useful because errors are part of the control surface. If the machine already knows exactly what went wrong, making the AI infer it from a vague message is wasted intelligence.'
      ]
    },
    {
      heading: 'The receipt must not lie',
      paragraphs: [
        'After every operation Anvil returns a receipt: success or failure, the result, the writes attempted, the net state change and cryptographic fingerprints of memory before and after.',
        'One early version made a revealing mistake. On failure it simply copied the “before” fingerprint into the “after” field because rollback was supposed to guarantee equality.',
        'Logically neat. Epistemically rotten.',
        'The receipt was describing what should have happened rather than measuring what did happen. A future rollback bug could mutate memory and still receive a certificate claiming nothing changed.',
        'So trapped execution now measures the arena again. If the two hashes match, rollback is evidence rather than narration.',
        'The same distinction appears elsewhere. Three writes to the same byte form an execution history, but they may produce only one net state change. Anvil therefore keeps both the causal trace and the final delta: what happened, and what changed.'
      ]
    },
    {
      heading: 'The machine teaches the AI',
      paragraphs: [
        'Then we found a wonderfully small bootstrap problem. The experiment was supposed to give the AI no conventional manual. It would interact only with the machine. But if nobody tells the model how to ask what the machine can do, the very first instruction is already a hidden manual.',
        'The answer is that Anvil speaks first.',
        'When a model connects, the machine sends a structured manifest describing its memory size, value types, legal operations, argument shapes, limits, transaction rules and a couple of calibration examples.',
        'The AI does not need to memorise a ritual such as “run this command with these flags”. The environment exposes its affordances directly.',
        'This connects to a broader principle we have been developing elsewhere: self-teach over rule-teach. Rules still belong in human intent, policy, authority and genuine invariants. But deterministic procedure should, where practical, be taught or enforced by the tool itself.'
      ],
      pullQuote:
        'Never make an intelligence repeatedly infer something the system can cheaply know, state, enforce or prove.'
    },
    {
      heading: 'Act III: uncage one model',
      paragraphs: [
        'Only after all that do we perform the experiment that originally sounded like Step One.',
        'Connect one AI model. Not an agent swarm. Not six synthetic job titles arguing in a dashboard. One model.',
        'It receives the Anvil manifest and nothing resembling a normal development environment. No terminal. No files. No browser. No Git. Its only external reality is this tiny deterministic machine.',
        'Then give it increasingly difficult tasks. Store the number 42. Write a value and read it back. Build a counter. Maintain a sixteen-position circular buffer. Copy a region without destroying source data. Construct small state machines.',
        'And measure what happens. How many attempts does it need? Which mistakes repeat? Does exact structured failure help it repair itself faster than human-style error prose? Does it discover useful computational patterns without being handed conventional programming recipes?',
        'The real question is not whether the model can write a byte. It is how much computational behaviour an intelligence can discover when its only interface to reality is a machine that refuses to make it guess what happened.'
      ]
    },
    {
      heading: 'The real Big Bang',
      paragraphs: [
        'The original joke was that ignition occurred when an AI changed its first byte. That is too romantic. Writing a byte is easy.',
        'The interesting moment is the first closed loop: the AI proposes an operation; the machine checks it; execution happens transactionally; measured evidence comes back; the AI changes its next proposal; nobody has to read a compiler log in the middle.',
        'The intelligence proposes. The deterministic system establishes truth. The intelligence adapts.',
        'If that loop works repeatedly, then we have something worth expanding.'
      ]
    },
    {
      heading: 'If it survives',
      paragraphs: [
        'The next step would not be a bigger manifesto. It would be a second independent implementation, probably in Rust.',
        'Python would not become the oracle. The Constitution would. Python would be Witness One, Rust Witness Two, and Terror Bats would fire the same legal and illegal programs at both until disagreements exposed either implementation bugs or holes in the written semantics.',
        'Only after that would the larger architecture be allowed back in: genuine capability-scoped memory, formal proof where ordinary checks stop being sufficient, native compilation when interpretation becomes a measured bottleneck, richer causal memory and perhaps different models operating at different scales.',
        'Those are no longer promises on a roadmap. They are hypotheses waiting behind locked doors. Complexity has to earn the key.'
      ]
    },
    {
      heading: 'Hit it again',
      paragraphs: [
        'Anvil may eventually prove that an existing technology such as WebAssembly already contains most of the right answer. It may show that ordinary source code is a better model interface than expected. It may fail because language models rely too heavily on the enormous prior they already have about human programming languages.',
        'Good. Those are results.',
        'The point is not to protect Anvil from being wrong. The point is to make the question testable.',
        'Every confident claim should become something a bat can attack. Transactions are atomic? Hit them. Types cannot leak? Hit them. Python and Rust agree? Hit both. The AI can learn the machine without a manual? Take the manual away.',
        'An anvil is not proven by looking solid. It is proven by what happens when the hammer comes down.',
        'And if the face dents, excellent. Now we know where to swing next.'
      ]
    }
  ],
  sources: [
    {
      label: 'Python documentation — Boolean type (bool)',
      href: 'https://docs.python.org/3/library/stdtypes.html#boolean-type-bool',
    },
    {
      label: 'Python language reference — binary arithmetic operations',
      href: 'https://docs.python.org/3/reference/expressions.html#binary-arithmetic-operations',
    },
    {
      label: 'Python documentation — json module',
      href: 'https://docs.python.org/3/library/json.html',
    },
    {
      label: 'Rust standard library — i64::rem_euclid',
      href: 'https://doc.rust-lang.org/std/primitive.i64.html#method.rem_euclid',
    },
    {
      label: 'WebAssembly — high-level goals',
      href: 'https://webassembly.org/docs/high-level-goals/',
    },
    {
      label: 'Terror Bats — project repository',
      href: 'https://github.com/matthewjameswatkins1978-cyber/The-Terror-Bats',
    },
  ],
};

export const articles: MagazineArticle[] = [
  anvilArticle,
  ...(legacyArticles as MagazineArticle[]),
];
