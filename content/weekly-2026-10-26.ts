import type { Article } from './articles';

export const weeklyArticles: Article[] = [
  {
    slug: 'the-smaller-square-that-wasnt',
    kicker: 'FEATURE / MEMORY ARCHITECTURE',
    title: "The Smaller Square That Wasn't",
    subtitle:
      'A chipmaker spent twenty years studying a more compact memory cell. Then it decided the square was not the problem. A story about capacitors, manufacturing, and the dangerous elegance of an equation.',
    summary:
      'Micron has decided not to pursue 4F² DRAM, arguing that capacitor pitch, complexity and cost matter more than nominal transistor-cell area. The decision is a useful lesson in the distance between an elegant geometry and a manufacturable memory device.',
    byline: 'Toolglass Editorial Desk',
    publishedDate: '26 October 2026',
    readingTime: '14 min read',
    thesis:
      'The 4F² label describes nominal transistor-cell geometry; capacitor pitch, fabrication cost and a credible scaling path determine useful memory density.',
    intro: [
      'The most interesting thing in a technology roadmap is not always the invention. Sometimes it is the invention with a line through it.',
      'On 21 October 2026, Micron presented its plans for the future of computer memory. There were familiar promises of greater density, new manufacturing processes and ever more intimate arrangements between memory and processors. But tucked into the discussion was a refusal. Micron would continue developing its established 6F² DRAM cells and investigate three-dimensional DRAM. It would not pursue 4F² as its next production architecture, citing extra complexity and cost. The company had studied the smaller cell for roughly two decades. ¹²',
      "To someone who has never had to persuade billions of microscopic capacitors to behave, this sounds peculiar. The names are little bits of geometry. A 4F² cell occupies, in the idealised layout, four squares of a minimum feature dimension; a 6F² cell occupies six. Four is smaller than six. That is not a controversial proposition. If memory is sold by the bit, why wouldn't a chipmaker choose the smaller square?",
      "Because a memory cell is not a drawing of a transistor. It is a physical promise that a vanishingly small electrical charge can survive long enough to be read correctly, be refreshed, and be manufactured again and again across an entire wafer. The transistor's footprint is only one clause in that promise.",
      'This is a story about the distance between mathematical area and useful memory. It also happens to be a useful antidote to the way technology news often treats a research result as an inevitable product roadmap.',
    ],
    sections: [
      {
        heading: 'The leaky bucket that replaced the iron doughnut',
        blocks: [
          {
            type: 'paragraph',
            text: 'Before there was a race to shrink capacitors, computer memory could look rather like a miniature weaving project. Magnetic-core memory stored bits in tiny ferrite rings threaded by wires. A computer with enough memory needed a great many rings, and each one took space, materials and careful assembly. The technique was ingenious and increasingly difficult to scale.',
          },
          {
            type: 'paragraph',
            text: "In the mid-1960s, IBM engineer Robert Dennard was working on semiconductor alternatives. His team's approach used six transistors to store one bit. Dennard's insight, conceived in 1966 and patented in 1968, was to store information as charge on a capacitor, with a transistor acting as the gate through which the charge could be written or read. The capacitor leaks. It must periodically be replenished. This is why the memory is called dynamic. ³",
          },
          {
            type: 'paragraph',
            text: 'A DRAM bit is not a tiny permanent inscription. It is a tiny electrical state kept alive by maintenance.',
          },
          {
            type: 'paragraph',
            text: "The first commercially consequential DRAM chips were not simply Dennard's patent manufactured verbatim. Intel's 1103, introduced in October 1970, used a three-transistor design, and its early manufacturing yields were difficult. Yet the 1-kilobit 1103 helped establish semiconductor memory as a practical alternative to magnetic core. Intel says it was the world's best-selling semiconductor device by the end of 1971. ⁴",
          },
          {
            type: 'paragraph',
            text: 'That distinction matters. A brilliant cell principle is one thing; a chip that a factory can reliably produce and a customer can buy is another. The argument has not changed much in fifty-six years.',
          },
          {
            type: 'paragraph',
            text: 'In a modern conventional DRAM array, a bit is generally described by the one-transistor, one-capacitor shorthand, 1T1C. Word lines select rows. Bit lines carry tiny electrical differences to sense amplifiers. A read can disturb the stored charge, so sensing and restoring are part of the choreography. Refresh happens repeatedly because physics is under no obligation to remember a number for us.',
          },
          {
            type: 'paragraph',
            text: "The arrangement has become staggeringly compact. Micron's October presentation says its bits per DRAM wafer have increased more than 400-fold between 1995 and 2026. That is a company-reported figure, but the historical direction is not in doubt. The machine that once needed racks of magnetic rings now keeps billions of volatile bits in chips that can fit in a hand. ²",
          },
        ],
        paragraphs: [],
      },
      {
        heading: 'Four squares, six squares, and one missing question',
        blocks: [
          {
            type: 'paragraph',
            text: 'The letter F in 4F² or 6F² is a layout yardstick: a minimum lithographic feature dimension for the technology under discussion. The superscript tells us we are talking about area. If the same F is used, the nominal cell areas are 4F² and 6F². The first is one-third smaller than the second.',
          },
          {
            type: 'paragraph',
            text: 'It is tempting to turn that directly into a density headline: one-third less area, therefore half again as many bits. In an ideal tiled array with no other constraints, that is the arithmetic. But real DRAM is not a sheet of empty squares. It is a three-dimensional electrical and manufacturing system with contacts, isolation, peripheral circuitry, error margins, heat and a component that refuses to vanish: the capacitor.',
          },
          {
            type: 'paragraph',
            text: 'A capacitor must store enough charge to be distinguished from noise when it is read. As cells shrink, engineers can make capacitors taller, narrower, deeper, or more elaborate. They can change materials and the arrangement of electrodes. Every solution has trade-offs in leakage, coupling, mechanical stability, process steps and yield. What matters is not simply how little silicon a transistor claims on paper, but how closely the entire working cell can be packed without losing the electrical signal or the ability to manufacture it economically.',
          },
          {
            type: 'paragraph',
            text: 'Imagine designing a car park where the painted parking bays become one-third narrower. Your plan shows a marvellous gain in capacity. Then the cars arrive. Their doors, turning circles and safe clearances have not shrunk by the same amount. You have not discovered a new car park; you have discovered a disagreement between a diagram and a vehicle.',
          },
          {
            type: 'paragraph',
            text: "For DRAM, the capacitor pitch is one of those inconvenient clearances. Micron's argument is that this pitch, rather than the attractive number attached to the transistor-cell layout, governs practical bit density at the advanced nodes it is targeting. The company's leadership also points to the complexity and cost of making 4F² work. ¹⁵",
          },
          {
            type: 'pullquote',
            text: 'A smaller transistor footprint is not automatically a smaller working memory cell.',
            attribution: 'TOOLGLASS / EDITORIAL EXTRACT 01',
          },
          {
            type: 'paragraph',
            text: 'This is not a claim that 4F² cannot be built. In fact, the distinction between possible and worth manufacturing is the centre of the story.',
          },
        ],
        paragraphs: [],
      },
      {
        heading: 'The alternative is not imaginary',
        blocks: [
          {
            type: 'paragraph',
            text: 'At the 2025 Symposium on VLSI Technology and Circuits, researchers reported integration of a 4F² DRAM array using a vertical-gate cell transistor and a peri-under-cell architecture. The paper describes wafer bonding and electrical connections between a cell wafer and a peripheral-circuit wafer. It is a real technical demonstration, published in the IEEE record, not merely a pretty road-map rectangle. ⁶',
          },
          {
            type: 'paragraph',
            text: "That work does not prove that the design will beat 6F² on the measures that decide a commercial memory product: good bits per wafer, cost, yield, speed, retention, power, and the ease of scaling the next generation. Nor does Micron's decision prove that the rival architecture is a dead end for everybody. Other manufacturers may choose different structures, processes, customer needs or economic assumptions. An integration demonstration, a pilot production line and a mass-market memory chip are three different achievements.",
          },
          {
            type: 'paragraph',
            text: 'This is why we should be suspicious of the phrase the industry has decided. One company has made a consequential choice and explained its reasoning. Competitors are still exploring other choices. The experiment is not over; the cost of running it is simply enormous.',
          },
          {
            type: 'paragraph',
            text: 'There is another complication. The label 4F² can refer to a particular cell footprint without uniquely specifying every detail of the vertical transistor, storage capacitor, contact geometry and peripheral circuits. Two chips with the same nominal cell-area notation can behave very differently in fabrication. The shorthand is useful, but it is not the entire circuit diagram.',
          },
        ],
        paragraphs: [],
      },
      {
        heading: 'The October decision',
        blocks: [
          {
            type: 'paragraph',
            text: "Micron's 21 October technology presentation places the decision on a slide about continuous DRAM scaling. The message is unusually direct: the company is extending 6F² and developing 3D DRAM, and is not pursuing 4F² because of increased complexity and cost. ²",
          },
          {
            type: 'paragraph',
            text: 'The same presentation sketches a sequence of future processes. Its 1γ generation is already in high-volume manufacture; 1δ is planned to ramp in the second half of 2027 and is expected, by Micron, to improve bit density by a percentage in the mid-twenties over the preceding generation. Later nodes include more development and pathfinding work. Those are road-map targets, not a record of future chips already delivered. ²',
          },
          {
            type: 'paragraph',
            text: 'The company also talks about new ways of bonding wafers, using advanced lithography and materials, and arranging memory closer to computation. These are not all the same technical trick. Some make cells smaller in the plane. Some change how memory and logic are packaged. Some point towards stacking cells in the third dimension.',
          },
          {
            type: 'paragraph',
            text: 'Why is that third dimension so tempting? Because if the floor is crowded, perhaps the next bit belongs upstairs.',
          },
        ],
        paragraphs: [],
      },
      {
        heading: 'Three different meanings of stacking',
        blocks: [
          {
            type: 'paragraph',
            text: 'Memory marketing can make several distinct architectures sound like the same tower. It is worth separating them.',
          },
          {
            type: 'paragraph',
            text: '3D NAND already stores flash-memory cells in many vertical layers. It is non-volatile storage with different devices, access patterns and constraints from DRAM. The success of stacked flash does not mean DRAM can be copied into the same structure by changing the label on a drawing.',
          },
          {
            type: 'paragraph',
            text: 'High-bandwidth memory, or HBM, stacks memory dies and connects them with dense vertical interconnects. It brings enormous bandwidth close to processors, and it is important to modern accelerators. But stacking finished DRAM dies is not the same as building a truly three-dimensional array of DRAM cells within a new cell architecture.',
          },
          {
            type: 'paragraph',
            text: '3D DRAM aims to change the cell array itself so that density can grow vertically rather than relying entirely on ever smaller planar dimensions. It raises its own questions: how to make and isolate the cells, how to read and refresh them, where to put the peripheral circuits, how to control defects and temperature, and whether the extra manufacturing steps improve cost per working bit. Micron says it is researching this direction, but has not committed to a commercial launch date. ²⁵',
          },
          {
            type: 'paragraph',
            text: "These distinctions are not pedantry. They separate a technology that ships in today's machines from a research direction that might determine what tomorrow's machines can afford to remember.",
          },
          {
            type: 'paragraph',
            text: 'The October slides also discuss a proposed vertical HBM arrangement, with memory stacked on top of compute, rather than merely alongside it. That is another approach to the movement problem, the time and energy spent carrying data between a processor and the memory holding its working state. It is not interchangeable with 3D DRAM cell scaling. ²',
          },
        ],
        paragraphs: [],
      },
      {
        heading: 'The memory wall is not made of bricks',
        blocks: [
          {
            type: 'paragraph',
            text: 'For decades, processors have become capable of performing operations faster than systems can supply all the data they need. This is the broad family of problems called the memory wall. Caches, prefetching, wider buses, faster DRAM, HBM, new packaging and clever algorithms are all attempts to get useful work done without waiting on the next byte.',
          },
          {
            type: 'paragraph',
            text: 'The problem is particularly visible in large AI systems, where models may need vast amounts of memory capacity and bandwidth. But it is not an AI-only story. Games, scientific simulations, databases and ordinary software all inhabit the same physical world of memory latency, bandwidth, power and price.',
          },
          {
            type: 'paragraph',
            text: "The significance of Micron's decision is therefore not that a consumer should suddenly prefer one RAM module over another. There is no new 4F²-versus-6F² choice at the shop counter. It is that the cost and density of memory, years from now, depend on decisions that look embarrassingly small when written as algebra.",
          },
          {
            type: 'paragraph',
            text: 'A percentage point of usable density at enormous manufacturing scale can matter more than a dramatic-sounding process name. And a theoretically smaller cell that adds too many steps, produces too few good dies or cannot be scaled economically may be a poorer bargain than a larger one with a reliable path forward.',
          },
          {
            type: 'pullquote',
            text: 'A road map is also a record of the inventions a company has decided not to build.',
            attribution: 'TOOLGLASS / EDITORIAL EXTRACT 02',
          },
        ],
        paragraphs: [],
      },
      {
        heading: 'The useful disappointment',
        blocks: [
          {
            type: 'paragraph',
            text: 'There is a particular kind of engineering intelligence in abandoning an elegant idea after years of work. It is less photogenic than a prototype. There is no obvious hero image of a technology not being manufactured. It does, however, require an unusually serious understanding of the problem.',
          },
          {
            type: 'paragraph',
            text: 'The 4F² cell is an attractive proposition. Its mathematics is not wrong. A smaller ideal footprint is a smaller ideal footprint. What Micron has argued is that, at the frontier it cares about, this number no longer describes the constraint that matters most. A capacitor, a factory and an accountant have entered the conversation, and none of them is impressed by the elegance of four squares.',
          },
          {
            type: 'paragraph',
            text: "Perhaps a rival will find a better way to build 4F². Perhaps 3D DRAM will arrive later, or prove more difficult than expected. The future remains contested. We should not convert one company's road map into a law of physics.",
          },
          {
            type: 'paragraph',
            text: 'But there is a valuable lesson already. Computing history is full of ideas that were theoretically superior, technically possible, and commercially awkward. It is also full of supposedly exhausted technologies that survived because engineers found one more inventive way to use them.',
          },
          {
            type: 'paragraph',
            text: 'A memory cell is not just the place where a bit sits. It is the agreement between charge, time, noise, geometry and manufacturing that allows the bit to exist at all. Sometimes the most advanced move is to stop shrinking the wrong part.',
          },
        ],
        paragraphs: [],
      },
    ],
    heroImage: {
      src: '/art/the-square-that-wasnt.webp',
      alt: 'Concept plate compares nominal 6F² and 4F² DRAM cell bays beneath capacitor shapes that still need physical clearance; a small staircase suggests a possible vertical direction.',
      caption:
        'The nominal cell footprint is only one part of a working memory device. Concept plate; not to scale.',
      kind: 'TOOLGLASS CONCEPT PLATE',
      width: 1536,
      height: 1024,
    },
    notes: [
      ['Type', 'FEATURE'],
      ['Evidence', 'DESK-RESEARCHED / NO LAB TEST'],
      ['Published', '26 October 2026'],
      ['Byline', 'Toolglass Editorial Desk'],
      ['Reading time', '14 min read'],
    ],
    toolboxHeading: 'the small vocabulary of very small memory',
    toolbox: [
      {
        term: 'DRAM',
        description:
          'Volatile memory that stores information as charge and must periodically refresh it.',
      },
      {
        term: '1T1C',
        description:
          'One transistor and one capacitor per bit, a common modern DRAM-cell model.',
      },
      {
        term: 'F²',
        description:
          "An idealised area measure derived from a technology's minimum feature dimension; not a complete density or cost metric.",
      },
      {
        term: 'Pitch',
        description:
          'Centre-to-centre spacing between repeating structures, such as capacitors.',
      },
      {
        term: 'Sense amplifier',
        description:
          'Circuit that detects and restores a tiny signal from a DRAM cell.',
      },
      {
        term: 'Yield',
        description:
          'The share of manufactured devices that work within specification.',
      },
      {
        term: 'HBM',
        description:
          'High-bandwidth memory using stacked dies and dense connections.',
      },
      {
        term: '3D DRAM',
        description:
          'A research direction for vertically arranged DRAM cells, distinct from conventional HBM packaging and 3D NAND flash.',
      },
    ],
    sourcesHeading: 'Read more / source desk',
    sourcesIntro:
      'Sources are linked for the claims and chronology above. Forward-looking corporate plans and maintainer descriptions are attributed; Toolglass did not conduct laboratory measurements or software tests.',
    sources: [
      {
        label:
          "01 / Micron's 19 October announcement of the 21 October technology webinar",
        href: 'https://www.globenewswire.com/news-release/2026/10/19/3383394/14450/en/index.html',
      },
      {
        label:
          '02 / Micron technology presentation, 21 October 2026, 33-slide mirror',
        href: 'https://6ix.com/deck/00znsgtd/micron-technology-technical-presentation-october-2026',
      },
      {
        label: "03 / IBM's history of dynamic random-access memory",
        href: 'https://www.ibm.com/history/dram',
      },
      {
        label: "04 / Intel's 1103 history",
        href: 'https://timeline.intel.com/1970/the-intel-1103-dram',
      },
      {
        label: "05 / Anton Shilov, Tom's Hardware, 22 October 2026",
        href: 'https://www.tomshardware.com/pc-components/dram/micron-pulls-the-plug-on-future-4f2-dram-after-two-decades-of-research-in-dramatic-shift-company-says-architecture-offers-no-meaningful-density-advantages-increases-manufacturing-complexity-and-costs-and-has-fundamental-scaling-limitations',
      },
      {
        label:
          '06 / 2025 Symposium on VLSI Technology and Circuits: 4F² DRAM with vertical gate and peri-under-cell architecture',
        href: 'https://doi.org/10.23919/VLSITechnologyandCir65189.2025.11075066',
      },
    ],
    relatedReading: [
      {
        title: 'Judy Malloy and the Novel With No Front Door',
        href: '/articles/judy-malloy-and-the-novel-with-no-front-door/',
        description:
          'A companion profile of an artist-programmer who made information systems part of the story.',
      },
    ],
  },
  {
    slug: 'judy-malloy-and-the-novel-with-no-front-door',
    kicker: 'PROFILE / SOFTWARE & LITERATURE',
    title: 'Judy Malloy and the Novel With No Front Door',
    subtitle:
      'Before the web made every word clickable, an artist and information programmer built a story you had to search. The result was part fiction, part database, and part argument about who gets to invent a medium.',
    summary:
      'Judy Malloy brought library catalogues, database programming, artists’ books and networked writing together in Uncle Roger. Its shifting forms show how software can be an instrument of authorship, not just a container for text.',
    byline: 'Toolglass Editorial Desk',
    publishedDate: '26 October 2026',
    readingTime: '14 min read',
    thesis:
      'Malloy designed narrative systems in which the computer’s retrieval logic became part of what a reader experienced.',
    intro: [
      "On 1 December 1986, readers of the Art Com Electronic Network on The WELL began receiving fragments of a story called Uncle Roger. The fragments appeared in an online discussion system, a few at a time, with keywords attached. There was a party in Woodside, California, a narrator called Jenny, and the overheard social weather of Silicon Valley's semiconductor business. It was a novel, but it did not arrive as a book. ¹²",
      'Its author, Judy Malloy, was not waiting for the World Wide Web. That did not exist as a public medium. Nor was she simply typing a conventional novel into a computer. She was trying to build a different way of telling a story, one in which the reader retrieved fragments and assembled a picture from them. The structure was part of the literature.',
      "The astonishing thing is how many of the ingredients came from jobs that might have looked unrelated to art: library catalogues, technical information systems, database programming, the daily discipline of deciding where a piece of information belongs. Malloy's career makes a nonsense of the familiar division between the person who writes the words and the person who builds the machine.",
      'She did both. Then she made the distinction difficult to maintain.',
    ],
    sections: [
      {
        heading: 'The card catalogue before the cursor',
        blocks: [
          {
            type: 'paragraph',
            text: "Malloy's early career included work as a searcher and editor for the Library of Congress's union catalogue, and as a technical librarian for Ball Aerospace in Colorado. In her own account, she designed and programmed a computer catalogue for the Ball library in 1969. Other work included information organisation for technical and scientific collections. ³",
          },
          {
            type: 'paragraph',
            text: 'These are not glamorous origins for a literary revolution. A catalogue is meant to make a collection findable, not to make it sing. Its categories are supposed to be helpful and almost invisible. But information systems have a curious power: they decide which things are neighbours, what a query can retrieve, and which paths through a collection are even possible.',
          },
          {
            type: 'paragraph',
            text: "At the same time, Malloy was making visual art and writing. She later described how the logic of information structures gradually entered her studio work. By the late 1970s, she was producing artist's books and card-based narratives. A reader could move through drawings and texts without being forced along a single line. Works including The Woodpile (1979) and Hearst Strip (1980) explored arrangements that resembled both an artwork and a filing system. ³⁴",
          },
          {
            type: 'paragraph',
            text: 'It is easy to describe these as primitive hypertext. That is true in one sense and misleading in another. They were physical works with their own visual language, not merely rough drafts for a website. A card catalogue asks you to choose, compare, return and discover. The hand participates in reading. The future digital version inherited that physical intelligence.',
          },
          {
            type: 'paragraph',
            text: "Malloy was not the only person experimenting with non-sequential narrative. Readers of Borges and Cortázar, and later users of computer systems such as Ted Nelson's Xanadu or Brown University's hypertext research, would recognise related ambitions. But a shared ambition is not the same as a shared implementation. Malloy came through the studio, the library and the bulletin board. Her route was unusually practical and unusually literary at once.",
          },
        ],
        paragraphs: [],
      },
      {
        heading: 'The WELL was not the web',
        blocks: [
          {
            type: 'paragraph',
            text: 'The WELL, founded in 1985, was an online community where people used conferencing software to hold discussions. Art Com Electronic Network, associated with curators Carl Loeffler and Fred Truck, made room there for artists working with software, networks and electronic publishing. The medium was text-heavy, social and still small enough that individual contributions could change its atmosphere. ¹⁵',
          },
          {
            type: 'paragraph',
            text: 'In the spring of 1986, Loeffler invited Malloy to work on the network. She began writing Uncle Roger that summer. Starting on 1 December, she used an ACEN discussion topic to publish the first file, A Party in Woodside, as a serial. The entries were small narrative units, often called lexias, accompanied by keywords. Readers could encounter the pieces in a public conversation while the work was still being written. ¹²',
          },
          {
            type: 'paragraph',
            text: "That last detail matters. A contemporary web novel can be posted all at once and then discovered by strangers. Uncle Roger emerged in a live social environment. Readers were not merely anonymous future consumers; they were members of a network where the work could be discussed as it unfolded. Malloy's later recollections describe that audience responding to the work. ⁶",
          },
          {
            type: 'paragraph',
            text: 'There is a temptation to call it the first of everything: first hypertext novel, first online novel, first social-media fiction. Historians disagree about boundaries, predecessors and definitions. Toolglass will not manufacture a world-first trophy. What can be said securely is that Uncle Roger belongs to the earliest generation of born-digital literary works, and that its networked serial form predates the web by years. The Electronic Literature Directory and the ELMCIP archive document its versions and dates. ⁷⁸',
          },
          {
            type: 'paragraph',
            text: 'The actual work was stranger than a milestone.',
          },
        ],
        paragraphs: [],
      },
      {
        heading: 'The reader as search engine',
        blocks: [
          {
            type: 'paragraph',
            text: 'The first network instalments carried keywords, but the links were not yet the live, clickable web links we take for granted. In 1987 Malloy programmed an interactive version using UNIX shell scripts for ACEN Datanet. She also made an Apple II version in Applesoft BASIC, later developing the larger three-part work and an IBM-compatible BASIC version. A web adaptation arrived in 1995. ¹²⁷',
          },
          {
            type: 'paragraph',
            text: 'The technology was not an incidental wrapper. Malloy described Uncle Roger as a narrabase, a narrative database. Instead of turning a page to find out what happened next, the reader searched and retrieved units of the story. Keywords were not just labels on a finished book. They were part of the route by which the story became visible.',
          },
          {
            type: 'paragraph',
            text: "In a conventional novel, the author chooses a sequence. Even when a narrator is unreliable or a chronology fractured, the physical book usually presents the reader with a fixed succession of pages. Malloy's system made sequence into an action. A reader following one word could see one set of social connections; another reader, searching differently, could build another impression of the same world.",
          },
          {
            type: 'pullquote',
            text: '“Remember that at the time, there weren’t models for what I wanted to create.”',
            attribution:
              'JUDY MALLOY / THE LITERARY PLATFORM INTERVIEW, 2014 ⁵',
          },
          {
            type: 'paragraph',
            text: "The phrase is worth taking seriously. She was not filling a template called 'interactive fiction'. She was designing an interface for a kind of writing that lacked a settled template. There is a difference between authoring content for a medium and participating in the invention of the medium itself.",
          },
          {
            type: 'paragraph',
            text: "In Uncle Roger, the database metaphor even fitted the setting. The story was about the microelectronics culture of 1980s Silicon Valley, where information was valuable, people knew fragments of one another's business, and the machinery of work and power was changing quickly. The reader's own fragmentary access was not merely a trick; it echoed the society being described.",
          },
          {
            type: 'paragraph',
            text: 'The first file involved a party. The second, The Blue Notebook, moved through remembered events and uncertain records. The third, Terminals, explored another part of the technological workplace. The Electronic Literature archives describe later versions using Boolean search and generative operations. These are not claims that every version had the same interface. Malloy repeatedly rebuilt the work as the available platforms changed. ²⁸⁹',
          },
          {
            type: 'paragraph',
            text: 'A 1995 web edition gave the project a different kind of reach. It also changed its conditions. A network of artists and technically experienced readers is not the same audience as the public web. Malloy has noted that the authorised web text includes revisions. Preservation here is not a matter of copying a disk image and declaring victory; the work has a history of versions, each with its own relationship between text, code and audience. ⁷',
          },
        ],
        paragraphs: [],
      },
      {
        heading: 'What a story can know',
        blocks: [
          {
            type: 'paragraph',
            text: 'There is a deeper reason this is interesting to programmers. A database makes information retrievable according to a schema, even if the schema is implicit. A search system decides what counts as a match. A link makes one piece of text adjacent to another. Those choices can feel neutral in an office application. In a story, they become decisions about memory, attention and meaning.',
          },
          {
            type: 'paragraph',
            text: "Imagine a character appearing in three fragments. In one, they are a friend. In another, a colleague. In a third, a source of suspicion. The order in which a reader encounters those fragments changes the person they imagine. The database has not merely delivered the narrative; it has helped compose the reader's experience of it.",
          },
          {
            type: 'paragraph',
            text: 'This is not an assertion that the software itself became a human author. Malloy wrote and structured the material. Her artistry lay partly in deciding how the material could be recombined, and how much freedom the reader should have. A work can be interactive without surrendering its authorship to chance.',
          },
          {
            type: 'paragraph',
            text: 'The question reaches beyond literature. A modern research interface, a museum collection, a personal knowledge base or an AI assistant also mediates between a large body of material and the small selection that appears before us. Every retrieval system tells a partial story. Malloy was unusually early in treating that fact as an artistic resource rather than an inconvenience.',
          },
        ],
        paragraphs: [],
      },
      {
        heading: 'A machine for bad advice',
        blocks: [
          {
            type: 'paragraph',
            text: 'Uncle Roger was not the only oddity in the workshop. Malloy also made Bad Information, a project built around dubious advice and the comic possibilities of a searchable collection. People contributed material, and the work developed across installation and network forms. The premise is almost a parody of the solemn authority normally granted to information systems: what if a database were impeccably organised and full of terrible guidance? ³¹⁰',
          },
          {
            type: 'paragraph',
            text: 'The joke has aged alarmingly well. Searchability does not confer truth. An answer can be retrieved quickly, formatted beautifully and still be nonsense. This is a lesson that modern AI products have spent a great deal of money rediscovering.',
          },
          {
            type: 'paragraph',
            text: 'But Bad Information was not simply an early version of a misinformation warning. It was an artwork that used the social mechanics of collecting, categorising and sharing material. Its form made the audience part of the system. That is the recurring Malloy move: an information structure becomes a cultural structure.',
          },
          {
            type: 'paragraph',
            text: "There were other experiments. YOU! (1991) invited multiple contributors into an online poem. its name was Penelope, published by Eastgate in the early 1990s, used a different narrative architecture. The long poem The Roar of Destiny Emanated From the Refrigerator sounds like a title written by someone who knows perfectly well how absurd the technological sublime can become. Malloy's work did not settle into a single product or format. ³¹¹",
          },
        ],
        paragraphs: [],
      },
      {
        heading: 'Two writers, a research laboratory, and email',
        blocks: [
          {
            type: 'paragraph',
            text: 'One of the most revealing later works is Forward Anywhere, made with researcher Cathy Marshall in the 1990s through the artist-in-residence programme at Xerox PARC. Their raw material included email exchanges about their lives and memories. Instead of starting with a fixed plot and illustrating it, the collaborators allowed resonances between their accounts to shape the hypertext. ¹²',
          },
          {
            type: 'paragraph',
            text: 'This is a useful reminder that the history of software is not only a parade of processors, languages and famous corporate laboratories. It is also a history of people asking what a medium might permit them to express. PARC is remembered for graphical interfaces, networking and the machinery of the modern office. Malloy and Marshall belong in that picture too, because they were exploring what those tools could mean for writing and human experience.',
          },
          {
            type: 'paragraph',
            text: 'Malloy went on to document and advocate for other artists working at the intersection of technology and culture. She edited Women, Art, and Technology (MIT Press, 2003) and Social Media Archeology and Poetics (2016), and worked on Arts Wire and Leonardo-related publications. A School of the Art Institute of Chicago faculty profile lists her teaching Women Artists in Cyberspace in spring 2026. ³¹¹¹³',
          },
          {
            type: 'paragraph',
            text: 'This is not a career of one early invention followed by a museum label. It is a long argument, made in artworks, code, teaching and editorial labour, that creative people should have a hand in shaping the tools through which culture moves.',
          },
          {
            type: 'pullquote',
            text: 'She did not put a novel on a computer. She made the computer part of what a novel could be.',
            attribution: 'TOOLGLASS / EDITORIAL EXTRACT 02',
          },
        ],
        paragraphs: [],
      },
      {
        heading: 'A front door is not always necessary',
        blocks: [
          {
            type: 'paragraph',
            text: 'Today a great deal of digital writing arrives through systems designed to hide their workings. A person enters a prompt, a service produces a passage, and the apparatus in between is mostly inaccessible. This can be useful, but it makes it easy to mistake convenience for authorship and output for design.',
          },
          {
            type: 'paragraph',
            text: "Malloy's work points in another direction. She had a literary idea, then built and rebuilt the mechanisms that allowed it to exist. She treated a catalogue, a query, a keyword and a screen as things an artist could think with. Her software was not a black box that produced the story for her. It was an instrument she shaped to make the story possible.",
          },
          {
            type: 'paragraph',
            text: 'The first readers of Uncle Roger did not need to understand every UNIX shell script to participate. They did, however, encounter a work whose structure was unmistakably part of its meaning. The interface did not disappear. It invited curiosity.',
          },
          {
            type: 'paragraph',
            text: 'Forty years after those first postings on The WELL, we have an astonishing surplus of software that promises to make writing effortless. It is worth remembering a writer who chose the more difficult path: to invent a kind of writing and then make the computer learn how to hold it.',
          },
          {
            type: 'paragraph',
            text: 'A book usually offers a front cover, a first page and a direction of travel. Malloy built a place where you could enter by a keyword, find a stranger at a party, follow a fragment of memory and come out with a story that belonged partly to the path you had taken. The novel had no single front door. That was the point.',
          },
        ],
        paragraphs: [],
      },
    ],
    heroImage: {
      src: '/art/the-narrative-machine.webp',
      alt: 'An index cabinet connects through blue paths and lime nodes to three narrative cards, then to an early terminal and an anonymous person operating the system.',
      caption:
        'A novel as a retrieval system. Concept plate; not a reconstruction of a particular installation.',
      kind: 'TOOLGLASS CONCEPT PLATE',
      width: 1536,
      height: 1024,
    },
    notes: [
      ['Type', 'PROFILE'],
      ['Evidence', 'SOURCE-CHECKED / NO INTERVIEW'],
      ['Published', '26 October 2026'],
      ['Byline', 'Toolglass Editorial Desk'],
      ['Reading time', '14 min read'],
    ],
    toolboxHeading: 'things a reader might want to look up',
    toolbox: [
      {
        term: 'The WELL',
        description:
          'A pioneering online community founded in 1985, known for its discussion forums.',
      },
      {
        term: 'ACEN',
        description:
          'Art Com Electronic Network, an early venue for electronic art and writing on The WELL.',
      },
      {
        term: 'BBS',
        description:
          'Bulletin board system, a networked place for messages and files before the public web.',
      },
      {
        term: 'Lexia',
        description:
          'A small unit of text used in hypertext writing; it may link to or be retrieved alongside others.',
      },
      {
        term: 'Narrabase',
        description:
          "Malloy's term for a narrative database in which searching and retrieval shape the reading experience.",
      },
      {
        term: 'Applesoft BASIC',
        description:
          'A BASIC interpreter for the Apple II, used by Malloy for a disk version of Uncle Roger.',
      },
      {
        term: 'UNIX shell scripts',
        description:
          'Programs made from command-line instructions; the 1987 online interactive version used them.',
      },
      {
        term: 'Xerox PARC',
        description:
          "A research laboratory whose artist-in-residence programme supported Malloy and Cathy Marshall's collaboration.",
      },
      {
        term: 'Eastgate',
        description: 'A publisher associated with early literary hypertext.',
      },
    ],
    sourcesHeading: 'Read more / source desk',
    sourcesIntro:
      'Sources are linked for the claims and chronology above. Forward-looking corporate plans and maintainer descriptions are attributed; Toolglass did not conduct laboratory measurements or software tests.',
    sources: [
      {
        label: '01 / Judy Malloy, notes on the creation of Uncle Roger',
        href: 'https://www.narrabase.net/uncleroger/uncle.html',
      },
      {
        label: '02 / Judy Malloy, detailed history and version notes',
        href: 'https://www.narrabase.net/uncle_readme.html',
      },
      {
        label: '03 / Judy Malloy, autobiographical account',
        href: 'https://people.well.com/user/jmalloy/mybio.html',
      },
      {
        label: '04 / Pathfinders project, Judy Malloy biography',
        href: 'https://scalar.usc.edu/works/pathfinders/judy-malloy.24',
      },
      {
        label:
          '05 / The Literary Platform, interview with Judy Malloy, April 2014',
        href: 'https://theliteraryplatform.com/news/2014/04/digital-literature-pioneers-judy-malloy-on-narrabases-80s-silicon-valley-and-e-literature-today/',
      },
      {
        label: '06 / Pathfinders interview overview',
        href: 'https://scalar.usc.edu/works/pathfinders/malloys-interview.45',
      },
      {
        label: '07 / Electronic Literature Directory, Uncle Roger',
        href: 'https://directory.eliterature.org/individual-work/642',
      },
      {
        label: '08 / ELMCIP, Uncle Roger',
        href: 'https://elmcip.net/creative-work/uncle-roger',
      },
      {
        label: '09 / The NEXT archive, Uncle Roger',
        href: 'https://the-next.org/works/827/',
      },
      {
        label: '10 / The Literary Platform, second Malloy interview',
        href: 'https://theliteraryplatform.com/news/2014/05/digital-literature-pioneers-judy-malloy-on-collaboration-and-artists-networks-in-the-1980s/',
      },
      {
        label:
          '11 / School of the Art Institute of Chicago, Judy Malloy faculty profile',
        href: 'https://www.saic.edu/profiles/faculty/judy-malloy',
      },
      {
        label: '12 / ELMCIP, Forward Anywhere',
        href: 'https://elmcip.net/creative-work/forward-anywhere',
      },
      {
        label: "13 / ISEA archive, Judy Malloy's 1997 artist biography",
        href: 'https://www.isea-symposium-archives.org/person/judy-malloy/',
      },
    ],
    relatedReading: [
      {
        title: 'The Smaller Square That Wasn’t',
        href: '/articles/the-smaller-square-that-wasnt/',
        description:
          'A companion feature on the gap between elegant notation and the physical system that makes it work.',
      },
    ],
  },
];
