export type GrantedRoles = string[];

export type PermissionNodes = {
  type: string;
  name: string;
  action: string | null;
  recordMode: 'any' | 'own';
  attributeMode: 'allow' | 'deny';
  reverseAttributes: string[];
};
