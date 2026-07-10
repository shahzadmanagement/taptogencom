import { mergeConfig, type ToolConfig } from './base';

export const config: ToolConfig = mergeConfig('fancy-text-generator', {
  counters: { chars: true, glyphs: true, words: true, lines: true },
  previews: ['ig', 'fb', 'tw', 'ds', 'wa', 'tt', 'tg', 'yt', 'tv', 'un'],
  exporters: ['txt', 'html', 'json'],
  favorites: true,
  history: true,
  search: true,
  shuffle: true,
  shortcuts: true
});
