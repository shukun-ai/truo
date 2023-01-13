export type GrantList = {
  name: string;
  permissions: string[];
}[];

export type GrantRoles = string[];

export type GrantAction =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'readOwn'
  | 'updateOwn'
  | 'deleteOwn';
