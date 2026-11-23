# Toolglass House Book

Toolglass is an independent computing magazine about software worth finding, the people who make it, and what the evidence lets us say. Take the serious 1980s computer magazine as a model. A reader should leave a story with a better understanding of computing, even when the particular tool has moved on.

## Writing and departments

Open with a specific scene, observation or problem with stakes. Explain the real mechanism in the course of the story. Follow the question through a beginning, middle and end. Earn historical detours by showing which older ideas were inherited, forgotten or changed. Write for intelligent curious readers, including people new to the subject. Prefer precise examples, earned enthusiasm and humour that comes from observation. Cut press-release language, generic openings and jargon without a job.

- **Features and essays** follow a technical or cultural question far enough to change the reader's understanding. Give sources and evidence boundaries where they matter.
- **Profiles** follow a working, curious person through choices, collaborations, mistakes and inventions. Begin in the work. Use exactly two large, freestanding pull quotes with visible attribution, spaced through the piece. Use an original editorial line with explicit desk attribution when a sourced quotation does not serve the story. Give the reader a technical sidebar and further reading. Joe Armstrong is the reference for scene, pacing, technical sidebar and quote placement. Susan Graham is a reference for crediting editorial extracts.
- **Discoveries** bring the current issue's overlooked or unusual finds into view. Their permanent homes are Radar entries or the appropriate review pages.
- **Radar** records fresh signals with their actual desk or hands-on status. Say what the maintainers claim, what Toolglass inspected, and what the next test would establish. Match topic tags across entries so readers can follow related finds.
- **Reviews** explain the job a tool might replace, what was actually tried, and the catch. Keep the environment, version and limits near the result. Use the [evidence standard](EVIDENCE-STANDARD.md) and [Toolglass receipt](TOOLGLASS-RECEIPT.md).

## Composition and typography

Keep the masthead, newsprint-like paper and ruled columns. Set a dominant cover story, a companion profile, a discovery desk and compact back-of-book lists. Use change in scale, placement and white space to make the reading order apparent. Generic circuitry, glossy SaaS surfaces, decorative badges and heroic portraits have no editorial role.

The live site uses DM Sans for body and navigation, IBM Plex Mono for labels and receipts, and Libre Caslon Display for display headlines. Georgia and Arial provide fallbacks. The CSS imports Space Grotesk but the masthead currently inherits the sans face. Interface colours are paper `#f7f7f2`, ink `#151715`, link cobalt `#244de8` and rule grey `#c3c5bd`. Art has its own established palette. Use paper `#eee9dc`, ink `#202522`, cobalt `#1748a0`, secondary blue `#6683b7` and sparse lime `#c4ef32`.

## Artwork and evidence

- **Machine Folklore** is editorial illustration. Use recognisable computing objects, technical relationships, sparse plotter-like strokes and meaningful empty space. A person can appear at work in the scene. Label the plate as conceptual and identify the limit where it could be mistaken for a reconstruction.
- **Evidence graphics** present an observation that can be reproduced from an identified test, fixture, measurement or trace. Preserve units, scope, source and the receipt. Conceptual geometry needs its own caption and must never imply measured precision.
- **MachineGlyphs** are small symbolic navigation or identification marks supplied by [the existing component](../../components/MachineGlyph.tsx). They are neither illustration nor evidence.

Draw and review story art locally. Keep editable SVG masters with approval materials and optimized WebP exports in the site where the templates already use them. Start from the existing illustrations and inspect the image in the actual article at phone and desktop widths. Use accurate alt text, a useful caption and explicit dimensions. The [26 October art direction and rebuild notes](../approved/2026-10-26/EDITORIAL-AND-ART-DIRECTION.md) document the local Python and Inkscape workflow. The [23 November packet](../approved/2026-11-23/README.md) documents the CairoSVG and Pillow route and its draft-stage limitations. The [23 November publication PR](https://github.com/matthewjameswatkins1978-cyber/Toolglass/pull/21) records the approved integration and checks.

## Publication and Terra handoff

1. Keep research and drafts in editorial intake. Record Matthew's approval in the [editorial queue](../EDITORIAL-QUEUE.md) and retain the approved source packet. Check primary links, quotations, dates, claims and art before integration.
2. Add approved entries to the existing public collections. Article modules are registered in [articles-all.ts](../../content/articles-all.ts). Reviews use [reviews.ts](../../content/reviews.ts). Radar entries live in [content/radar](../../content/radar/). Files in editorial folders are never crawled as publication inputs.
3. Fill the existing dated metadata and article kicker. Articles sharing a publication date appear together in the archive, including single-story editions. The cover takes its lead from the newest edition. A date-scoped pin in [magazine.ts](../../content/magazine.ts) can select a lead, profile or discoveries. Without a pin, a feature takes precedence among that date's stories, the newest remaining profile is selected, and same-day Radar stories supply discoveries. Ties break by canonical route. Older pins cannot hold the cover after a newer issue arrives.
4. Open a PR with approval provenance and checks. The Pages workflow validates Radar, tests selection, builds the export, and verifies links, art, dates and both feeds in the artifact. It only deploys from `main`. Human review and merge remain the publication decision. The existing scheduled Radar dry run and manual Broadcast workflow continue as before.
5. Once the Pages run succeeds, check the public cover, dated archive, article, profile, discovery routes and feeds. Record URLs and the deployed run in the publication receipt.

Sources for house voice and visual decisions also include the [original writing standard](WRITING-STANDARD.md), the [article template](../templates/article.md), [production CSS](../../app/globals.css) and the [published Joe Armstrong profile](https://matthewjameswatkins1978-cyber.github.io/Toolglass/articles/joe-armstrong-the-man-who-put-failure-to-work/).
