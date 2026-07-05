import { toolConfigs } from '../../config';

export async function createWorkspace(
  toolSlug: string,
  input: HTMLTextAreaElement,
  output: HTMLElement,
  generate: () => void
) {
  const activeConfig = toolConfigs[toolSlug];
  if (!activeConfig) return;

  const prefix = toolSlug.split('-')[0];
  const randomBtn = document.getElementById('btn-case-random-style');

  // Dynamic Lazy-Loading based on configuration toggles
  if (activeConfig.favorites) {
    const { initFavorites } = await import('./favorites');
    initFavorites(activeConfig);
  }

  if (activeConfig.previews.length > 0) {
    const { initPreviews } = await import('./previews');
    initPreviews(activeConfig);
  }

  if (activeConfig.search) {
    const { initSearch } = await import('./search');
    initSearch(activeConfig);
  }

  if (activeConfig.shuffle) {
    const { initShuffle } = await import('./shuffle');
    initShuffle(activeConfig);
  }

  if (activeConfig.exporters.length > 0) {
    const { initDownloads } = await import('./downloads');
    initDownloads(activeConfig);
  }

  const { bindEvents } = await import('./events');
  const updateCountersAndFeatures = bindEvents(activeConfig, input, output, generate);

  if (activeConfig.shortcuts) {
    const { bindShortcuts } = await import('./shortcuts');
    bindShortcuts(activeConfig, input, updateCountersAndFeatures, generate);
  }

  if (randomBtn) {
    randomBtn.addEventListener('click', async () => {
      const { pickRandomStyle } = await import('./render');
      pickRandomStyle();
    });
  }

  if (activeConfig.history) {
    const { initHistory } = await import('./history');
    initHistory(activeConfig, output);
  }

  const copyBtnAll = document.getElementById('copy-btn');
  if (copyBtnAll) {
    const newCopyBtn = copyBtnAll.cloneNode(true) as HTMLElement;
    copyBtnAll.parentNode?.replaceChild(newCopyBtn, copyBtnAll);
    
    newCopyBtn.addEventListener('click', async () => {
      const visibleCards = Array.from(document.querySelectorAll('.intent-style-card'))
        .filter(card => (card as HTMLElement).style.display !== 'none');
      
      const copyTextList = visibleCards.map(card => {
        const name = card.querySelector('.result-label')?.textContent?.trim() || '';
        const preview = card.querySelector('.intent-preview-text')?.textContent || '';
        return `${name}: ${preview}`;
      }).join('\n');
      
      if (copyTextList) {
        const { ClipboardHelper } = await import('./clipboard');
        await ClipboardHelper.copy(copyTextList, newCopyBtn);
      }
    });
  }

  if (input.value) {
    updateCountersAndFeatures();
  }
}
