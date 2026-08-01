import type { CommandItem } from './types';
import { PaletteSearchEngine } from './search';
import { PaletteNavigationHandler } from './navigation';
import { togglePinCommand, getPinnedCommandIds } from './storage';

export class PaletteUIController {
  private modal: HTMLElement | null = null;
  private input: HTMLInputElement | null = null;
  private resultsContainer: HTMLElement | null = null;
  private searchEngine: PaletteSearchEngine;
  private navHandler: PaletteNavigationHandler;
  private isOpen: boolean = false;

  constructor() {
    this.searchEngine = new PaletteSearchEngine();
    this.navHandler = new PaletteNavigationHandler();
  }

  public init() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    this.createModalDOM();
    this.bindGlobalShortcuts();
  }

  public open() {
    if (!this.modal || this.isOpen) return;
    this.isOpen = true;
    this.modal.style.display = 'flex';
    this.modal.setAttribute('aria-hidden', 'false');

    if (this.input) {
      this.input.value = '';
      this.input.focus();
    }
    this.updateResults('');
  }

  public close() {
    if (!this.modal || !this.isOpen) return;
    this.isOpen = false;
    this.modal.style.display = 'none';
    this.modal.setAttribute('aria-hidden', 'true');
  }

  private createModalDOM() {
    if (document.getElementById('taptogen-command-palette')) return;

    const isFr = document.documentElement.lang === 'fr';

    this.modal = document.createElement('div');
    this.modal.id = 'taptogen-command-palette';
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-modal', 'true');
    this.modal.setAttribute('aria-label', isFr ? 'Palette de commandes globale' : 'Global Command Palette');
    this.modal.setAttribute('aria-hidden', 'true');
    this.modal.style.cssText = `
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(11, 15, 25, 0.82); backdrop-filter: blur(16px);
      display: none; align-items: flex-start; justify-content: center; padding-top: 10vh;
    `;

    this.modal.innerHTML = `
      <div style="background: #1e293b; border: 1px solid #334155; border-radius: 16px; width: 100%; max-width: 640px; max-height: 75vh; display: flex; flex-direction: column; color: #f8fafc; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6);">
        <!-- Input Bar -->
        <div style="padding: 16px; border-bottom: 1px solid #334155; display: flex; align-items: center; gap: 12px; background: rgba(0,0,0,0.2);">
          <span style="font-size: 1.1rem; color: #818cf8;">🔍</span>
          <input type="text" id="palette-search-input" placeholder="${isFr ? 'Tapez une commande ou recherchez...' : 'Type a command or search...'}" style="flex: 1; background: transparent; border: none; outline: none; color: #f8fafc; font-size: 1rem; font-family: inherit;" />
          <kbd style="background: rgba(255,255,255,0.08); border: 1px solid #475569; border-radius: 4px; padding: 2px 6px; font-size: 0.72rem; color: #94a3b8;">ESC</kbd>
        </div>

        <!-- Results Listbox -->
        <div id="palette-results-list" role="listbox" style="flex: 1; overflow-y: auto; padding: 8px;">
          <!-- Items rendered dynamically -->
        </div>

        <!-- Footer -->
        <div style="padding: 10px 16px; border-top: 1px solid #334155; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #94a3b8; background: rgba(0,0,0,0.2);">
          <div style="display: flex; gap: 12px;">
            <span><kbd style="background: #334155; padding: 1px 4px; border-radius: 3px;">↑↓</kbd> ${isFr ? 'Naviguer' : 'Navigate'}</span>
            <span><kbd style="background: #334155; padding: 1px 4px; border-radius: 3px;">↵</kbd> ${isFr ? 'Exécuter' : 'Execute'}</span>
            <span><kbd style="background: #334155; padding: 1px 4px; border-radius: 3px;">P</kbd> ${isFr ? 'Épingler' : 'Pin'}</span>
          </div>
          <span>TapToGen Command Palette</span>
        </div>
      </div>
    `;

    document.body.appendChild(this.modal);

    this.input = document.getElementById('palette-search-input') as HTMLInputElement | null;
    this.resultsContainer = document.getElementById('palette-results-list');

    // Close on backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Input listeners
    this.input?.addEventListener('input', () => {
      this.updateResults(this.input?.value || '');
    });

    this.input?.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.close();
        return;
      }
      this.navHandler.handleKeyDown(e);
    });

    this.navHandler.onSelect((item, index) => {
      this.highlightItem(index);
    });

    this.navHandler.onExecute(() => {
      this.close();
    });
  }

  private updateResults(query: string) {
    const items = this.searchEngine.search(query);
    this.navHandler.updateItems(items);

    if (!this.resultsContainer) return;

    if (items.length === 0) {
      const isFr = document.documentElement.lang === 'fr';
      this.resultsContainer.innerHTML = `
        <div style="padding: 24px; text-align: center; color: #64748b; font-size: 0.88rem; font-style: italic;">
          ${isFr ? 'Aucune commande trouvée' : 'No commands or tools found'}
        </div>
      `;
      return;
    }

    const pinnedIds = getPinnedCommandIds();

    this.resultsContainer.innerHTML = items.map((item, idx) => {
      const isSelected = idx === 0;
      const isPinned = pinnedIds.includes(item.id);
      return `
        <div class="palette-item ${isSelected ? 'selected' : ''}" role="option" id="palette-opt-${idx}" aria-selected="${isSelected}" data-index="${idx}" style="
          padding: 10px 14px; border-radius: 8px; margin-bottom: 4px; cursor: pointer;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          background: ${isSelected ? 'rgba(99, 102, 241, 0.15)' : 'transparent'};
          border: 1px solid ${isSelected ? 'rgba(99, 102, 241, 0.3)' : 'transparent'};
          transition: background 0.15s;
        ">
          <div style="display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0;">
            <span style="font-size: 1.1rem;">${item.icon}</span>
            <div style="display: flex; flex-direction: column; min-width: 0;">
              <span style="font-weight: 500; color: #f8fafc; font-size: 0.88rem;">${item.title}</span>
              ${item.subtitle ? `<span style="font-size: 0.75rem; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.subtitle}</span>` : ''}
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            ${isPinned ? `<span style="color: #f59e0b; font-size: 0.8rem;">📌</span>` : ''}
            ${item.shortcut ? `<kbd style="background: rgba(255,255,255,0.06); border: 1px solid #475569; border-radius: 4px; padding: 2px 6px; font-size: 0.72rem; color: #94a3b8;">${item.shortcut}</kbd>` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Click handler for items
    this.resultsContainer.querySelectorAll('.palette-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index') || '0', 10);
        const item = items[idx];
        if (item) {
          item.action();
          this.close();
        }
      });
    });
  }

  private highlightItem(index: number) {
    if (!this.resultsContainer) return;
    const items = this.resultsContainer.querySelectorAll('.palette-item');
    items.forEach((el, idx) => {
      const selected = idx === index;
      (el as HTMLElement).style.background = selected ? 'rgba(99, 102, 241, 0.15)' : 'transparent';
      (el as HTMLElement).style.borderColor = selected ? 'rgba(99, 102, 241, 0.3)' : 'transparent';
      el.setAttribute('aria-selected', selected ? 'true' : 'false');
      if (selected) {
        el.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  private bindGlobalShortcuts() {
    if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') return;
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (this.isOpen) this.close();
        else this.open();
      }
    });
  }
}
