import { PaletteUIController } from './ui';

let paletteInstance: PaletteUIController | null = null;

export function initCommandPalette() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  if (!paletteInstance) {
    paletteInstance = new PaletteUIController();
    paletteInstance.init();
  }
}

export function openCommandPalette() {
  if (!paletteInstance) {
    initCommandPalette();
  }
  if (paletteInstance) {
    paletteInstance.open();
  }
}

export function closeCommandPalette() {
  if (paletteInstance) {
    paletteInstance.close();
  }
}
