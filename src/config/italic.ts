import { mergeConfig, type ToolConfig } from './index';

export const config: ToolConfig = mergeConfig('italic-text-generator', {
  counters: { chars: true, glyphs: false, words: true, lines: false }
});
