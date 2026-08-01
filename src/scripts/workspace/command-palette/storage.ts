const PINNED_KEY = 'taptogen-palette-pinned';
const RECENT_KEY = 'taptogen-palette-recent';

export function getPinnedCommandIds(): string[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(PINNED_KEY) || '[]');
  } catch {
    return [];
  }
}

export function togglePinCommand(id: string): boolean {
  if (typeof localStorage === 'undefined') return false;
  try {
    const pinned = getPinnedCommandIds();
    const idx = pinned.indexOf(id);
    if (idx >= 0) {
      pinned.splice(idx, 1);
      localStorage.setItem(PINNED_KEY, JSON.stringify(pinned));
      return false;
    } else {
      pinned.push(id);
      localStorage.setItem(PINNED_KEY, JSON.stringify(pinned));
      return true;
    }
  } catch {
    return false;
  }
}

export function getRecentCommandIds(): string[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  } catch {
    return [];
  }
}

export function addRecentCommand(id: string): void {
  if (typeof localStorage === 'undefined') return;
  try {
    let recent = getRecentCommandIds();
    recent = recent.filter(r => r !== id);
    recent.unshift(id);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, 10)));
  } catch {}
}
