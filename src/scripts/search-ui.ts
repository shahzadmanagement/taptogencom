import { searchIndex } from '../lib/search-engine';
import { semanticSearch } from '../lib/search-semantic';
import { eventBus } from '../lib/event-bus';
import type { SearchResult } from '../lib/search-types';

const RECENT_KEY = 'taptogen-recent-searches';
const MAX_RECENT = 10;

const TRENDING_SEARCHES = ['fancy text', 'baby name', 'bold text', 'iupac name', 'cursive fonts'];
const SUGGESTED_SEARCHES = ['cool letters', 'middle name', 'LinkedIn format', 'chemical structure'];

class SearchUi {
  private modal: HTMLDivElement | null = null;
  private input: HTMLInputElement | null = null;
  private resultsContainer: HTMLDivElement | null = null;
  private activeIndex = -1;
  private currentResults: SearchResult[] = [];
  private debounceTimer: any = null;
  private searchStartTime = 0;

  init(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // 1. Listen for hotkeys (Ctrl+K or /) to toggle search modal
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey && e.key === 'k') || e.key === '/') {
        e.preventDefault();
        this.openSearch();
      }
    });

    // 2. Inject floating search button/trigger to page (top right fixed or header bar)
    this.injectSearchTrigger();
    this.injectStyles();
  }

  private injectSearchTrigger(): void {
    if (document.getElementById('taptogen-search-trigger')) return;

    const btn = document.createElement('button');
    btn.id = 'taptogen-search-trigger';
    btn.type = 'button';
    btn.style.cssText = `
      position: fixed;
      top: 16px;
      right: 180px;
      z-index: 999;
      background: #1e293b;
      color: #94a3b8;
      border: 1px solid #334155;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 11px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: inherit;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    `;
    btn.innerHTML = `🔍 Search Tools <span style="background:#0f172a; padding:1px 4px; border-radius:3px; font-size:9px;">Ctrl+K</span>`;
    btn.onclick = () => this.openSearch();

    document.body.appendChild(btn);
  }

  private injectStyles(): void {
    if (document.getElementById('taptogen-search-styles')) return;

    const style = document.createElement('style');
    style.id = 'taptogen-search-styles';
    style.textContent = `
      .taptogen-search-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(15, 23, 42, 0.75);
        backdrop-filter: blur(4px);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 10vh;
      }
      .taptogen-search-modal {
        background: #0f172a;
        width: 100%;
        max-width: 580px;
        border-radius: 12px;
        border: 1px solid #334155;
        box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);
        overflow: hidden;
        font-family: system-ui, sans-serif;
        color: #f8fafc;
      }
      .taptogen-search-header {
        padding: 16px;
        border-bottom: 1px solid #334155;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .taptogen-search-input {
        flex: 1;
        background: transparent;
        border: none;
        color: #fff;
        font-size: 15px;
        outline: none;
      }
      .taptogen-search-close {
        background: #1e293b;
        color: #94a3b8;
        border: none;
        padding: 4px 8px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 10px;
      }
      .taptogen-search-results {
        max-height: 380px;
        overflow-y: auto;
        padding: 12px;
      }
      .taptogen-result-card {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.15s;
        border: 1px solid transparent;
      }
      .taptogen-result-card:hover, .taptogen-result-card.active {
        background: #1e293b;
        border-color: #38bdf8;
      }
      .taptogen-result-icon {
        font-size: 20px;
        background: #0f172a;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
      }
      .taptogen-result-details {
        flex: 1;
      }
      .taptogen-result-title {
        font-weight: 600;
        font-size: 13px;
        margin: 0;
      }
      .taptogen-result-desc {
        font-size: 11px;
        color: #94a3b8;
        margin: 2px 0 0 0;
      }
      .taptogen-highlight {
        color: #38bdf8;
        font-weight: bold;
        background: rgba(56, 189, 248, 0.1);
        padding: 0 2px;
        border-radius: 2px;
      }
      .taptogen-zero-state {
        padding: 24px;
        text-align: center;
        color: #94a3b8;
      }
      .taptogen-quick-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 8px;
        justify-content: center;
      }
      .taptogen-tag {
        background: #1e293b;
        color: #cbd5e1;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 10px;
        cursor: pointer;
      }
      .taptogen-tag:hover {
        background: #38bdf8;
        color: #000;
      }
    `;
    document.head.appendChild(style);
  }

  private openSearch(): void {
    if (this.modal) return;

    this.modal = document.createElement('div');
    this.modal.className = 'taptogen-search-overlay';
    this.modal.innerHTML = `
      <div class="taptogen-search-modal" role="combobox" aria-expanded="true" aria-haspopup="listbox" aria-controls="taptogen-search-list">
        <div class="taptogen-search-header">
          <span>🔍</span>
          <input type="text" class="taptogen-search-input" id="search-input-box" placeholder="Search 430+ tool pages..." autocomplete="off" aria-autocomplete="list"/>
          <button class="taptogen-search-close" id="search-close-btn">ESC</button>
        </div>
        <div class="taptogen-search-results" id="search-results-list" role="listbox">
          <!-- Populated dynamic search views -->
        </div>
      </div>
    `;

    document.body.appendChild(this.modal);
    this.input = document.getElementById('search-input-box') as HTMLInputElement;
    this.resultsContainer = document.getElementById('search-results-list') as HTMLDivElement;

    if (this.input) {
      this.input.focus();
      this.input.addEventListener('input', () => this.handleInput());
      this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
    }
    this.renderDefaultSuggestions();

    // Event handlers binding
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeSearch();
    });
    document.getElementById('search-close-btn')?.addEventListener('click', () => this.closeSearch());
  }

  private closeSearch(): void {
    if (this.modal) {
      this.modal.remove();
      this.modal = null;
      this.input = null;
      this.resultsContainer = null;
      this.activeIndex = -1;
      this.currentResults = [];
    }
  }

  private handleInput(): void {
    const query = this.input?.value || '';
    if (!query) {
      this.renderDefaultSuggestions();
      return;
    }

    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    // Track search start
    if (query.length === 1) {
      this.searchStartTime = performance.now();
      eventBus.publish('search_started', { query }, 'medium');
    }

    this.debounceTimer = setTimeout(() => {
      const results = semanticSearch(query, { limit: 8, fuzzy: true });
      const durationMs = performance.now() - this.searchStartTime;
      this.currentResults = results;
      this.activeIndex = -1;

      eventBus.publish('search_completed', { query, resultsCount: results.length, durationMs }, 'medium');

      if (results.length === 0) {
        eventBus.publish('zero_results', { query }, 'high');
        this.renderZeroState(query);
      } else {
        this.renderResults(results, query);
      }
    }, 150);
  }

  private handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this.closeSearch();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.navigateResults(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.navigateResults(-1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (this.activeIndex >= 0 && this.activeIndex < this.currentResults.length) {
        this.selectResult(this.currentResults[this.activeIndex]);
      }
    }
  }

  private navigateResults(direction: number): void {
    if (!this.resultsContainer) return;
    const cards = this.resultsContainer.querySelectorAll('.taptogen-result-card');
    if (cards.length === 0) return;

    if (this.activeIndex >= 0) {
      cards[this.activeIndex].classList.remove('active');
    }

    this.activeIndex = (this.activeIndex + direction + cards.length) % cards.length;
    cards[this.activeIndex].classList.add('active');
    cards[this.activeIndex].scrollIntoView({ block: 'nearest' });
  }

  private selectResult(res: SearchResult): void {
    this.saveRecentSearch(res.document.title);
    eventBus.publish('result_clicked', { query: this.input?.value || '', toolSlug: res.document.id }, 'high');
    eventBus.flush();
    
    // Redirect to tool url
    window.location.href = res.document.url;
  }

  private saveRecentSearch(query: string): void {
    if (typeof localStorage === 'undefined') return;
    let recents: string[] = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    recents = recents.filter(q => q !== query);
    recents.unshift(query);
    if (recents.length > MAX_RECENT) recents.pop();
    localStorage.setItem(RECENT_KEY, JSON.stringify(recents));
  }

  private renderResults(results: SearchResult[], query: string): void {
    if (!this.resultsContainer) return;

    let html = '';
    results.forEach((res, i) => {
      const highlightedTitle = this.highlightMatches(res.document.title, query);
      const highlightedDesc = this.highlightMatches(res.document.description, query);
      const icon = '🔧'; // default icon placeholder

      html += `
        <div class="taptogen-result-card" id="search-opt-${i}" role="option" aria-selected="false" onclick="window.__ab_search_select(${i})">
          <div class="taptogen-result-icon">${icon}</div>
          <div class="taptogen-result-details">
            <h5 class="taptogen-result-title">${highlightedTitle}</h5>
            <p class="taptogen-result-desc">${highlightedDesc}</p>
          </div>
          <span style="font-size:10px; color:#38bdf8; background:rgba(56,189,248,0.1); padding:2px 6px; border-radius:4px;">Open</span>
        </div>
      `;
    });

    this.resultsContainer.innerHTML = html;

    // Attach global selection handler for direct click events
    (window as any).__ab_search_select = (index: number) => {
      this.selectResult(this.currentResults[index]);
    };
  }

  private highlightMatches(text: string, query: string): string {
    const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 1);
    if (terms.length === 0) return text;

    let highlighted = text;
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlighted = highlighted.replace(regex, '<span class="taptogen-highlight">$1</span>');
    });
    return highlighted;
  }

  private renderDefaultSuggestions(): void {
    if (!this.resultsContainer) return;

    const recents = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem(RECENT_KEY) || '[]') : [];

    let html = '';
    if (recents.length > 0) {
      html += `
        <div style="margin-bottom:12px;">
          <div style="font-size:10px; color:#94a3b8; font-weight:bold; text-transform:uppercase; margin-bottom:6px;">Recent Searches</div>
          <div class="taptogen-quick-tags">
            ${recents.map((r: string) => `<span class="taptogen-tag" onclick="window.__ab_search_trigger_tag('${r}')">${r}</span>`).join('')}
          </div>
        </div>
      `;
    }

    html += `
      <div style="margin-bottom:12px;">
        <div style="font-size:10px; color:#94a3b8; font-weight:bold; text-transform:uppercase; margin-bottom:6px;">Trending Searches</div>
        <div class="taptogen-quick-tags">
          ${TRENDING_SEARCHES.map(t => `<span class="taptogen-tag" onclick="window.__ab_search_trigger_tag('${t}')">${t}</span>`).join('')}
        </div>
      </div>
      <div>
        <div style="font-size:10px; color:#94a3b8; font-weight:bold; text-transform:uppercase; margin-bottom:6px;">Suggested Searches</div>
        <div class="taptogen-quick-tags">
          ${SUGGESTED_SEARCHES.map(s => `<span class="taptogen-tag" onclick="window.__ab_search_trigger_tag('${s}')">${s}</span>`).join('')}
        </div>
      </div>
    `;

    this.resultsContainer.innerHTML = html;

    (window as any).__ab_search_trigger_tag = (tag: string) => {
      if (this.input) {
        this.input.value = tag;
        this.handleInput();
      }
    };
  }

  private renderZeroState(query: string): void {
    if (!this.resultsContainer) return;

    this.resultsContainer.innerHTML = `
      <div class="taptogen-zero-state">
        <p style="margin:0 0 12px 0;">No tools found matching "<strong>${query}</strong>"</p>
        <div style="font-size:10px; color:#94a3b8; font-weight:bold; text-transform:uppercase; margin-bottom:6px;">Try one of these suggestions:</div>
        <div class="taptogen-quick-tags">
          ${SUGGESTED_SEARCHES.map(s => `<span class="taptogen-tag" onclick="window.__ab_search_trigger_tag('${s}')">${s}</span>`).join('')}
        </div>
      </div>
    `;
  }
}

export const searchUi = new SearchUi();
export default searchUi;
