import { generateToken, verifyToken, type JwtClaims } from './jwt';
import { createSession, getSession, type Session } from './session';

/**
 * Authentication Service manager
 */
class AuthService {
  /**
   * Performs client login checks
   * @param userId user identifier
   * @param role user access level
   * @returns JWT token and session detail
   */
  async login(userId: string, role: string): Promise<{ token: string; session: Session }> {
    const token = generateToken(userId, role);
    const session = createSession(userId);
    return { token, session };
  }

  /**
   * Verifies authenticated payload claims
   * @param token JWT token string
   * @returns claims or null
   */
  verify(token: string): JwtClaims | null {
    return verifyToken(token);
  }
}

export const authService = new AuthService();
