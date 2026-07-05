export class ShortcutManager {
  static bind(
    onEsc: () => void,
    onShuffle: () => void,
    onRandom: () => void
  ): () => void {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEsc();
      }
      if (event.altKey && event.key.toLowerCase() === 's') {
        event.preventDefault();
        onShuffle();
      }
      if (event.altKey && event.key.toLowerCase() === 'r') {
        event.preventDefault();
        onRandom();
      }
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }
}
