export interface SearchEvent {
  eventType: 'Started' | 'Completed' | 'Cancelled' | 'ZeroResults' | 'ResultClicked' | 'SuggestionClicked' | 'IntentUsed' | 'RecommendationClicked';
  timestamp: string;
  sessionId: string;
  query: string;
  normalizedQuery: string;
  detectedIntent: string;
  resultCount: number;
  clickedTool?: string;
  clickPosition?: number;
  searchLatency: number;
  confidenceScore: number;
  searchSource: 'spotlight' | 'direct';
  locale: string;
  deviceType: 'mobile' | 'desktop';
}

export interface AggregatedMetrics {
  totalSearches: number;
  uniqueQueriesCount: number;
  successfulSearches: number;
  failedSearches: number;
  zeroResultRate: number; // percentage
  avgSearchTimeMs: number;
  avgClickPosition: number;
  avgConfidence: number;
  searchSuccessRate: number; // percentage
  ctr: number; // percentage
  aiIntentUsageCount: number;
  recommendationCtr: number; // percentage
}

const EVENTS_KEY = 'taptogen-search-events-log';
let inMemoryEvents: SearchEvent[] = [];

export function getEventsLog(): SearchEvent[] {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return inMemoryEvents;
  }
  try {
    return JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
  } catch {
    return inMemoryEvents;
  }
}

export function trackSearchEvent(event: Omit<SearchEvent, 'timestamp' | 'sessionId'>): void {
  const fullEvent: SearchEvent = {
    ...event,
    timestamp: new Date().toISOString(),
    sessionId: typeof window !== 'undefined' ? (window as any).__taptogen_session_id || 'session-default' : 'session-node'
  };

  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    inMemoryEvents.push(fullEvent);
    return;
  }

  const log = getEventsLog();
  log.push(fullEvent);
  localStorage.setItem(EVENTS_KEY, JSON.stringify(log));
}

export function computeSearchMetrics(): AggregatedMetrics {
  const events = getEventsLog();
  const started = events.filter(e => e.eventType === 'Started');
  const completed = events.filter(e => e.eventType === 'Completed');
  const zeroResults = events.filter(e => e.eventType === 'ZeroResults');
  const clicks = events.filter(e => e.eventType === 'ResultClicked');
  const recClicks = events.filter(e => e.eventType === 'RecommendationClicked');
  const uniqueQueries = new Set(events.map(e => e.normalizedQuery));

  const total = started.length;
  const successful = completed.length - zeroResults.length;
  const failed = zeroResults.length;

  let totalLatency = 0;
  completed.forEach(c => { totalLatency += c.searchLatency; });

  let totalConfidence = 0;
  completed.forEach(c => { totalConfidence += c.confidenceScore; });

  let totalClickPos = 0;
  let clickPosCount = 0;
  clicks.forEach(c => {
    if (c.clickPosition !== undefined) {
      totalClickPos += c.clickPosition;
      clickPosCount++;
    }
  });

  return {
    totalSearches: total,
    uniqueQueriesCount: uniqueQueries.size,
    successfulSearches: successful,
    failedSearches: failed,
    zeroResultRate: total > 0 ? (failed / total) * 100 : 0,
    avgSearchTimeMs: completed.length > 0 ? totalLatency / completed.length : 0,
    avgClickPosition: clickPosCount > 0 ? totalClickPos / clickPosCount : 0,
    avgConfidence: completed.length > 0 ? totalConfidence / completed.length : 0,
    searchSuccessRate: total > 0 ? (successful / total) * 100 : 0,
    ctr: completed.length > 0 ? (clicks.length / completed.length) * 100 : 0,
    aiIntentUsageCount: events.filter(e => e.eventType === 'IntentUsed').length,
    recommendationCtr: completed.length > 0 ? (recClicks.length / completed.length) * 100 : 0
  };
}

export function exportAnalytics(format: 'json' | 'csv'): string {
  const events = getEventsLog();
  if (format === 'json') {
    return JSON.stringify(events, null, 2);
  }

  // Generate CSV format representation
  const headers = ['eventType', 'timestamp', 'query', 'detectedIntent', 'resultCount', 'clickedTool', 'searchLatency', 'confidenceScore'];
  const csvRows = [headers.join(',')];

  events.forEach(e => {
    const row = [
      e.eventType,
      e.timestamp,
      `"${e.query.replace(/"/g, '""')}"`,
      e.detectedIntent,
      e.resultCount,
      e.clickedTool || '',
      e.searchLatency,
      e.confidenceScore
    ];
    csvRows.push(row.join(','));
  });

  return csvRows.join('\n');
}

export function getZeroResultAnalytics(): { query: string; count: number; detectedIntent: string }[] {
  const events = getEventsLog();
  const zeroEvents = events.filter(e => e.eventType === 'ZeroResults');
  const summaryMap = new Map<string, { count: number; intent: string }>();

  zeroEvents.forEach(z => {
    const existing = summaryMap.get(z.normalizedQuery);
    if (existing) {
      existing.count++;
    } else {
      summaryMap.set(z.normalizedQuery, { count: 1, intent: z.detectedIntent });
    }
  });

  return Array.from(summaryMap.entries()).map(([query, data]) => ({
    query,
    count: data.count,
    detectedIntent: data.intent
  })).sort((a, b) => b.count - a.count);
}

export function getSearchInsights(): { description: string; impactLevel: 'high' | 'medium' | 'low' }[] {
  const metrics = computeSearchMetrics();
  const insights: { description: string; impactLevel: 'high' | 'medium' | 'low' }[] = [];

  if (metrics.zeroResultRate > 15) {
    insights.push({
      description: `High zero results rate detected (${metrics.zeroResultRate.toFixed(1)}%). Review synonym expansion mappings.`,
      impactLevel: 'high'
    });
  }

  if (metrics.avgSearchTimeMs > 2.5) {
    insights.push({
      description: `Search latencies are elevated (${metrics.avgSearchTimeMs.toFixed(1)}ms). Investigate index loop bottlenecks.`,
      impactLevel: 'medium'
    });
  }

  if (metrics.ctr < 50 && metrics.totalSearches > 0) {
    insights.push({
      description: `Low search CTR detected (${metrics.ctr.toFixed(1)}%). Result cards layout needs better CTAs.`,
      impactLevel: 'medium'
    });
  }

  if (insights.length === 0) {
    insights.push({
      description: 'Search performance indicators are within nominal target levels.',
      impactLevel: 'low'
    });
  }

  return insights;
}

export function clearEventsLog(): void {
  inMemoryEvents = [];
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.removeItem(EVENTS_KEY);
  }
}
