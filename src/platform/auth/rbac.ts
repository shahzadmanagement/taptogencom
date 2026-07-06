import { rolesRegistry, type RoleName } from './roles';

/**
 * Checks if a role is permitted to perform a target scope action
 * @param role target role Name
 * @param action permission code
 * @returns outcome
 */
export function checkPermission(role: RoleName, action: string): boolean {
  const definition = rolesRegistry[role];
  if (!definition) return false;

  // Direct check
  if (definition.permissionsList.includes(action)) return true;

  // Recurse inheritance
  if (definition.inheritsFrom) {
    return checkPermission(definition.inheritsFrom, action);
  }

  return false;
}
