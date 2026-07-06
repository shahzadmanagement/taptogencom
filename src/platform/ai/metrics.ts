export interface LatencyRecord {
  provider: string;
  latencyMs: number;
  timestamp: string;
}

class AIMetricsTracker {
  private records: LatencyRecord[] = [];

  recordLatency(provider: string, latencyMs: number) {
    this.records.push({ provider, latencyMs, timestamp: new Date().toISOString() });
  }

  getAverageLatency(provider: string): number {
    const list = this.records.filter(r => r.provider === provider);
    if (list.length === 0) return 0;
    return list.reduce((acc, r) => acc + r.latencyMs, 0) / list.length;
  }
}

export const aiMetricsTracker = new AIMetricsTracker();
