export interface ConnectorConfig {
  id: string;
  name: string;
  type: 'rest' | 'db' | 'custom';
  baseUrl?: string;
  authRequired: boolean;
}

export interface ConnectorState {
  connectorId: string;
  connected: boolean;
  lastUsedAt?: string;
}
