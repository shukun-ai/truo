import { RoleAction } from '@shukun/schema';
import { Permission } from 'accesscontrol';

type GrantListAttribute = string;

export interface AccessControlPermission {
  role: string;
  resource: string;
  action: RoleAction;
  attributes: string;
}

export interface GrantList {
  [userId: string]: {
    [resource: string]: {
      [action: string]: GrantListAttribute[];
    };
  };
}

export enum AccessResourcePrefix {
  Core = 'core',
  Source = 'source',
}

export enum AccessActionType {
  Read = 'read',
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

export enum AccessActionRange {
  Any = 'any',
  Own = 'own',
}

export enum AccessInternalRoles {
  Owner = 'owner',
  Anonymous = 'anonymous',
}

export type SecurityAccessPermission = (
  targetActionRange: AccessActionRange,
) => Permission;

export interface UrlNodes {
  apiPrefix?: string;
  apiVersion?: string;
  apiType?: string;
  orgName?: string;
  sourceName?: string;
  sourceId?: string;
  sourceFunction?: string;
}
