import fs from 'fs';

/**
 * Writes text contents to target path
 * @param path absolute file path
 * @param content content string
 */
export async function writeFileTool(path: string, content: string): Promise<void> {
  if (path.includes('..')) {
    throw new Error('Path traversal detected.');
  }
  return fs.promises.writeFile(path, content, 'utf-8');
}
