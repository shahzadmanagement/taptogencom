export interface Session {
  id: string;
  userId: string;
  expiresAt: number;
}

const activeSessions = new Map<string, Session>();

/**
 * Creates a new active session
 * @param userId User ID string
 * @returns session object
 */
export function createSession(userId: string): Session {
  const session: Session = {
    id: Math.random().toString(36).substring(2, 15),
    userId,
    expiresAt: Date.now() + 86400000
  };
  activeSessions.set(session.id, session);
  return session;
}

/**
 * Gets an active session by ID
 * @param sessionId session identifier
 * @returns session or null
 */
export function getSession(sessionId: string): Session | null {
  const s = activeSessions.get(sessionId);
  if (!s) return null;
  if (Date.now() > s.expiresAt) {
    activeSessions.delete(sessionId);
    return null;
  }
  return s;
}
