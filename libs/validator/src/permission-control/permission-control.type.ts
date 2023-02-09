export type GrantedRoles = string[];

export type PermissionNodes = {
  type: string;
  name: string;
  action: string | null;
  recordMode: 'any' | 'own';
  attributeMode: 'allow' | 'deny';
  reverseAttributes: string[];
};

export const SOURCE_ALLOW_ACTIONS = ['read', 'create', 'update', 'delete'];

export const SOURCE_READ_FAMILY = ['metadata', 'query'];

export const SOURCE_UPDATE_FAMILY = [
  'update',
  'add-to-many',
  'remove-from-many',
  'increase',
];
