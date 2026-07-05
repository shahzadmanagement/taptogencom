import type { ToolConfig } from '../../config';

export function updatePreviews(textVal: string, targets: NodeListOf<Element>) {
  const firstPreview = document.querySelector('.intent-preview-text')?.textContent || textVal || 'Your text...';
  targets.forEach(el => {
    el.textContent = firstPreview;
  });
}

export function initPreviews(config: ToolConfig) {
  if (config.previews.length === 0) return;

  const tabs = document.querySelectorAll('.mockup-tab-group button');
  const panels = document.querySelectorAll('.mockup-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabName = (tab as HTMLElement).dataset.tab;
      panels.forEach(panel => {
        const isTarget = panel.id === `mockup-panel-${tabName}`;
        (panel as HTMLElement).style.display = isTarget ? 'block' : 'none';
      });
    });
  });
}
