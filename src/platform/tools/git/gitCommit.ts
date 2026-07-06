import { exec } from 'child_process';

/**
 * Runs git commit command in current workspace
 * @param message commit message
 * @returns execution result outcome
 */
export function commitChanges(message: string): Promise<string> {
  const cleanMsg = message.replace(/'/g, "'\\''");
  return new Promise((resolve, reject) => {
    exec(`git commit -m '${cleanMsg}'`, (err, stdout, stderr) => {
      if (err) return reject(new Error(stderr || err.message));
      resolve(stdout);
    });
  });
}
