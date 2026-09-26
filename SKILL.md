---
name: webapp-conventions
description: Adam's personal standards for building webapps and canvas/artifact deliverables — covers project structure, styling, components, naming, and canvas-specific defaults. Use whenever building, scaffolding, or adding a web app, canvas, or artifact deliverable for Adam (e.g. "add a canvas deliverable", "build me a dashboard", "make an artifact").
---

# Webapp Conventions

This is Adam's personal skill for web app and canvas/artifact deliverables. It exists so Claude
builds things the way Adam likes by default, instead of re-guessing preferences every session.

## What to do when this skill triggers

1. Read `CONVENTIONS.md` in this repo in full before writing any code.
2. Follow it as direct instructions — it's written in imperative voice on purpose. Treat it the
   same as you would a CLAUDE.md or house style guide.
3. If `examples/` contains reference files, skim them for concrete patterns Adam likes (layout,
   color choices, component style) before starting.
4. If CONVENTIONS.md is missing guidance for something you're about to decide, make a reasonable
   call, and briefly flag the gap to Adam so he can add a rule for next time — don't block on it.

## Files in this repo

- `CONVENTIONS.md` — the actual rules. This is the file that matters.
- `examples/` — sample outputs Adam likes, dropped in as loose reference material (no fixed
  structure yet — Adam is still figuring out what belongs here).
- `README.md` — human-facing overview of the repo and how to wire it up in other projects.
