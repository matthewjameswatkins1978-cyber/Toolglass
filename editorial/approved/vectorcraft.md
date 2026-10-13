---
title: VectorCraft
slug: vectorcraft
section: Scout Notes
article_type: Desk-researched scout note
status: APPROVED
evidence_status: DESK-RESEARCHED / NOT TESTED
editor: Lucy
website_ready: true
published: 12 October 2026
---

# VectorCraft: the drawing program with a command channel


The intriguing part of [VectorCraft](https://github.com/storytold/vectorcraft) is not that somebody is trying to recreate Illustrator in Rust. People have been trying to free vector drawing from expensive proprietary software for decades. The intriguing part is that this application treats *being operated by another program* as a normal property of its interface.

VectorCraft describes a JSON control channel and an MCP server able to drive drawing tools, menus, panels and export operations. Its examples are reportedly built through that same command API and rendered by the application. This is an unusual architectural choice. Instead of attaching a chatbot to a drawing package and asking it to pretend to be an artist, the program exposes its drawing machinery in a form an external tool can control. A curve remains a curve; text remains editable text; the file remains an authored document.

It is a natural fit for Toolglass's existing practice of creating restrained concept plates as editable SVG before exporting WebP. A local agent could, in principle, use the drawing application itself to place lines, shapes, typography and objects, with a reviewable result. That is a possibility worth testing, **not evidence that the tool is already installed or integrated into our workflow**.

The developer reports native macOS, Windows, Linux and FreeBSD builds plus a WebAssembly version. Its self-audit claims roughly 88% of Illustrator 2026's listed surface features and an estimated 65% real-work readiness, but explicitly calls the product **alpha** and explains that the percentages are self-assessed against public documentation. They are not an independent compatibility benchmark. Native `.ai` interchange remains incomplete, effects and scripting have gaps, and the documented Linux Wayland tablet/drag-and-drop limitations matter for some artists.

**Toolglass angle:** *What changes when creative software exposes a real control surface to machines?* The test should use an existing Toolglass SVG, open it in VectorCraft, alter three precise elements through the control interface, export it, and inspect whether text, geometry and layering remain editable and visually faithful. A bad result would be informative too.

**Verdict:** **INSPECT / LOCAL ARTWORK PILOT.** More interesting as a programmable instrument than as an Illustrator replacement claim.