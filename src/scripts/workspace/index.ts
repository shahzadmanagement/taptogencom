import { toolConfigs } from '../../config';
import { getFeatureFlags } from '../../platform/featureFlags';
import { logger } from '../../platform/logger';
import { startMark, endMark } from '../../platform/performance';
import { analytics } from '../../platform/analytics';
import { errorReporter } from '../../platform/errorReporter';
import { wrapErrorBoundary } from '../../platform/errorBoundary';
import { observeBundlePerformance, initPerformanceObservers } from '../../platform/bundleAnalyzer';
import { initResourcePrefetchRules } from '../../platform/resourceHints';
import { runClientExperiments } from './experiments';
import { productAnalytics } from '../../lib/product-analytics';
import { errorMonitor } from '../../lib/error-monitor';
import { performanceMonitor } from '../../lib/performance-monitor';
import { searchUi } from '../search-ui';

// Initialize global observability listeners immediately on import load
errorReporter.init();
initPerformanceObservers();
initResourcePrefetchRules();
errorMonitor.init();
performanceMonitor.init();
productAnalytics.initSession();

export const createWorkspace = wrapErrorBoundary(async function (
  toolSlug: string,
  input: HTMLTextAreaElement,
  output: HTMLElement,
  generate: () => void
) {
  startMark('workspace-init');
  logger.info(`Initializing workspace for "${toolSlug}"`);

  let activeConfig = toolConfigs[toolSlug];
  if (!activeConfig) {
    const isNameGen = toolSlug.includes('name-generator') || toolSlug.includes('names-generator') || toolSlug.includes('generator-name') || toolSlug.endsWith('-name') || toolSlug === 'cursive-name-generator';
    const isWriting = toolSlug.includes('paragraph') || toolSlug.includes('sentence') || toolSlug.includes('story') || toolSlug.includes('article') || toolSlug.includes('essay') || toolSlug.includes('blog') || toolSlug.includes('description') || toolSlug.includes('bio') || toolSlug.includes('caption') || toolSlug.includes('review') || toolSlug.includes('headline') || toolSlug.includes('title') || toolSlug.includes('email') || toolSlug.includes('letter') || toolSlug.includes('summary') || toolSlug.includes('rewrite') || toolSlug.includes('writing') || toolSlug.includes('prompt') || toolSlug.includes('post-generator') || toolSlug.includes('hook');
    const isDevUtility = toolSlug.includes('meta-tag') || toolSlug.includes('robots') || toolSlug.includes('hreflang') || toolSlug.includes('schema') || toolSlug.includes('slug') || toolSlug.includes('hash') || toolSlug.includes('canonical') || toolSlug.includes('sitemap') || toolSlug.includes('redirect') || toolSlug.includes('tag-generator') || toolSlug.includes('tags-generator');
    const isBusiness = toolSlug.includes('business') || toolSlug.includes('domain') || toolSlug.includes('product') || toolSlug.includes('slogan') || toolSlug.includes('invoice') || toolSlug.includes('receipt') || toolSlug.includes('email-signature') || toolSlug.includes('sku') || toolSlug.includes('coupon') || toolSlug.includes('agenda') || toolSlug.includes('minutes') || toolSlug.includes('startup') || toolSlug.includes('brand-kit') || toolSlug.includes('tagline') || toolSlug.includes('poster') || toolSlug.includes('flyer');
    const isLegal = toolSlug.includes('policy') || toolSlug.includes('terms') || toolSlug.includes('disclaimer') || toolSlug.includes('disclosure');
    
    const { mergeConfig } = await import('../../config/base');
    activeConfig = mergeConfig(toolSlug, {
      counters: { chars: true, glyphs: false, words: true, lines: true },
      previews: (isNameGen || isBusiness) ? ['ig', 'tw'] : ['ig', 'fb', 'tw', 'ds', 'wa', 'tt', 'tg', 'yt', 'tv', 'un'],
      history: true,
      search: true,
      favorites: true,
      shortcuts: true,
      exporters: (isNameGen || isDevUtility || isBusiness || isLegal) ? ['txt', 'csv', 'html', 'json'] : ['txt', 'html', 'json', 'csv']
    });
  }

  if (!activeConfig) {
    logger.error(`No configuration found for workspace "${toolSlug}"`);
    endMark('workspace-init');
    return;
  }

  // Launch A/B Experiments for the workspace
  runClientExperiments(toolSlug);
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
    const { injectDebugPanel } = await import('../../lib/ab-testing');
    injectDebugPanel();
    const { injectFlagsTab } = await import('../../lib/feature-flags');
    injectFlagsTab();
  }

  // Launch Search UI
  searchUi.init();

  const flags = getFeatureFlags(activeConfig);
  const prefix = toolSlug.split('-')[0];
  const randomBtn = document.getElementById('btn-case-random-style');

  if (flags.enableFavorites) {
    const { initFavorites } = await import('./favorites');
    initFavorites(activeConfig);
  }

  if (flags.enablePreviews) {
    const { initPreviews } = await import('./previews');
    initPreviews(activeConfig);
  }

  if (flags.enableSearch) {
    const { initSearch } = await import('./search');
    initSearch(activeConfig);
  }

  if (flags.enableShuffle) {
    const { initShuffle } = await import('./shuffle');
    initShuffle(activeConfig);
  }

  if (flags.enableExport) {
    const { initDownloads } = await import('./downloads');
    initDownloads(activeConfig);
  }

  const { bindEvents } = await import('./events');
  const updateCountersAndFeatures = bindEvents(activeConfig, input, output, generate);

  if (flags.enableShortcuts) {
    const { bindShortcuts } = await import('./shortcuts');
    bindShortcuts(activeConfig, input, updateCountersAndFeatures, generate);
  }

  if (randomBtn) {
    randomBtn.addEventListener('click', async () => {
      const { pickRandomStyle } = await import('./render');
      pickRandomStyle();
      analytics.trackShortcut('Alt+R');
    });
  }

  // Font Size Slider initialization
  const slider = document.getElementById('font-size-slider') as HTMLInputElement | null;
  if (slider && output && output.style && typeof output.style.setProperty === 'function') {
    const cachedSize = typeof localStorage !== 'undefined' ? localStorage.getItem('taptogen-font-size') : null;
    if (cachedSize) {
      slider.value = cachedSize;
      output.style.setProperty('--intent-font-size', cachedSize + 'px');
    } else {
      output.style.setProperty('--intent-font-size', slider.value + 'px');
    }
    slider.addEventListener('input', () => {
      output.style.setProperty('--intent-font-size', slider.value + 'px');
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('taptogen-font-size', slider.value);
      }
    });
  }

  if (flags.enableHistory) {
    const { initHistory } = await import('./history');
    initHistory(activeConfig, output);
  }

  const copyBtnAll = document.getElementById('copy-btn');
  const workspaceEl = document.getElementById('tool-workspace');
  const isTextTransform = workspaceEl?.dataset.type === 'text-transform';
  if (copyBtnAll && isTextTransform) {
    const newCopyBtn = copyBtnAll.cloneNode(true) as HTMLElement;
    copyBtnAll.parentNode?.replaceChild(newCopyBtn, copyBtnAll);
    
    newCopyBtn.addEventListener('click', async () => {
      const visibleCards = Array.from(document.querySelectorAll('.intent-style-card, .intent-wide-card, .result-card'))
        .filter(card => (card as HTMLElement).style.display !== 'none');
      
      const copyTextList = visibleCards.map(card => {
        const name = card.querySelector('.result-label')?.textContent?.trim() || '';
        const preview = card.querySelector('.intent-preview-text, .intent-section-pre, .result-text')?.textContent || '';
        return name ? `${name}: ${preview}` : preview;
      }).filter(Boolean).join('\n');
      
      if (copyTextList) {
        const { ClipboardHelper } = await import('./clipboard');
        await ClipboardHelper.copy(copyTextList, newCopyBtn);
        analytics.trackExport('copy_all', visibleCards.length);
      }
    });
  }

  if (input.value) {
    updateCountersAndFeatures();
  }

  const duration = endMark('workspace-init');
  logger.info(`Workspace for "${toolSlug}" successfully initialized in ${duration.toFixed(2)}ms`);

  setTimeout(() => {
    observeBundlePerformance();
  }, 1000);
});
