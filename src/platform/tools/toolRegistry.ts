import type { ToolDef } from './tool';

const registry = new Map<string, ToolDef>();

/**
 * Registers new tool executor schema
 * @param tool executor properties
 */
export function registerTool(tool: ToolDef) {
  registry.set(tool.name, tool);
}

/**
 * Fetches tool definition metadata
 * @param name tool descriptor name
 * @returns tool definition or undefined
 */
export function getTool(name: string): ToolDef | undefined {
  return registry.get(name);
}
