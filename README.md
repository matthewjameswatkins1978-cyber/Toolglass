# TOOLGLASS

A compact, content-driven software publication. Issue 001 contains three evidence-backed pieces: Spaghetti was tested, Atlas was inspected with focused harness tests, and TermAI was build-blocked before launch. Eight further entries remain clearly labelled scouting notes.

## Toolglass Radar

`/radar/` is the faster discovery stream beside the main magazine. Entries live independently in `content/radar/*.json`, retain their source links, and show one of four evidence labels: `SPOTTED`, `DESK REVIEW`, `HANDS-ON`, or `PROMOTED`. Radar never appears as an ordinary review. The homepage carries only a restrained pulse module.

Run `npm run radar:validate` to check entries and `npm run radar:dry-run` for an offline fixture report. The scheduled workflow runs at 09:17 Europe/London each day, but the first implementation only validates and records a dry run. Set the repository variable `RADAR_ENABLED=false` to stop it immediately. Live AI discovery and unattended publication remain disabled until a provider credential and repeated acceptable dry runs exist.

The workflow also accepts an HTTPS `specific_url` for a one-project dry-run report. It is currently a safe intake path; it does not fetch, install, or publish remote software.

## Editing

`content/reviews.ts` owns the typed editorial records. `app/reviews/[slug]/page.tsx` is the shared article template. Each record includes replacement boundaries, facts, sources and a proposed test. Change evidence status only with matching recorded evidence; inspected and tested records include their bounded evidence notes and receipts.

`app/page.tsx` holds the curated front page. `app/about/page.tsx` explains methodology. Shared typography, responsive layouts and navigation live in `app/globals.css` and `app/layout.tsx`.

## Editorial workflow

The public canonical repository is [matthewjameswatkins1978-cyber/Toolglass](https://github.com/matthewjameswatkins1978-cyber/Toolglass). Editorial production stays deliberately file-based:

`editorial/inbox/` contains Work drafts; Chat Lucy edits them and marks approved copy in `editorial/approved/`; Work integrates approved prose into `content/reviews.ts`, builds, visually checks, and publishes. `editorial/EDITORIAL-QUEUE.md` is the small shared status board. Reusable structures live in `editorial/templates/`, while voice and evidence rules live in `editorial/house-style/`.

`distribution/` contains the lightweight Toolglass Broadcast layer. The site build generates `sitemap.xml`, `robots.txt`, `feed.xml` and article-specific share cards from the typed review records. `npm run broadcast:build` prepares a campaign manifest and manual outreach drafts; `npm run broadcast:verify` checks evidence labels, canonical URLs and channel-length limits; `npm run broadcast:run -- --mode dry-run` prints the campaign without contacting an external service. The GitHub Actions workflow is manual-dispatch only and defaults to dry-run. Publishing lanes are gated by named repository secrets and write non-secret receipts for idempotency.

The editorial files and website content are separate on purpose. Do not migrate the whole site to Markdown or build a CMS just to connect them. Evidence labels remain claims about work actually done: AI may expand evidence, but it may not invent it.

## Local development

Install with `npm ci`, run `npm run dev`, validate with `npm run lint`, `npx tsc --noEmit` and `npm run build`. The Sites starter uses Vinext and React; content has no database or external service dependency. Fonts are loaded from Google Fonts with system fallbacks.

## Scope

No comments, user accounts, scouting jobs, automated lab or GARY integration. Future services can consume the content model without changing article URLs. Synced project sources are outside this checkout and remain read-only.

Metadata checked 5 September 2026 against the linked upstream repositories and GitHub release API. Unknown latest versions are labelled explicitly. Discovery star snapshots are historical, not live counters.

## Validation notes

Production static export succeeds for the homepage, index, methodology, all eleven articles and a 404 page. The first issue contains three evidence-backed articles and eight scouting notes. Authored `app` and `content` files pass TypeScript; the unmodified starter component catalogue still has repository-wide Oxlint errors. Responsive CSS is implemented; browser visual and interaction checks are part of the release verification workflow.

The unmodified starter component catalogue has repository-wide lint warnings/errors. The starter dependency audit also reports vulnerabilities (including server/build dependencies). No component from that catalogue is used in this publication. GitHub Pages packages only the prepared `dist/pages` static artifact, excluding the Worker and build tools. Review/update dependency warnings before introducing a server runtime or exposing a development server.
