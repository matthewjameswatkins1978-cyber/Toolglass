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
  sources: { label: string; href: string }[];
};

export const articles: Article[] = [
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
