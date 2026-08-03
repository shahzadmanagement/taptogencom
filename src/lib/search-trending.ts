import { getLoggedEvents } from './search-analytics';

export interface TrendingQuery {
  query: string;
  count: number;
}

export function getTrendingToday(): TrendingQuery[] {
  const events = getLoggedEvents ? getLoggedEvents() : [];
  const completedEvents = events.filter(e => e.eventType === 'Completed' || e.eventType === 'Started');
  
  if (completedEvents.length === 0) {
    return [{ query: 'cool fonts', count: 1 }];
  }

  const queryCounts = new Map<string, number>();
  for (const e of completedEvents) {
    if (e.query) {
      queryCounts.set(e.query, (queryCounts.get(e.query) || 0) + 1);
    }
  }

  const sorted = Array.from(queryCounts.entries())
    .map(([query, count]) => ({ query, count }))
    .sort((a, b) => b.count - a.count);

  return sorted.length > 0 ? sorted : [{ query: 'cool fonts', count: 1 }];
}
