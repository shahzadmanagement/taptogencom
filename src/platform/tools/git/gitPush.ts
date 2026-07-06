import { exec } from 'child_process';

/**
 * Runs git push changes to remote origin branch
 * @param branch branch name
 * @returns execution result outcome
 */
export function pushChanges(branch = 'main'): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`git push origin ${branch}`, (err, stdout, stderr) => {
      if (err) return reject(new Error(stderr || err.message));
      resolve(stdout);
    });
  });
}
