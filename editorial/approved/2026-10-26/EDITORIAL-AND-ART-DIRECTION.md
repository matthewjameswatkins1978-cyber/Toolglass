# Luna / Toolglass 26 October / Production packet

## Editorial hierarchy

**Lead:** `The Smaller Square That Wasn't` (DRAM, 4F² vs 6F², Micron's 21 October decision). This is a new technical story with strong historical lineage. Keep the nuance: Micron chose not to pursue 4F² for its roadmap; that is not proof 4F² is impossible or that other manufacturers are wrong.

**Companion profile:** `Judy Malloy and the Novel With No Front Door`. Treat Malloy as a working artist and programmer who invented narrative structures, not as a nostalgic web-history cameo. The artwork places a reader/author inside an index and terminal system. No fabricated likeness.

**Discovery desk:** Sova, orangu, Mathematics Research & Evidence Atlas. Keep lower visual weight than the feature articles. Preserve desk-review status, actual links and testing suggestions. Do not equate source claims with Toolglass tests.

## House voice

Long form, high information density, but always a story. Historical side roads earn their place by illuminating the current subject. No technical soup, breathless hype, generic AI boosterism or perfunctory bullet lists. The lead is about physical/economic limits of an elegant formula; the profile is about treating software as a creative instrument. Do not flatten the articles into short marketing copy. Each has exactly two pull quotes. The Malloy quote from 2014 is genuinely attributed; the other three are original Toolglass editorial extracts.

## Artwork / local execution

First inspect the current rendered Toolglass site, existing Joe Armstrong and Cynthia Solomon features, current art assets and CSS. Compare the two included concept plates with those, not with a generic web-design template. Reuse the existing site's art pipeline and preserve editable SVGs.

Palette from previous local Toolglass SVG: paper `#eee9dc`, ink `#202522`, cobalt `#1748a0`, blue `#6683b7`, lime `#c4ef32`. Thin plotter-like strokes, precise sparse captions, meaningful empty space. No AI image generation, glossy gradients, SaaS cards, stock-photo motifs or poster-style portraits.

`art/the-square-that-wasnt.svg`: conceptual two-panel comparison of nominal 6F² and 4F² transistor-cell bays constrained by capacitor clearance. It is NOT an actual device cross-section, and the labels should never be presented as measured geometry. Caption: *The nominal cell footprint is only one part of a working memory device. Concept plate; not to scale.* Alt: *Technical illustration compares larger and smaller nominal DRAM cell bays while similarly sized cylindrical capacitor forms crowd the narrower layout; a small staircase suggests a possible vertical direction.*

`art/the-narrative-machine.svg`: card index becomes connected narrative fragments and a terminal; a small anonymous reader/programmer sits within the system. Not a depiction of Malloy's appearance, not an archival reconstruction. Caption: *A novel as a retrieval system. Concept plate; not a reconstruction of a particular installation.* Alt: *An index cabinet connects through blue paths and lime nodes to three text cards, then to an early terminal and an anonymous person operating the system.*

Use existing article templates, figure captions, readable text measure, mobile-friendly art scaling, and exactly two large pull quotes per article, freestanding without boxed-card backgrounds or giant decorative quote marks. No new site-wide design system.

## Release gate

1. Matthew reviews copy; **this run does not authorise publication**.
2. Verify dates, quotes, all primary links, scientific claims and status labels again near publication. Especially note that the maths atlas's live source loading was degraded during desk inspection, and its code licence was not verified.
3. Move approved drafts into `editorial/approved/` with queue updates; integrate into existing typed article and scout data without inventing TESTED status.
4. Render and inspect desktop/mobile pages and art. Check link targets, alt text, headings, pull quote placement, no overflowing diagrams and correct publication date.
5. Run repo-prescribed typecheck/build/lint and site-specific evidence validations. Report existing baseline warnings separately from introduced problems.
6. Only deploy after approval and passing gates; return actual public URLs and deploy evidence. Do not silently publish this bundle.

## Rebuild art

From this directory's parent, with Python, svgwrite, Pillow and Inkscape installed:

`python production/build_art.py`

The script draws SVG masters and exports WebPs and a contact sheet. It is deterministic and does not fetch network assets.
