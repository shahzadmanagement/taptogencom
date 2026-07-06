import fs from 'fs';

/**
 * Removes file from target path
 * @param path absolute file path
 */
export async function deleteFileTool(path: string): Promise<void> {
  if (path.includes('..')) {
    throw new Error('Path traversal detected.');
  }
  return fs.promises.unlink(path);
}
