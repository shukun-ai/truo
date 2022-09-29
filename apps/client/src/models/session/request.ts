import { ApiResponseData } from '@shukun/api';
import { RoleResourceType } from '@shukun/schema';

import { httpRequestService } from '../../utils/http-helper';

import { AuthApiModel } from './model';

export interface SignInData {
  orgName: string;
  username: string;
  password: string;
}

export interface SignInDataWithEncrypt {
  orgName: string;
  username: string;
  encryptPassword: string;
}

export async function signIn(data: SignInData) {
  const signInDataWithEncrypt: SignInDataWithEncrypt = {
    orgName: data.orgName,
    username: data.username,
    encryptPassword: encryptPassword(data.password),
  };

  const response = await httpRequestService
    .createAxios()
    .post<ApiResponseData<AuthApiModel>>(
      `${RoleResourceType.Public}/${data.orgName}/authentication/jwt_encrypt`,
      signInDataWithEncrypt,
    );
  return response;
}

function encryptPassword(password: string) {
  return password;
}
