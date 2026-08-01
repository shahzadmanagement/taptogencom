import type { ToolConfig } from '../../config';
import { saveFavoriteRecord, deleteFavoriteRecord, getFavoritesByTool, type FavoriteRecord } from '../../lib/storage-engine';

export async function syncFavorites(toolSlug?: string, searchQuery: string = '', sortBy: 'newest' | 'alphabetical' = 'newest') {
  if (typeof document === 'undefined') return;
  const activeSlug = toolSlug || document.getElementById('tool-workspace')?.dataset.tool || 'generator';
  const favorites = await getFavoritesByTool(activeSlug);
  if (typeof document === 'undefined') return;
  const favIds = new Set(favorites.map(f => f.name));

  // Sync star buttons across output cards
  document.querySelectorAll('[data-fav-style]').forEach(btn => {
    const styleName = btn.getAttribute('data-fav-style') || '';
    const isFav = favIds.has(styleName);
    btn.textContent = isFav ? '★' : '☆';
    btn.classList.toggle('active', isFav);
    btn.setAttribute('aria-label', isFav ? 'Remove from favorites' : 'Add to favorites');
  });

  // Render Favorites list panel if element exists
  const favList = document.getElementById('favorites-list');
  if (favList) {
    let filtered = favorites;
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      filtered = favorites.filter(f => f.name.toLowerCase().includes(q) || f.text.toLowerCase().includes(q));
    }

    if (sortBy === 'alphabetical') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered = [...filtered].sort((a, b) => b.timestamp - a.timestamp);
    }

    if (filtered.length === 0) {
      const isFr = typeof document !== 'undefined' && document.documentElement ? document.documentElement.lang === 'fr' : false;
      favList.innerHTML = `<p style="color: var(--color-text-muted, #94a3b8); font-size: 0.85rem; font-style: italic; margin: 0;">${isFr ? 'Aucun favori enregistré.' : 'No favorites saved yet.'}</p>`;
      return;
    }

    favList.innerHTML = filtered.map(fav => `
      <div class="fav-item" style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid var(--color-border, rgba(255,255,255,0.12)); border-radius: 10px; padding: 10px 14px; font-size: 0.85rem; margin-bottom: 8px;">
        <div>
          <div style="font-weight: 600; color: #818cf8; font-size: 0.78rem; text-transform: uppercase;">${fav.name}</div>
          <div style="font-family: monospace; color: var(--color-text-primary, #f8fafc);">${fav.text}</div>
        </div>
        <button type="button" class="btn-remove-fav" data-fav-id="${fav.id}" style="background: none; border: none; color: #ef4444; font-size: 1rem; cursor: pointer;">★</button>
      </div>
    `).join('');

    favList.querySelectorAll('.btn-remove-fav').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-fav-id');
        if (id) {
          await deleteFavoriteRecord(id, activeSlug);
          syncFavorites(activeSlug, searchQuery, sortBy);
        }
      });
    });
  }
}

export async function toggleFavorite(toolSlug: string, styleName: string, text: string = '') {
  const favorites = await getFavoritesByTool(toolSlug);
  const existing = favorites.find(f => f.name === styleName || f.id === `${toolSlug}:${styleName}`);

  if (existing) {
    await deleteFavoriteRecord(existing.id, toolSlug);
  } else {
    const record: FavoriteRecord = {
      id: `${toolSlug}:${styleName}`,
      tool: toolSlug,
      name: styleName,
      text: text || styleName,
      timestamp: Date.now()
    };
    await saveFavoriteRecord(record);
  }

  syncFavorites(toolSlug);
}

export function initFavorites(config: ToolConfig) {
  if (!config.favorites || typeof document === 'undefined') return;
  const toolSlug = config.slug;

  document.addEventListener('click', async event => {
    const target = event.target as HTMLElement;
    const favBtn = target.closest<HTMLElement>('[data-fav-style]');
    if (!favBtn) return;
    
    const styleName = favBtn.getAttribute('data-fav-style') || '';
    const card = favBtn.closest('.result-card, .intent-style-card');
    const text = card?.querySelector('.intent-preview-text, .result-text')?.textContent?.trim() || styleName;

    if (styleName) {
      await toggleFavorite(toolSlug, styleName, text);
    }
  });

  // Search & Sort listeners if controls exist
  const searchInput = document.getElementById('search-favorites-input') as HTMLInputElement | null;
  const sortSelect = document.getElementById('sort-favorites-select') as HTMLSelectElement | null;

  const updateList = () => {
    const query = searchInput?.value || '';
    const sort = (sortSelect?.value as 'newest' | 'alphabetical') || 'newest';
    syncFavorites(toolSlug, query, sort);
  };

  searchInput?.addEventListener('input', updateList);
  sortSelect?.addEventListener('change', updateList);

  syncFavorites(toolSlug);
}
