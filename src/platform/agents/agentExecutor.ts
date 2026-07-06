import type { AgentConfig } from './agent';
import { aiRouter } from '../ai/router';

/**
 * Orchestrates multi-step reasoning generation for a given prompt instructions block
 * @param agent configuration details
 * @param query question query
 * @returns generated output string answer
 */
export async function executeAgentStep(agent: AgentConfig, query: string): Promise<string> {
  const prompt = `[Agent: ${agent.name} (${agent.role})]\nInstruction: ${agent.systemInstruction}\nQuery: ${query}`;
  const response = await aiRouter.routeRequest('gemini', { prompt });
  return response.text;
}
