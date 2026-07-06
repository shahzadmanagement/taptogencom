/**
 * Mock password hashing function
 * @param password raw password
 * @returns hashed password
 */
export function hashPassword(password: string): Promise<string> {
  return Promise.resolve(`hashed_prefix_${password}`);
}

/**
 * Verifies a password against a hash
 * @param password raw password
 * @param hash hashed password
 * @returns verification outcome
 */
export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return Promise.resolve(hash === `hashed_prefix_${password}`);
}
