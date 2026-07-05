# Platform Architecture & Dependency Graph

This document details the dependencies and runtime relationships between layouts, registry configurations, components, and module managers.

---

## 1. Dependency Diagram

```mermaid
graph TD
    A[Astro Pages / LocalizedToolPage.astro] --> B[toolConfigs / Config Registry]
    A --> C[Astro Components / MetricsPanel, PreviewTabs]
    
    A --> D[Workspace Loader / scripts/workspace/index.ts]
    D --> E[Feature Flags / platform/featureFlags.ts]
    D --> F[Lazy-Loaded Chunks / downloads.ts, history.ts]
    
    F --> G[Managers / ClipboardManager, HistoryManager]
```

---

## 2. Interaction Flows

1. **Static Stage (Build-Time)**:
   * `[slug].astro` reads settings from `toolConfigs` matching page parameters.
   * Astro compiles layout HTML static nodes.
   
2. **Bootstrap Stage (Load-Time)**:
   * `tool-workspace.ts` launches `createWorkspace(slug)`.
   * Feature flags check active properties.
   * On-demand chunks are fetched asynchronously.
   
3. **Execution Stage (Interaction-Time)**:
   * Typing triggers case converters, metrics calculation, and updates DOM previews.
   * Clicks invoke clipboard writes and cache copy history logs in localStorage.
