export type UserRole = 'viewer' | 'operator' | 'admin';

const permissions: Record<UserRole, string[]> = {
  viewer: ['read_dashboard'],
  operator: ['read_dashboard', 'toggle_features'],
  admin: ['read_dashboard', 'toggle_features', 'change_settings', 'view_audit']
};

class AccessControl {
  canUserPerform(role: UserRole, action: string): boolean {
    const allowed = permissions[role];
    return allowed ? allowed.includes(action) : false;
  }
}

export const accessControl = new AccessControl();
