import { toolConfigs } from '../../config';
import { initFavorites } from './favorites';
import { initHistory } from './history';
import { initPreviews } from './previews';
import { initSearch } from './search';
import { initShuffle } from './shuffle';
import { initDownloads } from './downloads';
import { bindShortcuts } from './shortcuts';
import { bindEvents } from './events';
import { pickRandomStyle } from './render';
import { ClipboardHelper } from './clipboard';

export function createWorkspace(
  toolSlug: string,
  input: HTMLTextAreaElement,
  output: HTMLElement,
  generate: () => void
) {
  const activeConfig = toolConfigs[toolSlug];
  if (!activeConfig) return;

  const prefix = toolSlug.split('-')[0];
  const historyListId = `${prefix}-history-list`;
  const randomBtn = document.getElementById('btn-case-random-style');

  initFavorites(activeConfig);
  initPreviews(activeConfig);
  initSearch(activeConfig);
  initShuffle(activeConfig);
  initDownloads(activeConfig);

  const updateCountersAndFeatures = bindEvents(activeConfig, input, output, generate);

  if (activeConfig.shortcuts) {
    bindShortcuts(activeConfig, input, updateCountersAndFeatures, generate);
  }

  randomBtn?.addEventListener('click', () => {
    pickRandomStyle();
  });

  if (activeConfig.history) {
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
        await ClipboardHelper.copy(copyTextList, newCopyBtn);
      }
    });
  }

  if (input.value) {
    updateCountersAndFeatures();
  }
}
