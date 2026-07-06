import { permissions } from './permissions';

export type RoleName = 'user' | 'moderator' | 'admin';

export interface RoleDef {
  name: RoleName;
  permissionsList: string[];
  inheritsFrom?: RoleName;
}

export const rolesRegistry: Record<RoleName, RoleDef> = {
  user: {
    name: 'user',
    permissionsList: [permissions.READ_TOOLS, permissions.GENERATE_TEXT]
  },
  moderator: {
    name: 'moderator',
    permissionsList: [permissions.DOWNLOAD_FILE],
    inheritsFrom: 'user'
  },
  admin: {
    name: 'admin',
    permissionsList: [permissions.ADMIN_SETTINGS],
    inheritsFrom: 'moderator'
  }
};
