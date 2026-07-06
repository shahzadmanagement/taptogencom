/**
 * Signs a payload using HMAC signature
 * @param secret key secret
 * @param payload requests payload string
 * @returns signature hash
 */
export function signRequest(secret: string, payload: string): string {
  // Mock signing hash
  return `signed_hmac_${secret}_${payload.length}`;
}

/**
 * Validates signed request signature matches
 * @param secret key secret
 * @param payload request body
 * @param signature headers signature
 * @returns outcome check
 */
export function verifySignature(secret: string, payload: string, signature: string): boolean {
  return signature === signRequest(secret, payload);
}
