import type { ToolDef } from './tool';

/**
 * Validates incoming arguments against parameters requirements
 * @param tool executor schema definition
 * @param args incoming arguments
 * @returns boolean checking result
 */
export function validateToolArgs(tool: ToolDef, args: Record<string, any>): boolean {
  for (const param of tool.parameters) {
    const value = args[param.name];
    if (param.required && value === undefined) {
      return false;
    }
    if (value !== undefined && typeof value !== param.type) {
      return false;
    }
  }
  return true;
}
