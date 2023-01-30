export interface RoleInput {
  roleName?: string | null;
  read?: string | null;
  write?: string | null;
  modify?: string | null;
  remove?: string | null;
}

export interface Role {
  id?: string | null;
  role_name?: string | null;
  read?: string | null;
  write?: string | null;
  modify?: string | null;
  remove?: string | null;
}

export interface AssignRoleInput {
  userId?: number | null;
  roleId?: number | null;
}
