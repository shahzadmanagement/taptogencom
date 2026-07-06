import type { ConnectorConfig } from './connector';

/**
 * Validates a connector configuration parameters
 * @param config connector settings
 * @returns boolean outcome check
 */
export function validateConnectorConfig(config: ConnectorConfig): boolean {
  if (!config.id || typeof config.id !== 'string') return false;
  if (!config.name || typeof config.name !== 'string') return false;
  if (config.authRequired && !config.baseUrl) return false;
  return true;
}
