import type { ToolConfig } from '../../config';

const KEY = 'taptogen-favs';

export function getFavorites(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveFavorites(favs: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(favs));
  } catch (e) {
    console.warn('Favorites save failed: ', e);
  }
}

export function syncFavorites() {
  const favs = getFavorites();
  document.querySelectorAll('[data-fav-style]').forEach(btn => {
    const styleName = btn.getAttribute('data-fav-style') || '';
    const isFav = favs.includes(styleName);
    btn.textContent = isFav ? '★' : '☆';
    btn.classList.toggle('active', isFav);
  });

  const matrix = document.querySelector('.intent-style-matrix');
  if (matrix) {
    const cards = Array.from(matrix.querySelectorAll('.intent-style-card'));
    cards.sort((a, b) => {
      const nameA = a.getAttribute('data-style-name') || '';
      const nameB = b.getAttribute('data-style-name') || '';
      const favA = favs.includes(nameA) ? 1 : 0;
      const favB = favs.includes(nameB) ? 1 : 0;
      return favB - favA;
    });
    cards.forEach(card => matrix.appendChild(card));
  }
}

export function toggleFavorite(styleName: string) {
  let favs = getFavorites();
  if (favs.includes(styleName)) {
    favs = favs.filter(f => f !== styleName);
  } else {
    favs.push(styleName);
  }
  saveFavorites(favs);
  syncFavorites();
}

export function initFavorites(config: ToolConfig) {
  if (!config.favorites) return;

  document.addEventListener('click', event => {
    const target = event.target as HTMLElement;
    const favBtn = target.closest<HTMLElement>('[data-fav-style]');
    if (!favBtn) return;
    
    const styleName = favBtn.getAttribute('data-fav-style') || '';
    if (styleName) {
      toggleFavorite(styleName);
    }
  });

  syncFavorites();
}
