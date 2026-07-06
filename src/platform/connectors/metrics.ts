export interface ConnectorMetricsRecord {
  connectorId: string;
  requestsCount: number;
  failuresCount: number;
}

const metrics = new Map<string, ConnectorMetricsRecord>();

/**
 * Increments requests telemetry count
 */
export function recordConnectorRequest(connectorId: string, success: boolean) {
  const rec = metrics.get(connectorId) || { connectorId, requestsCount: 0, failuresCount: 0 };
  rec.requestsCount++;
  if (!success) rec.failuresCount++;
  metrics.set(connectorId, rec);
}

/**
 * Fetches metrics log summary
 */
export function getConnectorMetrics(connectorId: string): ConnectorMetricsRecord | null {
  return metrics.get(connectorId) || null;
}
