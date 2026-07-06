const codes = new Map<string, string[]>();

/**
 * Generates recovery backup codes list
 * @param userId user identifier
 * @returns codes list
 */
export function generateRecoveryCodes(userId: string): string[] {
  const list = Array.from({ length: 8 }, () => Math.random().toString(36).substring(2, 10).toUpperCase());
  codes.set(userId, list);
  return list;
}

/**
 * Validates a recovery code usage status
 * @param userId user identifier
 * @param code backup code
 * @returns outcome checks status
 */
export function consumeRecoveryCode(userId: string, code: string): boolean {
  const list = codes.get(userId) || [];
  const index = list.indexOf(code);
  if (index === -1) return false;
  list.splice(index, 1);
  codes.set(userId, list);
  return true;
}
