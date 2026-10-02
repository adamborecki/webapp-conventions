# Branch previews on GitHub Pages

Every repo deployed to GitHub Pages works this way: `main` is production at the site root, and work on other branches gets its own preview URL without touching `main`. First used in [mixer-lab](https://github.com/adamborecki/mixer-lab), where `main` is a live Canvas assignment.

Copy-ready files are in [`templates/branch-previews/`](./templates/branch-previews).

## What you get

| What | URL |
|---|---|
| Production (`main`) | `https://adamborecki.github.io/<repo>/` |
| A branch preview | `https://adamborecki.github.io/<repo>/branch/<slug>/` |
| List of previews | `https://adamborecki.github.io/<repo>/branch/` |

The slug is the branch name in lower case with every run of other characters turned into `-`. For example, `skin/yamaha-stagepas` becomes `skin-yamaha-stagepas`.

Only branches starting with `claude/`, `skin/`, `feature/` or `preview/` are published. Claude Code cloud and phone sessions name their branches `claude/...`, so that work is previewable with no renaming. Scratch branches with other names stay private.

A preview appears about 1–2 minutes after a push. Deleting the branch removes its preview on the next deploy.

## How it works

Three files, plus an optional app module:

- **`.github/workflows/preview-trigger.yml`**: on a push to a preview branch, asks `pages.yml` to run on `main`. It deploys nothing itself.
- **`.github/workflows/pages.yml`**: runs on `main` for a push to `main`, a branch deletion, or a request from the trigger. It builds the whole site and deploys it.
- **`tools/build-pages.sh`**: puts `main` at the root and every preview branch under `branch/<slug>/` (newest first, capped at 15), marks previews `noindex`, and writes the `branch/` index page. It runs locally too:

  ```bash
  ROOT_REF=HEAD REF_NS=refs/heads tools/build-pages.sh /tmp/site
  ```

- **`js/deploy-context.js`** (optional but recommended): tells the app whether it's a preview, from its URL path.

**Only `main` ever deploys.** When Pages is set up through Actions, the `github-pages` environment accepts deployments from `main` only. Keep it that way. A branch can't change how or what gets published, because the deploy always runs `main`'s copy of `pages.yml`. That's what makes this safe once collaborators are pushing branches.

GitHub Pages hosts one site per repo and has no branch previews of its own. That's why every deploy rebuilds the whole site (production plus all previews) from the current branches.

## Rules

- **Keep `main` releasable.** Experiments go on a preview branch. Merge to `main` only when the change is ready for real users. Additive changes that leave existing behaviour identical may merge anytime.
- **Use relative URLs** (`styles.css`, `js/app.js`, `audio/x.mp3`), never root-absolute ones (`/js/app.js`), so the same files work at the root and under `branch/<slug>/`.
- **Make previews look like previews.** Show a banner naming the branch, with a link to production, and prefix the tab title with `[preview]`.
- **Isolate saved data.** Every app on `adamborecki.github.io` shares one origin, so they all share `localStorage`. Wrap every storage key in `storageKey(key)` from `deploy-context.js`. A preview then saves under `key@<slug>`, and testing never touches real users' data.
- **Mark anything a preview exports.** If the app produces something graded or official (like a Canvas submission), include the URL so a preview's output can be told apart.
- **Delete merged branches.** That removes their previews and keeps you under the cap.
- **Watch the size.** Each preview is a full copy of the site and Pages caps a site at 1 GB. Lower `MAX_PREVIEWS` in `build-pages.sh` for heavy sites, and never commit source media masters to the repo.

## Setting up a new repo

1. Settings → Pages → Source: **GitHub Actions**.
2. Copy `templates/branch-previews/` into the repo. Delete any older Pages workflow (for example, the default `static.yml`). Make the script executable: `chmod +x tools/build-pages.sh`.
3. Check that only `main` can deploy:

   ```bash
   gh api repos/adamborecki/<repo>/environments/github-pages/deployment-branch-policies
   ```

   It should list just `main`.
4. In the app, import `PREVIEW`, `liveUrl` and `storageKey` from `js/deploy-context.js`. Show the banner when `PREVIEW` is set, and route every `localStorage` key through `storageKey`. See `showPreviewBanner()` in mixer-lab's `js/app.js` and `.preview-banner` in its `styles.css`.
5. Push `main` first, then a `feature/...` branch, and open `/branch/` to see it.

To change which branches get previews, edit both `PREVIEW_PREFIXES` in `build-pages.sh` and the `branches:` list in `preview-trigger.yml`.

**Sites with a build step.** The template publishes files as committed (`git archive`), which suits vanilla HTML/JS/CSS. For a bundler, check each branch out into a worktree, run the build with the right base path (`/<repo>/branch/<slug>/`), and copy the output instead.

## Day to day

- **From the phone:** a Claude Code cloud session pushes `claude/...`. Open `/branch/` a minute or two later and tap the newest entry.
- **Naming:** `feature/<thing>` for app features, `skin/<thing>` for visual variants, `preview/<thing>` for anything else you want to show someone.
- **Shipping:** open a PR from the branch into `main`, with the preview link in the description. Merge it, then delete the branch.

## Working with collaborators

- **Give collaborators write access** (Settings → Collaborators). They push branches straight to the repo, and previews work exactly as they do for you. Because deploys only ever run from `main`, a collaborator's branch can't change production or the deploy pipeline. Their changes reach production only when someone merges a PR.
- **Protect `main` once there are collaborators.** Add a ruleset that requires a pull request to merge into `main`, with yourself on the bypass list. Then nobody can push straight to production by accident.
- **Pull requests from forks get no automatic preview.** GitHub won't let a fork's workflows dispatch runs in your repo. To preview a fork's PR after reading the code, push it to a preview branch:

  ```bash
  gh pr checkout <number> && git push origin HEAD:preview/pr-<number>
  ```

- **Only publish code you trust.** A preview runs on the same origin as every other app on `adamborecki.github.io`, so its JavaScript could read their saved data. Read outside contributions before giving them a preview branch.
