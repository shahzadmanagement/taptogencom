import type { ConnectorState } from './connector';

const states = new Map<string, ConnectorState>();

/**
 * Initializes/Fetches state trace log for a connector
 * @param connectorId unique connector ID
 * @returns connector state object
 */
export function getOrCreateConnectorState(connectorId: string): ConnectorState {
  let s = states.get(connectorId);
  if (!s) {
    s = { connectorId, connected: false };
    states.set(connectorId, s);
  }
  return s;
}

/**
 * Updates connection state for connector
 */
export function updateConnectorState(connectorId: string, connected: boolean) {
  const s = getOrCreateConnectorState(connectorId);
  s.connected = connected;
  s.lastUsedAt = new Date().toISOString();
}
