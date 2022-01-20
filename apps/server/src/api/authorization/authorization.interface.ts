import { ResourceType } from '../api.type';

export interface ResourceNodes {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  orgName: string;
  resourceType: ResourceType;
  resourceName: string;
  resourceId?: string;
}
