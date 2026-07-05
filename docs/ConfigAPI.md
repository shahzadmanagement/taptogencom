# Configuration Schema API

This document details properties for registry settings.

---

## 1. Schema Properties

```typescript
export interface ToolConfig {
  slug: string;
  counters: {
    chars: boolean;
    words: boolean;
    glyphs: boolean;
    lines: boolean;
  };
  search: boolean;
  shuffle: boolean;
  favorites: boolean;
  history: boolean;
  previews: string[];
  exporters: string[];
  shortcuts: boolean;
}
```

### Config Options
* **`slug`**: The target page URL slug matches.
* **`counters`**: Toggles displaying specific character metrics.
* **`search`**: Toggles displaying style search bars.
* **`shuffle`**: Toggles matrix randomizers.
* **`favorites`**: Enables pinning stars.
* **`history`**: Session history logs flags.
* **`previews`**: Enabled social tabs previews profiles.
* **`exporters`**: Enabled download format outputs.
* **`shortcuts`**: ALT hotkeys options.
