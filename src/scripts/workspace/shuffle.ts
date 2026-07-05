import type { ToolConfig } from '../../config';

export function shuffleStyles() {
  const matrix = document.querySelector('.intent-style-matrix');
  if (matrix) {
    const cards = Array.from(matrix.querySelectorAll('.intent-style-card'));
    cards.sort(() => Math.random() - 0.5);
    cards.forEach(card => matrix.appendChild(card));
  }
}

export function initShuffle(config: ToolConfig) {
  if (!config.shuffle) return;
  const btn = document.getElementById('btn-shuffle-styles');
  btn?.addEventListener('click', () => {
    shuffleStyles();
  });
}
