import type { ToolConfig } from '../../config';

export function filterStyles(query: string) {
  const cleanQuery = query.toLowerCase().trim();
  document.querySelectorAll('.intent-style-card').forEach(card => {
    const label = card.querySelector('.result-label')?.textContent?.toLowerCase() || '';
    const use = card.querySelector('.intent-mini-note')?.textContent?.toLowerCase() || '';
    if (label.includes(cleanQuery) || use.includes(cleanQuery)) {
      (card as HTMLElement).style.display = '';
    } else {
      (card as HTMLElement).style.display = 'none';
    }
  });
}

export function initSearch(config: ToolConfig) {
  if (!config.search) return;
  const prefix = config.slug.split('-')[0];
  const input = document.getElementById(`${prefix}-style-search`) as HTMLInputElement;
  input?.addEventListener('input', () => {
    filterStyles(input.value);
  });
}
