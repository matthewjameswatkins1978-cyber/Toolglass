---
title: The Smaller Square That Wasn't
slug: the-smaller-square-that-wasnt
section: Features
article_type: Long-form feature
status: APPROVED / PUBLICATION
editor: Lucy
issue_date: 2026-10-26
evidence_status: DESK-RESEARCHED / PRIMARY ROADMAP AND TECHNICAL LITERATURE / NO LAB TEST
art: art/the-square-that-wasnt.webp
---

# The Smaller Square That Wasn't

## A chipmaker spent twenty years studying a more compact memory cell. Then it decided the square was not the problem. A story about capacitors, manufacturing, and the dangerous elegance of an equation.

**By Toolglass | 26 October 2026 | Feature / memory architecture**

The most interesting thing in a technology roadmap is not always the invention. Sometimes it is the invention with a line through it.

On 21 October 2026, Micron presented its plans for the future of computer memory. There were familiar promises of greater density, new manufacturing processes and ever more intimate arrangements between memory and processors. But tucked into the discussion was a refusal. Micron would continue developing its established 6F² DRAM cells and investigate three-dimensional DRAM. It would **not** pursue 4F² as its next production architecture, citing extra complexity and cost. The company had studied the smaller cell for roughly two decades. [1][2]

To someone who has never had to persuade billions of microscopic capacitors to behave, this sounds peculiar. The names are little bits of geometry. A 4F² cell occupies, in the idealised layout, four squares of a minimum feature dimension; a 6F² cell occupies six. Four is smaller than six. That is not a controversial proposition. If memory is sold by the bit, why wouldn't a chipmaker choose the smaller square?

Because a memory cell is not a drawing of a transistor. It is a physical promise that a vanishingly small electrical charge can survive long enough to be read correctly, be refreshed, and be manufactured again and again across an entire wafer. The transistor's footprint is only one clause in that promise.

This is a story about the distance between mathematical area and useful memory. It also happens to be a useful antidote to the way technology news often treats a research result as an inevitable product roadmap.

## The leaky bucket that replaced the iron doughnut

Before there was a race to shrink capacitors, computer memory could look rather like a miniature weaving project. Magnetic-core memory stored bits in tiny ferrite rings threaded by wires. A computer with enough memory needed a great many rings, and each one took space, materials and careful assembly. The technique was ingenious and increasingly difficult to scale.

In the mid-1960s, IBM engineer Robert Dennard was working on semiconductor alternatives. His team's approach used six transistors to store one bit. Dennard's insight, conceived in 1966 and patented in 1968, was to store information as charge on a capacitor, with a transistor acting as the gate through which the charge could be written or read. The capacitor leaks. It must periodically be replenished. This is why the memory is called *dynamic*. [3]

A DRAM bit is not a tiny permanent inscription. It is a tiny electrical state kept alive by maintenance.

The first commercially consequential DRAM chips were not simply Dennard's patent manufactured verbatim. Intel's 1103, introduced in October 1970, used a three-transistor design, and its early manufacturing yields were difficult. Yet the 1-kilobit 1103 helped establish semiconductor memory as a practical alternative to magnetic core. Intel says it was the world's best-selling semiconductor device by the end of 1971. [4]

That distinction matters. A brilliant cell principle is one thing; a chip that a factory can reliably produce and a customer can buy is another. The argument has not changed much in fifty-six years.

In a modern conventional DRAM array, a bit is generally described by the one-transistor, one-capacitor shorthand, **1T1C**. Word lines select rows. Bit lines carry tiny electrical differences to sense amplifiers. A read can disturb the stored charge, so sensing and restoring are part of the choreography. Refresh happens repeatedly because physics is under no obligation to remember a number for us.

The arrangement has become staggeringly compact. Micron's October presentation says its bits per DRAM wafer have increased more than 400-fold between 1995 and 2026. That is a company-reported figure, but the historical direction is not in doubt. The machine that once needed racks of magnetic rings now keeps billions of volatile bits in chips that can fit in a hand. [2]

## Four squares, six squares, and one missing question

The letter **F** in 4F² or 6F² is a layout yardstick: a minimum lithographic feature dimension for the technology under discussion. The superscript tells us we are talking about area. If the same F is used, the nominal cell areas are 4F² and 6F². The first is one-third smaller than the second.

It is tempting to turn that directly into a density headline: one-third less area, therefore half again as many bits. In an ideal tiled array with no other constraints, that is the arithmetic. But real DRAM is not a sheet of empty squares. It is a three-dimensional electrical and manufacturing system with contacts, isolation, peripheral circuitry, error margins, heat and a component that refuses to vanish: the capacitor.

