import type { ToolConfig } from '../../config';

export function bindShortcuts(
  config: ToolConfig,
  input: HTMLTextAreaElement,
  updateCountersAndFeatures: () => void,
  generate: () => void
) {
  if (!config.shortcuts) return;

  const shuffleBtn = document.getElementById('btn-shuffle-styles');
  const randomBtn = document.getElementById('btn-case-random-style');
  const resetBtn = document.getElementById('reset-btn');

  const listener = (event: KeyboardEvent) => {
    // Ctrl+Enter or Cmd+Enter to generate output instantly
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      generate();
      return;
    }

    // Escape to close open modals/dialogs or reset input
    if (event.key === 'Escape') {
      const modal = document.querySelector('.modal.open, dialog[open]');
      if (modal) {
        if ('close' in modal && typeof (modal as any).close === 'function') {
          (modal as any).close();
        } else {
          modal.classList.remove('open');
        }
        return;
      }

      const activeEl = document.activeElement;
      if (activeEl === input || activeEl === document.body) {
        if (resetBtn) {
          resetBtn.click();
        } else if (input) {
          input.value = '';
          generate();
          updateCountersAndFeatures();
        }
      }
    }

    if (event.altKey && event.key.toLowerCase() === 's') {
      event.preventDefault();
      shuffleBtn?.click();
    }
    if (event.altKey && event.key.toLowerCase() === 'r') {
      event.preventDefault();
      randomBtn?.click();
    }
  };

  document.addEventListener('keydown', listener);
  return () => document.removeEventListener('keydown', listener);
}

