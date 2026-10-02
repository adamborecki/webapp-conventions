# webapp-conventions

My personal standards for how I like web apps and canvas/artifact deliverables built. Connect
this repo in a project (or add it as a Claude Code skill) so Claude builds to spec by default
instead of re-guessing my preferences every session.

**How to use it:** reference this repo's conventions when building web apps or canvas
deliverables for Adam. In a Claude Code session, that means either pointing Claude at this repo
and saying something like "follow my webapp-conventions repo," or — for automatic pickup — making
this repo available as a skill (see [`SKILL.md`](./SKILL.md)) so Claude loads it on its own
whenever a request looks like building a web app, canvas, or artifact deliverable.

## Contents

- [`SKILL.md`](./SKILL.md) — the skill definition; tells Claude when and how to use this repo
- [`CONVENTIONS.md`](./CONVENTIONS.md) — the actual rules (structure, styling, components,
  naming, canvas/artifact defaults). This is the file that matters most.
- [`BRANCH_PREVIEWS.md`](./BRANCH_PREVIEWS.md) — per-branch preview URLs on GitHub Pages: how
  it works, setup for a new repo, and working with collaborators
- [`templates/branch-previews/`](./templates/branch-previews) — the workflow, build script and
  app module to copy into a repo
- [`examples/`](./examples) — sample outputs I like, kept as reference material
