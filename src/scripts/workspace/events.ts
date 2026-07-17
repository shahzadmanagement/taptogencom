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

  if (config.slug === 'fancy-text-generator' && typeof document.createElement === 'function') {
    const toolbar = document.createElement('div');
    toolbar.className = 'quick-symbol-toolbar';
    toolbar.style.cssText = 'display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; border-bottom: 1px solid var(--color-border); padding-bottom: 8px;';
    
    const symbols = [
      '★', '♥', '✿', '⚡', '👑', '✈', '♫', '꧂', '꧁', '✨', '🎵', '💖',
      '(✿◠‿◠)', '(づ｡◕‿‿◕｡)づ', '(●\'◡\'●)', '(ง\'̀-\'́)ง', '(ᵔᴥᵔ)'
    ];

    symbols.forEach(sym => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-ghost';
      btn.style.cssText = 'padding: 4px 8px; font-size: 0.8rem; min-height: 28px; border-radius: 4px; background: var(--color-bg-secondary); border: 1px solid var(--color-border); cursor: pointer; transition: all 0.2s;';
      btn.textContent = sym;
      btn.addEventListener('click', () => {
        const start = input.selectionStart || 0;
        const end = input.selectionEnd || 0;
        const text = input.value;
        input.value = text.substring(0, start) + sym + text.substring(end);
        input.focus();
        input.setSelectionRange(start + sym.length, start + sym.length);
        generate();
        updateCountersAndFeatures();
      });
      toolbar.appendChild(btn);
    });

    input.parentNode?.insertBefore(toolbar, input);
  }

  const workspaceEl = document.getElementById('tool-workspace');
  const isTextTransform = workspaceEl?.dataset.type === 'text-transform';

  input?.addEventListener('input', () => {
    if (isTextTransform) {
      generate();
    }
    updateCountersAndFeatures();
  });

  const observer = new MutationObserver((mutations) => {
    const hasRealMutation = mutations.some(m => {
      const target = m.target as HTMLElement;
      if (target.classList?.contains('fav-btn') || target.parentElement?.classList?.contains('fav-btn')) {
        return false;
      }
      return true;
    });

    if (hasRealMutation) {
      observer.disconnect();
      updateCountersAndFeatures();
      if (output) {
        observer.observe(output, { childList: true, subtree: true });
      }
    }
  });
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

  document.getElementById('btn-case-random-style')?.addEventListener('click', () => {
    input.value = input.value.split('').map(char => Math.random() > 0.5 ? char.toLowerCase() : char.toUpperCase()).join('');
    generate();
    updateCountersAndFeatures();
  });

  return updateCountersAndFeatures;
}
