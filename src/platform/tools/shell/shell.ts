import { exec } from 'child_process';
import { validateSandboxCommand } from './sandbox';
import { registerProcess } from './processManager';

/**
 * Runs a shell command asynchronously within validation boundaries
 * @param command target shell command
 * @returns stdout text content response
 */
export function runShellCommand(command: string): Promise<string> {
  if (!validateSandboxCommand(command)) {
    return Promise.reject(new Error('Command blocked by sandbox policy parameters.'));
  }

  return new Promise((resolve, reject) => {
    const child = exec(command, (err, stdout, stderr) => {
      if (err) return reject(new Error(stderr || err.message));
      resolve(stdout);
    });
    if (child.pid) {
      registerProcess(child.pid, child);
    }
  });
}
