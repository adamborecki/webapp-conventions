# Conventions

Direct instructions for Claude (or any AI assistant) to follow when building web apps or
canvas/artifact deliverables for Adam. Read this in full before starting work. Follow it as
rules, not suggestions, unless Adam's own request in the moment explicitly overrides a rule here.

## General Principles

<!-- fill in specifics here -->

## File / Project Structure

<!-- fill in specifics here -->

## Hosting, Branches and Previews

- Host on GitHub Pages, deployed by GitHub Actions. `main` is production at the site root.
- Never experiment on `main`. Put work on a branch starting with `claude/`, `skin/`, `feature/` or
  `preview/`; it is published at `/<repo>/branch/<slug>/`, with a list at `/<repo>/branch/`.
- Set up previews in every Pages repo from `templates/branch-previews/`, and follow the rules in
  [`BRANCH_PREVIEWS.md`](./BRANCH_PREVIEWS.md): relative URLs only, a preview banner, saved data
  isolated per preview, and only `main` may deploy.
- Merge to `main` when a change is ready for real users (additive changes that leave existing
  behaviour identical may merge anytime), then delete the branch.

## Styling Conventions

### Colors

<!-- fill in specifics here -->

### Typography

<!-- fill in specifics here -->

### Spacing

<!-- fill in specifics here -->

## Component Patterns

<!-- fill in specifics here -->

## Naming Conventions

<!-- fill in specifics here -->

## Canvas / Artifact Defaults

### Layout

<!-- fill in specifics here -->

### Interactivity

<!-- fill in specifics here -->

### Libraries to Prefer

<!-- fill in specifics here -->

### Libraries to Avoid

<!-- fill in specifics here -->
