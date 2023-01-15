export type GrantedRoles = string[];

export type PermissionNodes = {
  type: string;
  name: string;
  action: string | null;
  recordMode: 'any' | 'own';
  attributeMode: 'allow' | 'deny';
  reverseAttributes: string[];
};

export const SOURCE_QUERY_FAMILY = ['metadata', 'query'];

export const SOURCE_UPDATE_FAMILY = [
  'update',
  'add-to-many',
  'remove-from-many',
  'increase',
];
