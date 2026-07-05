export class SearchManager {
  static filter(query: string): void {
    const cleanQuery = query.toLowerCase().trim();
    document.querySelectorAll('.intent-style-card').forEach(card => {
      const label = card.querySelector('.result-label')?.textContent?.toLowerCase() || '';
      const use = card.querySelector('.intent-mini-note')?.textContent?.toLowerCase() || '';
      if (label.includes(cleanQuery) || use.includes(cleanQuery)) {
        (card as HTMLElement).style.display = '';
      } else {
        (card as HTMLElement).style.display = 'none';
      }
    });
  }

  static shuffle(): void {
    const matrix = document.querySelector('.intent-style-matrix');
    if (matrix) {
      const cards = Array.from(matrix.querySelectorAll('.intent-style-card'));
      cards.sort(() => Math.random() - 0.5);
      cards.forEach(card => matrix.appendChild(card));
    }
  }
}
