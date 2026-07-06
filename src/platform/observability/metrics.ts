export interface GaugeMetric {
  name: string;
  value: number;
  labels: Record<string, string>;
}

class MetricsRegistry {
  private metrics: GaugeMetric[] = [];

  record(name: string, value: number, labels: Record<string, string> = {}) {
    this.metrics.push({ name, value, labels });
  }

  getMetrics(): GaugeMetric[] {
    return this.metrics;
  }

  clear() {
    this.metrics = [];
  }
}

export const metricsRegistry = new MetricsRegistry();
