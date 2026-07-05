import type { ToolConfig } from '../../config';
import { ClipboardHelper } from './clipboard';

const KEY = 'taptogen-history';

export function getHistory(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveHistory(items: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('History save failed: ', e);
  }
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function renderHistory(prefix: string) {
  const list = document.getElementById(`${prefix}-history-list`);
  if (!list) return;
  const items = getHistory();
  if (items.length === 0) {
    list.innerHTML = '<p style="color: var(--color-text-muted); font-size: 0.8rem; font-style: italic; margin: 0;">No copy history yet this session.</p>';
    return;
  }
  list.innerHTML = items.map(item => `
    <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid var(--color-border); border-radius: 8px; padding: 10px 14px; font-size: 0.85rem; margin-bottom: 8px;">
      <div style="font-family: monospace; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 80%; color: var(--color-text-primary);">${escapeHtml(item)}</div>
      <button class="copy-btn result-copy" type="button" data-copy="${escapeHtml(item)}" style="margin-top: 0; padding: 4px 8px; font-size: 0.75rem;">Copy</button>
    </div>
  `).join('');
}

export function initHistory(config: ToolConfig, output: HTMLElement) {
  if (!config.history) return;
  const prefix = config.slug.split('-')[0];

  output.addEventListener('click', async event => {
    const target = event.target as HTMLElement;
    const button = target.closest<HTMLElement>('[data-copy]');
    if (!button) return;
    const copiedText = button.dataset.copy || '';
    if (!copiedText) return;

    let items = getHistory();
    if (items.includes(copiedText)) {
      items = items.filter(i => i !== copiedText);
    }
    items.unshift(copiedText);
    if (items.length > 5) items.pop();

    saveHistory(items);
    renderHistory(prefix);
  });

  renderHistory(prefix);
}
