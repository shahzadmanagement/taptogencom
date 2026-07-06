import { getConnector } from './connectorRegistry';

/**
 * Checks external connector health status
 * @param id unique ID
 * @returns status boolean check
 */
export function checkConnectorHealth(id: string): boolean {
  const config = getConnector(id);
  if (!config) return false;
  // REST connectors need base urls to operate
  if (config.type === 'rest' && !config.baseUrl) return false;
  return true;
}
