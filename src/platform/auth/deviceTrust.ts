export interface TrustedDevice {
  deviceId: string;
  name: string;
  trustedSince: string;
}

const trusted = new Map<string, TrustedDevice[]>();

/**
 * Registers device trusted mapping status
 * @param userId user identifier
 * @param deviceId unique device token
 * @param name device descriptor
 */
export function trustDevice(userId: string, deviceId: string, name: string) {
  const list = trusted.get(userId) || [];
  list.push({ deviceId, name, trustedSince: new Date().toISOString() });
  trusted.set(userId, list);
}

/**
 * Checks if a device is trusted
 * @param userId user identifier
 * @param deviceId unique device token
 * @returns outcome check status
 */
export function isDeviceTrusted(userId: string, deviceId: string): boolean {
  const list = trusted.get(userId) || [];
  return list.some(d => d.deviceId === deviceId);
}
