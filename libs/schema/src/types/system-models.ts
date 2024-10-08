import { AttachmentsSchema } from './attachments';
import { IDString } from './utils';

export type SystemPublicOrgModel = {
  name: string;
  label: string;
  lightLogo?: string;
  darkLogo?: string;
  mainColor?: string;
};

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
