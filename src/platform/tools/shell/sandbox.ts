const restrictedCommands = ['rm -rf', 'format', 'mkfs', 'shutdown', 'reboot'];

/**
 * Checks command against restricted blacklists parameters
 * @param command target shell command
 * @returns boolean validation check status
 */
export function validateSandboxCommand(command: string): boolean {
  const norm = command.toLowerCase().trim();
  return !restrictedCommands.some(c => norm.includes(c));
}
