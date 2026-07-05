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

  const listener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      const activeEl = document.activeElement;
      if (activeEl === input || activeEl === document.body) {
        input.value = '';
        generate();
        updateCountersAndFeatures();
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
