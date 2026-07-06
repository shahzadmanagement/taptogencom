export interface SearchLatencyRecord {
  query: string;
  durationMs: number;
  timestamp: string;
}

class SearchMetricsTracker {
  private latencyHistory: SearchLatencyRecord[] = [];

  recordQuery(query: string, durationMs: number) {
    this.latencyHistory.push({
      query,
      durationMs,
      timestamp: new Date().toISOString()
    });
  }

  getMetricsSummary() {
    if (this.latencyHistory.length === 0) return { avgDurationMs: 0, count: 0 };
    const total = this.latencyHistory.reduce((acc, r) => acc + r.durationMs, 0);
    return {
      avgDurationMs: total / this.latencyHistory.length,
      count: this.latencyHistory.length
    };
  }
}

export const searchMetricsTracker = new SearchMetricsTracker();
