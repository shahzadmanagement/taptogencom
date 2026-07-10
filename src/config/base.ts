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

export const DEFAULT_CONFIG: Omit<ToolConfig, 'slug'> = {
  counters: { chars: true, words: true, glyphs: false, lines: false },
  search: false,
  shuffle: false,
  favorites: false,
  history: false,
  previews: [],
  exporters: [],
  shortcuts: false
};

export function mergeConfig(slug: string, custom: Partial<Omit<ToolConfig, 'slug'>>): ToolConfig {
  return {
    slug,
    counters: { ...DEFAULT_CONFIG.counters, ...custom.counters },
    search: custom.search ?? DEFAULT_CONFIG.search,
    shuffle: custom.shuffle ?? DEFAULT_CONFIG.shuffle,
    favorites: custom.favorites ?? DEFAULT_CONFIG.favorites,
    history: custom.history ?? DEFAULT_CONFIG.history,
    previews: custom.previews ?? DEFAULT_CONFIG.previews,
    exporters: custom.exporters ?? DEFAULT_CONFIG.exporters,
    shortcuts: custom.shortcuts ?? DEFAULT_CONFIG.shortcuts
  };
}
