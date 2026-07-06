import fs from 'fs';

/**
 * Reads local filesystem files asynchronously
 * @param path absolute file path
 * @returns text content
 */
export async function readFileTool(path: string): Promise<string> {
  // Simple validation to prevent path traversal outside workspace
  if (path.includes('..')) {
    throw new Error('Path traversal detected.');
  }
  return fs.promises.readFile(path, 'utf-8');
}
