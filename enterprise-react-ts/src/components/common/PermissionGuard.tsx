import type { ReactNode } from 'react';
import { useAuthStore } from '../../store/authStore';
import type { Permission } from '../../types/auth.types';

interface Props {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGuard({ permission, children, fallback = null }: Props) {
  const allowed = useAuthStore((state) => state.hasPermission(permission));
  return allowed ? <>{children}</> : <>{fallback}</>;
}
