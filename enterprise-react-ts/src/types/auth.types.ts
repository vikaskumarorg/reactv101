export type Role = 'Admin' | 'Manager' | 'Employee';

export type Permission =
  | 'employee:view'
  | 'employee:create'
  | 'employee:update'
  | 'employee:delete';

export interface AuthUser {
  id: number;
  name: string;
  role: Role;
  permissions: Permission[];
}
