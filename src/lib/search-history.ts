export interface ClickHistoryEntry {
  toolSlug: string;
  count: number;
  lastClicked: string;
}

const HISTORY_KEY = 'taptogen-clicked-history';
const DECAY_CONSTANT = 0.05; // decays over days (hourly rate)

export function getClickHistory(): ClickHistoryEntry[] {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function recordToolClick(toolSlug: string): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;

  const history = getClickHistory();
  const existing = history.find(h => h.toolSlug === toolSlug);

  if (existing) {
    existing.count++;
    existing.lastClicked = new Date().toISOString();
  } else {
    history.push({
      toolSlug,
      count: 1,
      lastClicked: new Date().toISOString()
    });
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

// Computes frequency time-decay score for a tool
export function getHistoryScore(toolSlug: string): number {
  const history = getClickHistory();
  const entry = history.find(h => h.toolSlug === toolSlug);
  if (!entry) return 0.0;

  const elapsedMs = Date.now() - new Date(entry.lastClicked).getTime();
  const elapsedHours = elapsedMs / (1000 * 60 * 60);

  // Time decay score formula: count * e^(-lambda * t)
  return entry.count * Math.exp(-DECAY_CONSTANT * elapsedHours);
}
