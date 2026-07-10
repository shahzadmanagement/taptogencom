import { mergeConfig, type ToolConfig } from './base';

export const config: ToolConfig = mergeConfig('vaporwave-text-generator', {
  counters: { chars: true, glyphs: false, words: true, lines: false }
});
