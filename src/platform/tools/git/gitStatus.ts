import { exec } from 'child_process';

/**
 * Runs git status check in current workspace
 * @returns status output text
 */
export function getGitStatus(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec('git status', (err, stdout, stderr) => {
      if (err) return reject(new Error(stderr || err.message));
      resolve(stdout);
    });
  });
}
