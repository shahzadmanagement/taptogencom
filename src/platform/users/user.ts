import type { UserProfile } from './profile';
import type { UserPreferences } from './preferences';
import type { Organization } from './organization';

export interface User {
  id: string;
  email: string;
  role: 'user' | 'moderator' | 'admin';
  profile: UserProfile;
  preferences: UserPreferences;
  organizationsList: Organization[];
}

/**
 * Serializes user metadata context clean
 * @param user target User model
 * @returns serialized JSON object string
 */
export function serializeUser(user: User): string {
  return JSON.stringify(user);
}
