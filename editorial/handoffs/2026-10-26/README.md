# Toolglass editorial publishing handoff (26 October 2026)

**Status:** Original editorial artifacts transferred to GitHub, not yet integrated or published. The archives are byte-identical to the reviewed local ZIPs. Matthew authorised publication of all five 26 October pieces once factual, artwork, build and public-page checks pass.

## Primary source for Luna / Work

**Start with [Toolglass-26-October-2026-WORK-PUBLISH-PACKET.zip](./Toolglass-26-October-2026-WORK-PUBLISH-PACKET.zip).** It contains `WORK-PUBLISH-MISSION.md`, all three scouting discoveries, both full long-form features, original SVG masters, optimized WebP assets, reproducible scripts, source audits, preview, and production notes (17 ZIP entries; 241,959 bytes; SHA-256 `c750d00e2690ae67828fbd820738cdbef7ea911351ded6d17f92cbe14a7da619`).

The companion [toolglass-weekly-bundle-2026-10-26.zip](./toolglass-weekly-bundle-2026-10-26.zip) is the unmodified editorial source bundle without the additional `WORK-PUBLISH-MISSION.md` (16 entries; 237,851 bytes; SHA-256 `00d32849fad1290a5a79537a74fc30db290c16f28677ffb361a4e72d8160821d`).

An earlier, separate [Toolglass-19-Oct-2026-Editorial-and-Artwork-ORIGINAL.zip](./Toolglass-19-Oct-2026-Editorial-and-Artwork-ORIGINAL.zip) is retained for continuity (15 entries; 212,371 bytes; SHA-256 `4cada231fc74b95a9f786bdf1e3022b26cefe0ed5efbb7f438cf54fb8c0b7d02`). It is **not** part of the 26 October release; do not confuse or overwrite the editions.

## Instructions

1. Fetch and unpack the **26 October Work publishing packet** as the canonical input. Read its `WORK-PUBLISH-MISSION.md` first, followed by source audit and individual manuscripts. Do not reconstruct or rewrite articles from chat summaries.
2. Use the existing Toolglass editorial/content architecture and published visual language. Luna handles local drawing, integration, build and QA; Lucy in Chat handles editorial direction. Do not generate artwork via image-generation services.
3. Three programs must remain identified as scouting notes/desk research, NOT hands-on tested reviews. Verify material factual claims, source dates, licensing, captions and credits.
4. Matthew already approved publication after verification. Integrate all five 26 October pieces, test responsive layouts and actual public URLs, then deploy through the established site workflow. Do not request routine reapproval or claim anything is published without verification.
5. The handoff branch is intentionally separate from `main` and does not itself publish anything. Work should cherry-pick or copy the material into a dedicated production branch, and merge/deploy only after checks pass.

### Archive integrity

```sh
sha256sum Toolglass-26-October-2026-WORK-PUBLISH-PACKET.zip
unzip -t Toolglass-26-October-2026-WORK-PUBLISH-PACKET.zip
```

Production source: `matthewjameswatkins1978-cyber/Toolglass`. This handoff was created to make the original approved ZIPs accessible to Work without relying on ChatGPT sandbox download links.
