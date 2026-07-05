import type { ToolConfig } from '../../config';
import { updateMetrics } from './metrics';
import { updatePreviews } from './previews';
import { syncFavorites } from './favorites';

export function bindEvents(
  config: ToolConfig,
  input: HTMLTextAreaElement,
  output: HTMLElement,
  generate: () => void
) {
  const prefix = config.slug.split('-')[0];
  const searchContainer = document.getElementById('style-search-container');
  const extensionsContainer = document.getElementById(`${prefix}-extensions-container`);
  const mockupTargets = document.querySelectorAll('.mockup-preview-target');

  const updateCountersAndFeatures = () => {
    const textVal = input.value;
    updateMetrics(textVal, config.counters);

    if (searchContainer) searchContainer.style.display = textVal ? 'block' : 'none';
    if (extensionsContainer) extensionsContainer.style.display = textVal ? 'block' : 'none';

    updatePreviews(textVal, mockupTargets);

    if (config.favorites) {
      syncFavorites();
    }
  };

  input?.addEventListener('input', () => {
    generate();
    updateCountersAndFeatures();
  });

  const observer = new MutationObserver(updateCountersAndFeatures);
  if (output) {
    observer.observe(output, { childList: true, subtree: true });
  }

  document.getElementById('btn-case-lower')?.addEventListener('click', () => {
    input.value = input.value.toLowerCase();
    generate();
    updateCountersAndFeatures();
  });
  document.getElementById('btn-case-upper')?.addEventListener('click', () => {
    input.value = input.value.toUpperCase();
    generate();
    updateCountersAndFeatures();
  });
  document.getElementById('btn-case-title')?.addEventListener('click', () => {
    input.value = input.value.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    generate();
    updateCountersAndFeatures();
  });
  document.getElementById('btn-case-sentence')?.addEventListener('click', () => {
    const val = input.value.trim();
    if (val) {
      input.value = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
    }
    generate();
    updateCountersAndFeatures();
  });

  return updateCountersAndFeatures;
}
