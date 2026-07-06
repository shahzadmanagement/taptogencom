import type { ChildProcess } from 'child_process';

const activeProcesses = new Map<number, ChildProcess>();

/**
 * Registers running process metadata
 */
export function registerProcess(pid: number, proc: ChildProcess) {
  activeProcesses.set(pid, proc);
}

/**
 * Terminates process by PID identifier
 */
export function killProcess(pid: number) {
  const proc = activeProcesses.get(pid);
  if (proc) {
    proc.kill();
    activeProcesses.delete(pid);
  }
}
