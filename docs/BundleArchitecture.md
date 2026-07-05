# Bundle Architecture & Hydration Guide

This document describes how JavaScript payloads are optimized, divided, and loaded on-demand across the platform text utilities.

---

## 1. Code Splitting & Dynamic Imports

The main workspace bootstrap entry is split using dynamic ESM `import()` chunks.
Vite (the underlying bundler for Astro) packages these dynamic imports into standalone static JS files.

```
                  [ tool-workspace.ts ]
                           │
                 ( createWorkspace() )
                           │
             ┌─────────────┼─────────────┐
        [favorites]    [previews]    [downloads]
        (favorites.js) (previews.js) (downloads.js)
```

---

## 2. Path Types

### Critical Path
* **`BaseLayout.astro`**: Renders initial DOM structures and minimal standard CSS style resets.
* **`tool-workspace.ts`**: The main entry bundle (~12KB gzipped) containing essential bootstrap event loops.

### Optional Path (Lazy-Loaded Chunks)
These chunks are fetched from the server *only* if the feature flags resolve to `true`:
* **`favorites.js`**: Star pins operations and grid updates.
* **`history.js`**: Copy cache logging.
* **`previews.js`**: Rendering social previews panels.
* **`downloads.js`**: TXT, HTML, JSON assembly.

---

## 3. Hydration Model

We follow a **Static SSR First** approach:
1. All toolbar DOM layouts, preview tabs, matrices, and metadata are rendered to static HTML at build time by Astro.
2. The page loads with zero layout shifts (CLS = 0).
3. The interactive handlers hydrate asynchronously on DOM Content Loaded, avoiding blocking parser threads (optimizing LCP and INP).
