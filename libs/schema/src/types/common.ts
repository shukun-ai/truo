import { AttachmentsSchema } from './attachments';

export type IDString = string;
export type OperatorId = IDString | null;

export enum RoleResourceType {
  Public = 'public',
  Internal = 'internal',
  Source = 'source',
  View = 'view',
  Webhook = 'webhook',
  Developer = 'developer',
  Tenant = 'tenant',
}

export interface SystemPositionModel {
  owner: IDString;
  name: string;
  label: string;
  users: IDString[];
  roles: IDString[];
}

export interface SystemGroupModel {
  owner: IDString;
  users: IDString[];
  label: string;
  roles: string[];
  parent: IDString;
}

export interface SystemUserModel {
  owner: IDString;
  username: string;
  displayName: string;
  password: string;
  avatar: AttachmentsSchema;
  locale: string;
  timezone: string;
}
