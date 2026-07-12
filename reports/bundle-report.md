# Bundle Analysis Report

This document details the frontend bundle sizes, script assets structure, and modules composition for the TapToGencom application.

---

## 1. Asset Sizes Audit

Below is a breakdown of the primary workspace scripts and dataset files located in the repository:

| File Path | Size (KB) | Loading Behavior | Purpose |
| --- | --- | --- | --- |
| [`src/scripts/tool-workspace.ts`](file:///src/scripts/tool-workspace.ts) | 891.14 | Statically Imported on Tool Page | Core workspace orchestration, event management, and generator rendering functions. |
| [`src/scripts/data/generator-datasets.ts`](file:///src/scripts/data/generator-datasets.ts) | 402.77 | Dynamically Imported (`lazy-loaded`) | Database of lists, adjectives, names, and templates. |
| [`src/lib/analytics.ts`](file:///src/lib/analytics.ts) | 1.80 | Statically Imported | Lightweight analytics tracking dispatch module. |

---

## 2. Code Splitting & Dynamic Imports

To guarantee fast initial page load speeds and prevent loading unnecessary data:
- **Dataset Splitting**: The heavy dataset module (`generator-datasets.ts` - 402.77 KB) is decoupled from the main workspace module using dynamic `import('./data/generator-datasets')` calls.
- **Vite/Astro Chunks**: Astro's bundler automatically extracts this dynamic import into a separate chunk. The browser only requests this dataset chunk *after* the page finishes initial HTML render and when the user first triggers a generator action.
- **Optimization Strategy**: By keeping datasets lazy-loaded, we keep the initial bundle lightweight and improve PageSpeed metrics.
