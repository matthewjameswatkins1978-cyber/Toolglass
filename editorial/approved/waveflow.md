---
title: WaveFlow
slug: waveflow
section: Scout Notes
article_type: Desk-researched scout note
status: APPROVED
evidence_status: DESK-RESEARCHED / NOT TESTED
editor: Lucy
website_ready: true
published: 12 October 2026
---

# WaveFlow: your music files are not a subscription


The music player is one of those software categories that was supposed to be finished by about 2003. You chose a folder, played an album, arranged a playlist and occasionally argued with an equaliser. Then streaming turned the player into a shop, a recommendation engine and a lease on somebody else's catalogue.

[WaveFlow](https://github.com/InstaZDLL/WaveFlow) is interested in the older bargain: the files are yours and the machine plays them. It is built with Tauri, Rust and a web-based front end, and it supports formats from FLAC and ALAC to DSD. Its September 30 release added or expanded exclusive output across Windows, Linux and macOS using WASAPI, ALSA and CoreAudio, along with optional DSD-over-PCM for compatible DACs. The documentation also describes ReplayGain, a two-decoder crossfade, smart playlists, tag editing intended to preserve fields it does not touch, and optional MPD/DLNA serving. A 9 October patch addressed Linux memory pressure and library artwork behaviour.

The small, admirable claim is that the output-device menu reports what the hardware **actually opened**, not merely what the user requested. That is the sort of unglamorous truth a musician can appreciate. A bit-perfect badge means very little if the operating system quietly resamples the signal or the DAC never entered the expected mode.

There is a catch. Exclusive access may block other applications from using the same audio device, and DSD-over-PCM needs a compatible chain. The player is GPL-3.0-or-later, not MIT; that is entirely fine for using it, but relevant if someone wants to reuse its code in an MIT project. Lyrics, scrobbling, artwork and network services may use third-party providers when enabled, so “local-first” must not be confused with “no network activity under any settings.” These are design boundaries to check, not defects proven by this desk review.

**Toolglass angle:** Run it on Windows with a known FLAC album and a known DAC; check actual sample rate, exclusive-mode behaviour, gapless transitions, ReplayGain, offline mode, and whether a tag-edit round trip preserves unrelated metadata. Then try a large, messy library. A listening test is welcome, but a signal-path test comes first.

**Verdict:** **BEST HANDS-ON PICK.** A program that could make the next review feel like an old computer-magazine hardware bench, complete with cables and inconvenient truths.