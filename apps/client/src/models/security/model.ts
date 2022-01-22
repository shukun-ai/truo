export interface GrantList {
  [roleName: string]: {
    [resource: string]: {
      'create:any': string[];
      'read:any': string[];
      'update:any': string[];
      'delete:any': string[];
      'create:own': string[];
      'read:own': string[];
      'update:own': string[];
      'delete:own': string[];
    };
  };
}

export type GrantRoles = string[];
