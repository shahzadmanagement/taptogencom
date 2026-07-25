import { ClipboardHelper } from './clipboard';

export function renderEmptyState(outputEl: HTMLElement, toolSlug: string, isFr: boolean = true) {
  if (!outputEl) return;

  outputEl.classList.add('empty');
  outputEl.innerHTML = `
    <div class="empty-state-wrapper" style="padding: 24px; text-align: center; background: rgba(255,255,255,0.02); border: 1px dashed var(--color-border, rgba(255,255,255,0.15)); border-radius: 12px; margin: 12px 0;">
      <div style="font-size: 2rem; margin-bottom: 8px; filter: drop-shadow(0 2px 8px rgba(99, 102, 241, 0.4));">⚡</div>
      <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 6px; color: var(--color-text-primary, #f1f5f9);">${isFr ? 'Prêt à générer vos résultats' : 'Ready to generate results'}</h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #94a3b8); max-width: 420px; margin: 0 auto 16px;">
        ${isFr ? 'Saisissez vos préférences ou choisissez un exemple ci-dessus, puis cliquez sur <strong>Générer</strong> pour obtenir des résultats instantanés.' : 'Enter your options or select an example above, then click <strong>Generate</strong> for instant output.'}
      </p>
    </div>
  `;
}

export function setLoadingState(outputEl: HTMLElement, isLoading: boolean) {
  if (!outputEl) return;

  if (isLoading) {
    outputEl.classList.add('loading');
    outputEl.setAttribute('aria-busy', 'true');
    const isFr = document.documentElement.lang === 'fr';

    // Show lightweight non-blocking pulse indicator
    outputEl.innerHTML = `
      <div class="loading-state-wrapper" style="padding: 30px; text-align: center;">
        <div class="loading-spinner" style="display: inline-block; width: 32px; height: 32px; border: 3px solid rgba(99, 102, 241, 0.2); border-top-color: #6366f1; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
        <p style="margin-top: 12px; font-size: 0.9rem; font-weight: 500; color: var(--color-text-muted, #94a3b8);">${isFr ? 'Génération en cours...' : 'Generating...'}</p>
      </div>
      <style>
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .loading-spinner { animation: none !important; border-top-color: #6366f1 !important; opacity: 0.7; }
        }
      </style>
    `;
  } else {
    outputEl.classList.remove('loading');
    outputEl.removeAttribute('aria-busy');
  }
}

export function initMobileActionBar(
  inputEl: HTMLTextAreaElement,
  outputEl: HTMLElement,
  generateFn: () => void
) {
  if (typeof document === 'undefined') return;

  const mobileGenBtn = document.getElementById('mobile-generate-btn');
  const mobileCopyBtn = document.getElementById('mobile-copy-btn');
  const mobileDownloadBtn = document.getElementById('mobile-download-btn');
  const mobileResetBtn = document.getElementById('mobile-reset-btn');

  mobileGenBtn?.addEventListener('click', () => {
    generateFn();
    window.scrollTo({ top: outputEl.offsetTop - 80, behavior: 'smooth' });
  });

  mobileCopyBtn?.addEventListener('click', async () => {
    const textToCopy = outputEl.dataset.copyText || outputEl.textContent || '';
    await ClipboardHelper.copy(textToCopy, mobileCopyBtn);
  });

  mobileDownloadBtn?.addEventListener('click', () => {
    const downloadTxtBtn = document.getElementById('download-txt-btn');
    if (downloadTxtBtn) {
      downloadTxtBtn.click();
    } else {
      const text = outputEl.dataset.copyText || outputEl.textContent || '';
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'results.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  });

  mobileResetBtn?.addEventListener('click', () => {
    if (inputEl) inputEl.value = '';
    renderEmptyState(outputEl, '', document.documentElement.lang === 'fr');
    delete outputEl.dataset.copyText;
  });
}
