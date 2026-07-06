import type { ConnectorConfig } from './connector';

const registry = new Map<string, ConnectorConfig>();

/**
 * Registers an integration connector configuration
 * @param config connector settings
 */
export function registerConnector(config: ConnectorConfig) {
  registry.set(config.id, config);
}

/**
 * Fetches connector definition by ID
 * @param id connector ID
 * @returns settings or undefined
 */
export function getConnector(id: string): ConnectorConfig | undefined {
  return registry.get(id);
}
