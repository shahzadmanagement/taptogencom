export class MetricsManager {
  static update(
    text: string,
    config: { chars: boolean; glyphs: boolean; words: boolean; lines: boolean }
  ): void {
    if (config.chars) {
      const el = document.getElementById('char-counter');
      if (el) el.textContent = `${text.length} chars`;
    }
    if (config.glyphs) {
      const el = document.getElementById('uni-counter');
      if (el) el.textContent = `${[...text].length} glyphs`;
    }
    if (config.words) {
      const el = document.getElementById('word-counter');
      if (el) {
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        el.textContent = `${words} words`;
      }
    }
    if (config.lines) {
      const el = document.getElementById('line-counter');
      if (el) {
        const lines = text ? text.split('\n').length : 0;
        el.textContent = `${lines} lines`;
      }
    }
  }
}
