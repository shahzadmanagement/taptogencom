import { metricsRegistry } from './metrics';

export function compileDashboardPayload() {
  const currentMetrics = metricsRegistry.getMetrics();
  return {
    dashboardName: "TapToGen Observability Dashboard Status",
    compiledAt: new Date().toISOString(),
    metricsCount: currentMetrics.length,
    metricsList: currentMetrics
  };
}
