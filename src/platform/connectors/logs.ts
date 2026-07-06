export interface ConnectorLog {
  connectorId: string;
  action: string;
  timestamp: string;
}

const logsList: ConnectorLog[] = [];

/**
 * Appends actions detail to audit log
 */
export function logConnectorAction(connectorId: string, action: string) {
  logsList.push({
    connectorId,
    action,
    timestamp: new Date().toISOString()
  });
}

/**
 * Retrieves logs records list
 */
export function getConnectorLogs(): ConnectorLog[] {
  return logsList;
}
