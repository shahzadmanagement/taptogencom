import { checkDomainAvailability, getCachedResult, DomainCheckQueue, type DomainCheckResult, type DomainStatus } from '../../lib/domain-availability';
import type { ToolConfig } from '../../config';

const NAME_TOOLS = new Set([
  'business-name-generator',
  'domain-name-generator',
  'startup-name-generator',
  'brand-name-generator',
  'company-name-generator',
  'channel-name-generator',
  'club-name-generator',
  'hotel-name-generator',
  'salon-name-generator',
  'farm-name-generator',
  'restaurant-name-generator'
]);

let currentQueue: DomainCheckQueue | null = null;
let currentAbortController: AbortController | null = null;

export function isNameGenerator(slug: string): boolean {
  return NAME_TOOLS.has(slug) || slug.includes('name-generator');
}

export function renderDomainBadge(container: HTMLElement, result: DomainCheckResult, onRetry?: () => void) {
  const isFr = typeof document !== 'undefined' && document.documentElement ? document.documentElement.lang === 'fr' : false;

  let badge = container.querySelector('.domain-badge') as HTMLElement | null;
  if (!badge) {
    badge = document.createElement('div');
    badge.className = 'domain-badge';
    badge.style.cssText = 'margin-top: 6px; display: inline-flex; align-items: center; gap: 6px; font-size: 0.75rem; border-radius: 6px; padding: 3px 8px; font-weight: 500; transition: all 0.2s;';
    container.appendChild(badge);
  }

  if (result.status === 'checking') {
    badge.style.background = 'rgba(99, 102, 241, 0.12)';
    badge.style.color = '#818cf8';
    badge.style.border = '1px solid rgba(99, 102, 241, 0.3)';
    badge.innerHTML = `
      <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #818cf8; animation: pulse 1s infinite;"></span>
      <span>${isFr ? 'Vérification...' : 'Checking...'}</span>
    `;
    badge.setAttribute('aria-label', `Checking domain ${result.domain}`);
  } else if (result.status === 'available') {
    badge.style.background = 'rgba(34, 197, 94, 0.15)';
    badge.style.color = '#4ade80';
    badge.style.border = '1px solid rgba(34, 197, 94, 0.3)';
    badge.innerHTML = `
      <span>✔ ${result.domain} ${isFr ? 'Disponible' : 'Available'}</span>
      <a href="https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(result.domain)}" target="_blank" rel="noopener noreferrer" style="color: #4ade80; text-decoration: underline; margin-left: 4px; font-weight: 600;">${isFr ? 'Acheter' : 'Buy'}</a>
    `;
    badge.setAttribute('aria-label', `Domain ${result.domain} is available`);
  } else if (result.status === 'registered') {
    badge.style.background = 'rgba(239, 68, 68, 0.12)';
    badge.style.color = '#f87171';
    badge.style.border = '1px solid rgba(239, 68, 68, 0.2)';
    badge.innerHTML = `<span>✖ ${result.domain} ${isFr ? 'Pris' : 'Taken'}</span>`;
    badge.setAttribute('aria-label', `Domain ${result.domain} is taken`);
  } else {
    // Unknown / Error
    badge.style.background = 'rgba(148, 163, 184, 0.12)';
    badge.style.color = '#94a3b8';
    badge.style.border = '1px solid rgba(148, 163, 184, 0.2)';
    badge.innerHTML = `
      <span>❓ ${result.domain} ${isFr ? 'Inconnu' : 'Unknown'}</span>
      <button type="button" class="btn-retry-domain" style="background: none; border: none; color: #818cf8; text-decoration: underline; cursor: pointer; padding: 0 4px; font-size: 0.72rem;">${isFr ? 'Réessayer' : 'Retry'}</button>
    `;
    badge.setAttribute('aria-label', `Domain check for ${result.domain} returned unknown state`);

    const retryBtn = badge.querySelector('.btn-retry-domain');
    retryBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (onRetry) onRetry();
    });
  }
}

export function bindDomainAvailability(config: ToolConfig) {
  if (!isNameGenerator(config.slug) || typeof document === 'undefined') return;

  const workspace = document.getElementById('tool-workspace');
  if (!workspace) return;

  // Insert Bulk Domain Check Toolbar Button if not existing
  let checkAllBtn = document.getElementById('btn-check-domains');
  if (!checkAllBtn) {
    const newBtn = document.createElement('button');
    newBtn.id = 'btn-check-domains';
    newBtn.className = 'btn btn-ghost';
    newBtn.type = 'button';
    newBtn.title = 'Check Live Domain Availability via Cloudflare DoH';
    newBtn.style.cssText = 'padding: 6px 12px; font-size: 0.8rem; border-radius: 8px; margin-left: 8px; border: 1px solid var(--color-border);';
    newBtn.innerHTML = '🌐 Check Domains';

    const actionsGroup = workspace.querySelector('.workspace-actions, .input-actions, .actions');
    if (actionsGroup) {
      actionsGroup.appendChild(newBtn);
    }
    checkAllBtn = newBtn;
  }

  // Debounced bulk check trigger on output update
  let debounceTimer: any = null;
  const triggerBulkCheck = () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      executeBulkCheck(config.slug);
    }, 400);
  };

  checkAllBtn.addEventListener('click', () => {
    executeBulkCheck(config.slug, true);
  });

  // Watch for dynamic card generation in workspace output
  const outputEl = document.getElementById('tool-output');
  if (outputEl) {
    const observer = new MutationObserver(() => {
      triggerBulkCheck();
    });
    observer.observe(outputEl, { childList: true, subtree: true });
  }

  triggerBulkCheck();
}

export function executeBulkCheck(toolSlug: string, force: boolean = false) {
  if (typeof document === 'undefined') return;

  if (currentAbortController) {
    currentAbortController.abort();
  }
  currentAbortController = new AbortController();

  if (!currentQueue) {
    currentQueue = new DomainCheckQueue();
  } else {
    currentQueue.clear();
  }

  const cards = Array.from(document.querySelectorAll('.intent-style-card, .result-card, .intent-idea-card'));
  if (cards.length === 0) return;

  cards.forEach(card => {
    const cardEl = card as HTMLElement;
    const rawName = cardEl.querySelector('.result-label, .intent-idea-name, .result-text')?.textContent?.trim() || cardEl.getAttribute('data-style-name') || '';
    if (!rawName) return;

    const cleanName = rawName.toLowerCase().replace(/[^a-z0-9\-]/g, '');
    if (!cleanName || cleanName.length < 2) return;

    const domain = `${cleanName}.com`;

    // If already cached and not forced, render immediately
    const cached = getCachedResult(domain);
    if (cached && !force) {
      renderDomainBadge(cardEl, cached, () => checkSingleDomain(cardEl, cleanName, 'com'));
      return;
    }

    renderDomainBadge(cardEl, { domain, name: cleanName, tld: 'com', status: 'checking', timestamp: Date.now() });

    currentQueue?.add(async () => {
      const result = await checkDomainAvailability(cleanName, 'com', currentAbortController?.signal);
      renderDomainBadge(cardEl, result, () => checkSingleDomain(cardEl, cleanName, 'com'));
    });
  });
}

async function checkSingleDomain(container: HTMLElement, name: string, tld: string) {
  const domain = `${name}.${tld}`;
  renderDomainBadge(container, { domain, name, tld, status: 'checking', timestamp: Date.now() });

  const result = await checkDomainAvailability(name, tld);
  renderDomainBadge(container, result, () => checkSingleDomain(container, name, tld));
}
