import { IDString } from '../../utils/model-helpers';

export interface AuthModel {
  userId: IDString;
  username: string;
  orgName: string;
  orgId: IDString;
  accessToken: string;
  expiresTimestamp: number;
}

export interface AuthApiModel extends Omit<AuthModel, 'expiresAt'> {
  expiresIn: number;
}
