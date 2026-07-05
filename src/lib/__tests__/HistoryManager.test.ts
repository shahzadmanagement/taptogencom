import { describe, it, expect, beforeEach } from 'vitest';
import { HistoryManager } from '../HistoryManager';

describe('HistoryManager', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '<div id="test-history-list"></div>';
  });

  it('keeps logs under the queue size of 5', () => {
    HistoryManager.add('item 1');
    HistoryManager.add('item 2');
    HistoryManager.add('item 3');
    HistoryManager.add('item 4');
    HistoryManager.add('item 5');
    HistoryManager.add('item 6');

    const history = HistoryManager.get();
    expect(history.length).toBe(5);
    expect(history[0]).toBe('item 6');
  });

  it('renders history while escaping DOM injection targets', () => {
    HistoryManager.add('<script>alert("xss")</script>');
    
    const escapeHtml = (str: string) => str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    HistoryManager.renderUI('test-history-list', escapeHtml);

    const html = document.getElementById('test-history-list')?.innerHTML || '';
    expect(html).toContain('&lt;script&gt;alert("xss")&lt;/script&gt;');
    expect(html).not.toContain('<script>');
  });
});
