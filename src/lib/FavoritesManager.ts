import { StorageManager } from './StorageManager';

export class FavoritesManager {
  private static KEY = 'taptogen-favs';

  static getFavs(): string[] {
    return StorageManager.get(this.KEY);
  }

  static toggle(styleName: string): string[] {
    let favs = this.getFavs();
    if (favs.includes(styleName)) {
      favs = favs.filter(f => f !== styleName);
    } else {
      favs.push(styleName);
    }
    StorageManager.save(this.KEY, favs);
    return favs;
  }

  static syncUI(): void {
    const favs = this.getFavs();
    document.querySelectorAll('[data-fav-style]').forEach(btn => {
      const styleName = btn.getAttribute('data-fav-style') || '';
      const isFav = favs.includes(styleName);
      btn.textContent = isFav ? '★' : '☆';
      btn.classList.toggle('active', isFav);
    });

    // Sort style matrix cards
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
}
