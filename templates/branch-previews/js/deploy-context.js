// Which deployment this page is. `main` is served at the site root and is
// production; other branches are published by
// .github/workflows/pages.yml under branch/<slug>/ (see BRANCH_PREVIEWS.md in adamborecki/webapp-conventions).
// Pure: reads only the path it is given, so it is safe under `node --test`.

const PREVIEW_PATH = /\/branch\/([a-z0-9-]+)\//;

// The preview's slug ("feature-low-cut"), or null on the live site and locally.
export function previewSlug(pathname) {
  return PREVIEW_PATH.exec(String(pathname || ""))?.[1] || null;
}

// The live site's URL for a preview URL (strips the branch/<slug>/ part).
export function liveUrl(href) {
  return String(href).replace(/branch\/[a-z0-9-]+\/.*$/, "");
}

export const PREVIEW = previewSlug(globalThis.location?.pathname);

// Previews share the live site's origin, so each one keeps its own saved data
// instead of mixing it into real users' data.
export const storageKey = (key, slug = PREVIEW) => (slug ? `${key}@${slug}` : key);
