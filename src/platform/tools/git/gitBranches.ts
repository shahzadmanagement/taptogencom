import { exec } from 'child_process';

/**
 * Lists available workspace git branches
 * @returns branch list text
 */
export function listGitBranches(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec('git branch -a', (err, stdout, stderr) => {
      if (err) return reject(new Error(stderr || err.message));
      resolve(stdout);
    });
  });
}
