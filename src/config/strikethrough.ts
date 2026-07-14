import { mergeConfig, type ToolConfig } from './base';

export const config: ToolConfig = mergeConfig('strikethrough-text-generator', {
  counters: { chars: true, glyphs: false, words: true, lines: false },
  previews: ['ig', 'tw'],
  history: true,
  search: true,
  favorites: true,
  shortcuts: true
});
