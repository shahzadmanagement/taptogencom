import type { AgentConfig } from './agent';

const registry = new Map<string, AgentConfig>();

/**
 * Registers an agent configuration definition
 * @param config agent settings
 */
export function registerAgent(config: AgentConfig) {
  registry.set(config.id, config);
}

/**
 * Fetches an agent definition by ID
 * @param id agent ID
 * @returns settings or undefined
 */
export function getAgent(id: string): AgentConfig | undefined {
  return registry.get(id);
}
