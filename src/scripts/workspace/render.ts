import { ClipboardHelper } from './clipboard';

export function pickRandomStyle() {
  const cards = Array.from(document.querySelectorAll('.intent-style-card'));
  if (cards.length > 0) {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    const text = randomCard.querySelector('.intent-preview-text')?.textContent || '';
    if (text) {
      ClipboardHelper.copy(text, randomCard.querySelector('.copy-btn') as HTMLElement);
    }
  }
}
