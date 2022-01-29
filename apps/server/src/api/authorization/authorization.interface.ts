import { RoleResourceType } from '@shukun/schema';

export interface ResourceNodes {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  orgName: string;
  resourceType: RoleResourceType;
  resourceName: string;
  resourceId?: string;
}
