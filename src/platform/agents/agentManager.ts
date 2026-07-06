import type { AgentSessionState } from './agent';

const sessions = new Map<string, AgentSessionState>();

/**
 * Initializes/Fetches state trace log for a session
 * @param sessionId unique session ID
 * @returns session state object
 */
export function getOrCreateSession(sessionId: string): AgentSessionState {
  let s = sessions.get(sessionId);
  if (!s) {
    s = { sessionId, history: [] };
    sessions.set(sessionId, s);
  }
  return s;
}

/**
 * Logs step output to session history trace
 */
export function recordSessionStep(sessionId: string, stepLog: string) {
  const s = getOrCreateSession(sessionId);
  s.history.push(stepLog);
}
