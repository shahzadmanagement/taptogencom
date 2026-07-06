export interface AgentConfig {
  id: string;
  name: string;
  role: string;
  systemInstruction: string;
}

export interface AgentSessionState {
  sessionId: string;
  history: string[];
}
