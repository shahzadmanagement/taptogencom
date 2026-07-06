export interface LoginRecord {
  ip: string;
  userAgent: string;
  success: boolean;
  timestamp: string;
}

const history = new Map<string, LoginRecord[]>();

/**
 * Logs a login action in audit history
 * @param userId user identifier
 * @param ip source IP
 * @param userAgent agent header
 * @param success outcome success status
 */
export function recordLogin(userId: string, ip: string, userAgent: string, success: boolean) {
  const records = history.get(userId) || [];
  records.push({ ip, userAgent, success, timestamp: new Date().toISOString() });
  history.set(userId, records);
}

/**
 * Gets login history for a user
 * @param userId user identifier
 * @returns list of records
 */
export function getLoginHistory(userId: string): LoginRecord[] {
  return history.get(userId) || [];
}
