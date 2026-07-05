import { mergeConfig, type ToolConfig } from './index';

export const config: ToolConfig = mergeConfig('bold-text-generator', {
  counters: { chars: true, glyphs: false, words: true, lines: false },
  previews: ['ig', 'tw'],
  history: true,
  search: true
});