A capacitor must store enough charge to be distinguished from noise when it is read. As cells shrink, engineers can make capacitors taller, narrower, deeper, or more elaborate. They can change materials and the arrangement of electrodes. Every solution has trade-offs in leakage, coupling, mechanical stability, process steps and yield. What matters is not simply how little silicon a transistor claims on paper, but how closely the entire working cell can be packed without losing the electrical signal or the ability to manufacture it economically.

Imagine designing a car park where the painted parking bays become one-third narrower. Your plan shows a marvellous gain in capacity. Then the cars arrive. Their doors, turning circles and safe clearances have not shrunk by the same amount. You have not discovered a new car park; you have discovered a disagreement between a diagram and a vehicle.

For DRAM, the capacitor pitch is one of those inconvenient clearances. Micron's argument is that this pitch, rather than the attractive number attached to the transistor-cell layout, governs practical bit density at the advanced nodes it is targeting. The company's leadership also points to the complexity and cost of making 4F² work. [1][5]

> **A smaller transistor footprint is not automatically a smaller working memory cell.**
>
> *TOOLGLASS / EDITORIAL EXTRACT 01*

This is not a claim that 4F² cannot be built. In fact, the distinction between *possible* and *worth manufacturing* is the centre of the story.

## The alternative is not imaginary

At the 2025 Symposium on VLSI Technology and Circuits, researchers reported integration of a 4F² DRAM array using a vertical-gate cell transistor and a peri-under-cell architecture. The paper describes wafer bonding and electrical connections between a cell wafer and a peripheral-circuit wafer. It is a real technical demonstration, published in the IEEE record, not merely a pretty road-map rectangle. [6]

That work does not prove that the design will beat 6F² on the measures that decide a commercial memory product: good bits per wafer, cost, yield, speed, retention, power, and the ease of scaling the next generation. Nor does Micron's decision prove that the rival architecture is a dead end for everybody. Other manufacturers may choose different structures, processes, customer needs or economic assumptions. An integration demonstration, a pilot production line and a mass-market memory chip are three different achievements.

This is why we should be suspicious of the phrase *the industry has decided*. One company has made a consequential choice and explained its reasoning. Competitors are still exploring other choices. The experiment is not over; the cost of running it is simply enormous.

There is another complication. The label 4F² can refer to a particular cell footprint without uniquely specifying every detail of the vertical transistor, storage capacitor, contact geometry and peripheral circuits. Two chips with the same nominal cell-area notation can behave very differently in fabrication. The shorthand is useful, but it is not the entire circuit diagram.

## The October decision

Micron's 21 October technology presentation places the decision on a slide about continuous DRAM scaling. The message is unusually direct: the company is extending 6F² and developing 3D DRAM, and is not pursuing 4F² because of increased complexity and cost. [2]

The same presentation sketches a sequence of future processes. Its 1γ generation is already in high-volume manufacture; 1δ is planned to ramp in the second half of 2027 and is expected, by Micron, to improve bit density by a percentage in the mid-twenties over the preceding generation. Later nodes include more development and pathfinding work. Those are road-map targets, not a record of future chips already delivered. [2]

The company also talks about new ways of bonding wafers, using advanced lithography and materials, and arranging memory closer to computation. These are not all the same technical trick. Some make cells smaller in the plane. Some change how memory and logic are packaged. Some point towards stacking cells in the third dimension.

Why is that third dimension so tempting? Because if the floor is crowded, perhaps the next bit belongs upstairs.

## Three different meanings of stacking

Memory marketing can make several distinct architectures sound like the same tower. It is worth separating them.

**3D NAND** already stores flash-memory cells in many vertical layers. It is non-volatile storage with different devices, access patterns and constraints from DRAM. The success of stacked flash does not mean DRAM can be copied into the same structure by changing the label on a drawing.

**High-bandwidth memory**, or HBM, stacks memory dies and connects them with dense vertical interconnects. It brings enormous bandwidth close to processors, and it is important to modern accelerators. But stacking finished DRAM dies is not the same as building a truly three-dimensional array of DRAM cells within a new cell architecture.

**3D DRAM** aims to change the cell array itself so that density can grow vertically rather than relying entirely on ever smaller planar dimensions. It raises its own questions: how to make and isolate the cells, how to read and refresh them, where to put the peripheral circuits, how to control defects and temperature, and whether the extra manufacturing steps improve cost per working bit. Micron says it is researching this direction, but has not committed to a commercial launch date. [2][5]

These distinctions are not pedantry. They separate a technology that ships in today's machines from a research direction that might determine what tomorrow's machines can afford to remember.

The October slides also discuss a proposed *vertical HBM* arrangement, with memory stacked on top of compute, rather than merely alongside it. That is another approach to the movement problem, the time and energy spent carrying data between a processor and the memory holding its working state. It is not interchangeable with 3D DRAM cell scaling. [2]

## The memory wall is not made of bricks

