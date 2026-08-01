import type { CommandItem } from './types';
import { getPinnedCommandIds, getRecentCommandIds } from './storage';

export function calculateScore(item: CommandItem, query: string): number {
  if (!query || query.trim().length === 0) {
    let base = 0;
    const pinned = getPinnedCommandIds();
    const recent = getRecentCommandIds();
    if (pinned.includes(item.id)) base += 50;
    if (recent.includes(item.id)) base += 30;
    return base;
  }

  const q = query.toLowerCase().trim();
  const title = item.title.toLowerCase();
  const subtitle = (item.subtitle || '').toLowerCase();
  let score = 0;

  // 1. Exact Match
  if (title === q) {
    score += 100;
  } else if (title.startsWith(q)) {
    // 2. Prefix Match
    score += 80;
  } else if (title.includes(q)) {
    // 3. Substring Match
    score += 50;
  } else if (subtitle.includes(q)) {
    score += 30;
  }

  // 4. Keywords & Aliases Match
  if (item.keywords) {
    item.keywords.forEach(kw => {
      const k = kw.toLowerCase();
      if (k === q) score += 60;
      else if (k.startsWith(q)) score += 40;
      else if (k.includes(q)) score += 20;
    });
  }

  if (item.aliases) {
    item.aliases.forEach(al => {
      const a = al.toLowerCase();
      if (a === q) score += 60;
      else if (a.startsWith(q)) score += 40;
    });
  }

  // 5. Pinned & Recent Boost
  const pinned = getPinnedCommandIds();
  const recent = getRecentCommandIds();
  if (score > 0) {
    if (pinned.includes(item.id)) score += 25;
    if (recent.includes(item.id)) score += 15;
  }

  return score;
}

export function rankCommands(items: CommandItem[], query: string): CommandItem[] {
  return items
    .map(item => ({ ...item, score: calculateScore(item, query) }))
    .filter(item => (!query || query.trim().length === 0) || (item.score && item.score > 0))
    .sort((a, b) => (b.score || 0) - (a.score || 0));
}
