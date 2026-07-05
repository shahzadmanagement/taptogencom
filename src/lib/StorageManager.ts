export class StorageManager {
  static get(key: string): string[] {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch {
      return [];
    }
  }

  static save(key: string, items: string[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch (err) {
      console.warn('Failed to save to localStorage: ', err);
    }
  }
}
