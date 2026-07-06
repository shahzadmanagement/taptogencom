import fs from 'fs';

/**
 * Lists contents of target directory
 * @param path absolute directory path
 * @returns names list
 */
export async function listDirectoryTool(path: string): Promise<string[]> {
  if (path.includes('..')) {
    throw new Error('Path traversal detected.');
  }
  return fs.promises.readdir(path);
}
