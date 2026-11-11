import { create } from 'zustand';
import type { AuthUser, Permission, Role } from '../types/auth.types';

const permissionsByRole: Record<Role, Permission[]> = {
  Admin: ['employee:view', 'employee:create', 'employee:update', 'employee:delete'],
  Manager: ['employee:view', 'employee:create', 'employee:update'],
  Employee: ['employee:view'],
};

interface AuthState {
  user: AuthUser;
  switchRole: (role: Role) => void;
  hasPermission: (permission: Permission) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: {
    id: 1,
    name: 'Alex Morgan',
    role: 'Admin',
    permissions: permissionsByRole.Admin,
  },
  switchRole: (role) => set({
    user: {
      id: 1,
      name: 'Alex Morgan',
      role,
      permissions: permissionsByRole[role],
    },
  }),
  hasPermission: (permission) => get().user.permissions.includes(permission),
}));
