import { getTool } from './toolRegistry';
import { validateToolArgs } from './toolValidator';

/**
 * Validates parameters and runs callback handler
 * @param name tool descriptor name
 * @param args parameters map arguments
 * @returns handler resolved data
 */
export async function executeTool(name: string, args: Record<string, any>): Promise<any> {
  const tool = getTool(name);
  if (!tool) {
    throw new Error(`Tool "${name}" not found in registry catalog.`);
  }

  if (!validateToolArgs(tool, args)) {
    throw new Error(`Invalid arguments parameters format payload for tool "${name}".`);
  }

  return await tool.handler(args);
}
