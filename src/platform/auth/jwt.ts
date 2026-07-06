/**
 * JWT Claims interface definition
 */
export interface JwtClaims {
  sub: string;
  role: string;
  exp: number;
  iat: number;
}

/**
 * Generates a mock JWT token string
 * @param sub Subject ID
 * @param role User role
 * @returns token string
 */
export function generateToken(sub: string, role: string): string {
  const claims: JwtClaims = {
    sub,
    role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600
  };
  return `mock_jwt_header.${btoa(JSON.stringify(claims))}.mock_signature`;
}

/**
 * Verifies a mock JWT token
 * @param token JWT token string
 * @returns verified claims or null
 */
export function verifyToken(token: string): JwtClaims | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const claimsStr = atob(parts[1]);
    return JSON.parse(claimsStr) as JwtClaims;
  } catch {
    return null;
  }
}
