# TapToGen Workspace Architecture Documentation

This document describes the modular, configuration-driven platform architecture used to initialize and manage tool workspaces.

---

## 1. Folder Structure

```
src/
├── components/          # Reusable Astro UI components
│   ├── DownloadToolbar.astro
│   ├── FavoritesPanel.astro
│   ├── HistoryPanel.astro
│   ├── KeyboardShortcuts.astro
│   ├── MetricsPanel.astro
│   ├── PreviewTabs.astro
│   └── StyleCard.astro
├── config/              # Central tool configurations
│   ├── bold.ts
│   ├── cursive.ts
│   ├── fancy.ts
│   ├── index.ts
│   ├── italic.ts
│   ├── underline.ts
│   ├── unicode.ts
│   └── vaporwave.ts
├── lib/                 # Reusable utility managers
│   ├── ClipboardManager.ts
│   ├── ExportManager.ts
│   ├── FavoritesManager.ts
│   ├── HistoryManager.ts
│   ├── MetricsManager.ts
│   ├── SearchManager.ts
│   ├── ShortcutManager.ts
│   └── StorageManager.ts
└── scripts/
    └── workspace/       # Split script modules for workspace interaction
        ├── clipboard.ts
        ├── downloads.ts
        ├── events.ts
        ├── favorites.ts
        ├── history.ts
        ├── index.ts     # Main workspace engine loader
        ├── metrics.ts
        ├── previews.ts
        ├── render.ts
        ├── shortcuts.ts
        └── shuffle.ts
```

---

## 2. Manager Responsibilities

### `ClipboardManager` / `ClipboardHelper`
Handles writing to the system clipboard (`navigator.clipboard.writeText`) and manages transient copy confirmation states on triggers.

### `StorageManager`
Provides wrappers around `localStorage` gets/sets to ensure cross-browser compatibility and catch quota exclusions safely.

### `ExportManager` / `downloads.ts`
Builds text strings, HTML documents, or JSON representations of generated items and generates download attachments.

### `MetricsManager` / `metrics.ts`
Counts characters, graphemes, words, and lines dynamically.

### `FavoritesManager` / `favorites.ts`
Enables pinning of styles. Reorders the style grid items dynamically when pinning changes.

### `HistoryManager` / `history.ts`
Caches session copies and presents them in a history list.

### `SearchManager` / `search.ts`
Applies real-time style filtering over search matches.

### `ShortcutManager` / `shortcuts.ts`
Attaches document-wide hotkey event listeners.

---

## 3. Workspace Lifecycle

1. **Static compilation (SSR)**: Astro reads config registry matching the slug and renders component toolbars, inputs, outputs, and templates.
2. **Dynamic bootstrapping**: On DOM content loaded, `tool-workspace.ts` resolves the active slug.
3. **Workspace Engine Injection**: `createWorkspace(slug, input, output, generate)` is executed.
4. **Feature Setup**:
   * Previews setup.
   * Event bindings attached to inputs and conversion engines.
   * Hotkeys registered.
   * Star toggles bound.
   * Exporter download triggers initialized.
5. **Interactive Loop**: Client inputs trigger conversions, updates preview panels, and recalculates counts.

---

## 4. How-To Manuals

### Adding a New Tool
1. Create a configuration file in `src/config/<tool-slug>.ts` implementing the `ToolConfig` schema:
   ```typescript
   export const myNewToolConfig: ToolConfig = {
     slug: 'new-tool-generator',
     counters: { chars: true, words: true, glyphs: false, lines: false },
     search: true,
     shuffle: false,
     favorites: false,
     history: true,
     previews: ['ig', 'tw'],
     exporters: ['txt'],
     shortcuts: false
   };
   ```
2. Register the configuration inside `src/config/index.ts`.
3. The platform layouts will dynamically fetch the config, render the modules, and bind the scripts.

### Adding a New Preview Mockup
1. Open `src/components/PreviewTabs.astro`.
2. Add a new tab button and markup template in the tabs list.
3. Configure the preview option in the configurations.

### Adding a New Exporter Format
1. Register a new format enum in the `ToolConfig` exporter list.
2. Update `src/components/DownloadToolbar.astro` to add the button UI.
3. Add the document assembler code in `src/scripts/workspace/downloads.ts`.

### Adding a New Feature Flag
1. Extend the `ToolConfig` interface definitions.
2. Conditionally render the widget in `[slug].astro` and `LocalizedToolPage.astro` using Astro expressions.
3. Bind script event hooks in `src/scripts/workspace/index.ts` if the flag is enabled.
