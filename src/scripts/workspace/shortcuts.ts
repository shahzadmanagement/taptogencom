import type { ToolConfig } from '../../config';
import { ClipboardHelper } from './clipboard';

export function bindShortcuts(
  config: ToolConfig,
  input: HTMLTextAreaElement,
  updateCountersAndFeatures: () => void,
  generate: () => void
) {
  const shuffleBtn = document.getElementById('btn-shuffle-styles');
  const randomBtn = document.getElementById('btn-case-random-style');
  const resetBtn = document.getElementById('reset-btn');

  const listener = (event: KeyboardEvent) => {
    const activeEl = document.activeElement;
    const isEditing = activeEl && (
      activeEl.tagName === 'INPUT' ||
      activeEl.tagName === 'TEXTAREA' ||
      activeEl.tagName === 'SELECT' ||
      (activeEl as HTMLElement).isContentEditable
    );

    // '/' to Focus Input when not already editing an input/textarea
    if (event.key === '/' && !isEditing) {
      event.preventDefault();
      if (input) {
        input.focus();
        input.select();
      }
      return;
    }

    // Ctrl+Enter or Cmd+Enter to Generate output instantly
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      generate();
      return;
    }

    // Ctrl+Shift+C or Cmd+Shift+C to Copy primary output
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && (event.key === 'C' || event.key === 'c')) {
      event.preventDefault();
      const output = document.getElementById('tool-output');
      const copyBtn = document.getElementById('copy-btn');
      if (output && output.textContent && !output.classList.contains('empty')) {
        const text = output.dataset.copyText || output.textContent.trim();
        ClipboardHelper.copy(text, copyBtn || undefined);
      }
      return;
    }

    // Ctrl+Shift+E or Cmd+Shift+E to Trigger Export
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && (event.key === 'E' || event.key === 'e')) {
      event.preventDefault();
      const exportBtn = document.getElementById('btn-download-txt') ||
        document.getElementById('btn-download-json') ||
        document.getElementById('btn-download-csv') ||
        document.getElementById('btn-download-md');
      if (exportBtn) {
        exportBtn.click();
      }
      return;
    }

    // Escape to close open modals or reset workspace input
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

      if (activeEl === input || activeEl === document.body || !isEditing) {
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
