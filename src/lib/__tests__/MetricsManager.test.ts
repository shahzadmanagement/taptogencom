import { describe, it, expect, beforeEach } from 'vitest';
import { MetricsManager } from '../MetricsManager';

describe('MetricsManager', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="char-counter"></div>
      <div id="uni-counter"></div>
      <div id="word-counter"></div>
      <div id="line-counter"></div>
    `;
  });

  it('handles empty input gracefully', () => {
    MetricsManager.update('', { chars: true, glyphs: true, words: true, lines: true });
    
    expect(document.getElementById('char-counter')?.textContent).toBe('0 chars');
    expect(document.getElementById('uni-counter')?.textContent).toBe('0 glyphs');
    expect(document.getElementById('word-counter')?.textContent).toBe('0 words');
    expect(document.getElementById('line-counter')?.textContent).toBe('0 lines');
  });

  it('counts standard letters and spaces', () => {
    MetricsManager.update('Hello World\nLine 2', { chars: true, glyphs: true, words: true, lines: true });
    
    expect(document.getElementById('char-counter')?.textContent).toBe('18 chars');
    expect(document.getElementById('uni-counter')?.textContent).toBe('18 glyphs');
    expect(document.getElementById('word-counter')?.textContent).toBe('4 words');
    expect(document.getElementById('line-counter')?.textContent).toBe('2 lines');
  });

  it('accurately counts emoji and surrogate pairs', () => {
    // Emojis are multi-byte character strings
    MetricsManager.update('⚡🔥🚀', { chars: true, glyphs: true, words: true, lines: true });
    
    // JS length of "⚡🔥🚀" is 6 characters because of surrogate pairs
    expect(document.getElementById('char-counter')?.textContent).toBe('6 chars');
    // Glyph counting spreads surrogate pairs, counting individual icons correctly
    expect(document.getElementById('uni-counter')?.textContent).toBe('3 glyphs');
  });
});