For decades, processors have become capable of performing operations faster than systems can supply all the data they need. This is the broad family of problems called the memory wall. Caches, prefetching, wider buses, faster DRAM, HBM, new packaging and clever algorithms are all attempts to get useful work done without waiting on the next byte.

The problem is particularly visible in large AI systems, where models may need vast amounts of memory capacity and bandwidth. But it is not an AI-only story. Games, scientific simulations, databases and ordinary software all inhabit the same physical world of memory latency, bandwidth, power and price.

The significance of Micron's decision is therefore not that a consumer should suddenly prefer one RAM module over another. There is no new 4F²-versus-6F² choice at the shop counter. It is that the cost and density of memory, years from now, depend on decisions that look embarrassingly small when written as algebra.

A percentage point of usable density at enormous manufacturing scale can matter more than a dramatic-sounding process name. And a theoretically smaller cell that adds too many steps, produces too few good dies or cannot be scaled economically may be a poorer bargain than a larger one with a reliable path forward.

> **A road map is also a record of the inventions a company has decided not to build.**
>
> *TOOLGLASS / EDITORIAL EXTRACT 02*

## The useful disappointment

There is a particular kind of engineering intelligence in abandoning an elegant idea after years of work. It is less photogenic than a prototype. There is no obvious hero image of a technology *not* being manufactured. It does, however, require an unusually serious understanding of the problem.

The 4F² cell is an attractive proposition. Its mathematics is not wrong. A smaller ideal footprint is a smaller ideal footprint. What Micron has argued is that, at the frontier it cares about, this number no longer describes the constraint that matters most. A capacitor, a factory and an accountant have entered the conversation, and none of them is impressed by the elegance of four squares.

Perhaps a rival will find a better way to build 4F². Perhaps 3D DRAM will arrive later, or prove more difficult than expected. The future remains contested. We should not convert one company's road map into a law of physics.

But there is a valuable lesson already. Computing history is full of ideas that were theoretically superior, technically possible, and commercially awkward. It is also full of supposedly exhausted technologies that survived because engineers found one more inventive way to use them.

A memory cell is not just the place where a bit sits. It is the agreement between charge, time, noise, geometry and manufacturing that allows the bit to exist at all. Sometimes the most advanced move is to stop shrinking the wrong part.

### Toolbox / the small vocabulary of very small memory

**DRAM:** Volatile memory that stores information as charge and must periodically refresh it. **1T1C:** One transistor and one capacitor per bit, a common modern DRAM-cell model. **F²:** An idealised area measure derived from a technology's minimum feature dimension; not a complete density or cost metric. **Pitch:** Centre-to-centre spacing between repeating structures, such as capacitors. **Sense amplifier:** Circuit that detects and restores a tiny signal from a DRAM cell. **Yield:** The share of manufactured devices that work within specification. **HBM:** High-bandwidth memory using stacked dies and dense connections. **3D DRAM:** A research direction for vertically arranged DRAM cells, distinct from conventional HBM packaging and 3D NAND flash.

### Read more / source desk

1. [Micron's 19 October announcement of the 21 October technology webinar](https://www.globenewswire.com/news-release/2026/10/19/3383394/14450/en/index.html), a primary company release. The decision itself is in the presentation and reported Q&A, not in this advance notice.
2. [Micron technology presentation, 21 October 2026, 33-slide mirror](https://6ix.com/deck/00znsgtd/micron-technology-technical-presentation-october-2026), particularly slides 15–17 and 20. Primary slide content reproduced by a third-party host; forward-looking statements are Micron's claims.
3. [IBM's history of dynamic random-access memory](https://www.ibm.com/history/dram), covering Robert Dennard's cell and the move beyond magnetic core.
4. [Intel's 1103 history](https://timeline.intel.com/1970/the-intel-1103-dram), including the 1970 launch and early market adoption.
5. [Anton Shilov, Tom's Hardware, 22 October 2026](https://www.tomshardware.com/pc-components/dram/micron-pulls-the-plug-on-future-4f2-dram-after-two-decades-of-research-in-dramatic-shift-company-says-architecture-offers-no-meaningful-density-advantages-increases-manufacturing-complexity-and-costs-and-has-fundamental-scaling-limitations), reporting the presentation and executive explanation. Independent reporting, not a substitute for testing fabrication claims.
6. [2025 Symposium on VLSI Technology and Circuits: 4F² DRAM with vertical gate and peri-under-cell architecture](https://doi.org/10.23919/VLSITechnologyandCir65189.2025.11075066), an IEEE technical paper documenting an integration demonstration.

**Evidence boundary:** Desk research only. No wafers, chips, production data or laboratory measurements were inspected. Micron's forward-looking performance and manufacturing claims are identified as such. The 4F² illustration is conceptual and not a faithful device cross-section.
