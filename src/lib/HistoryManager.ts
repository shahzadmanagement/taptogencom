import { StorageManager } from './StorageManager';

export class HistoryManager {
  private static KEY = 'taptogen-history';

  static getHistory(): string[] {
    return StorageManager.get(this.KEY);
  }

  static add(item: string): string[] {
    if (!item) return this.getHistory();
    let history = this.getHistory();
    if (history.includes(item)) {
      history = history.filter(i => i !== item);
    }
    history.unshift(item);
    if (history.length > 5) history.pop();
    StorageManager.save(this.KEY, history);
    return history;
  }

  static renderUI(containerId: string, escapeHtml: (s: string) => string): void {
    const container = document.getElementById(containerId);
    if (!container) return;
    const history = this.getHistory();
    if (history.length === 0) {
      container.innerHTML = '<p style="color: var(--color-text-muted); font-size: 0.8rem; font-style: italic; margin: 0;">No copy history yet this session.</p>';
      return;
    }
    container.innerHTML = history.map(item => `
      <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid var(--color-border); border-radius: 8px; padding: 10px 14px; font-size: 0.85rem; margin-bottom: 8px;">
        <div style="font-family: monospace; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 80%; color: var(--color-text-primary);">${escapeHtml(item)}</div>
        <button class="copy-btn result-copy" type="button" data-copy="${escapeHtml(item)}" style="margin-top: 0; padding: 4px 8px; font-size: 0.75rem;">Copy</button>
      </div>
    `).join('');
  }
}
