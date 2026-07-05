export interface ToolConfig {
  slug: string;
  counters: {
    chars: boolean;
    glyphs: boolean;
    words: boolean;
    lines: boolean;
  };
  previews: string[];
  exporters: string[];
  favorites: boolean;
  history: boolean;
  search: boolean;
  shuffle: boolean;
  shortcuts: boolean;
  compatibilityBadges: boolean;
}

export const config: ToolConfig = {
  slug: 'fancy-text-generator',
  counters: { chars: true, glyphs: true, words: true, lines: true },
  previews: ['ig', 'fb', 'tw', 'ds', 'wa', 'tt', 'tg', 'yt', 'tv', 'un'],
  exporters: ['txt', 'html', 'json'],
  favorites: true,
  history: true,
  search: true,
  shuffle: true,
  shortcuts: true,
  compatibilityBadges: true
};
