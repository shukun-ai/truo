import { RsaHelper } from '@shukun/api';
import { RoleResourceType, ApiResponseData } from '@shukun/schema';

import { environment } from '../../environments';

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
  if (environment.cryptoPassword) {
    return signInWithEncrypt(data);
  } else {
    return signInWithoutEncrypt(data);
  }
}

export async function signInWithoutEncrypt(data: SignInData) {
  const signInData: SignInData = {
    orgName: data.orgName,
    username: data.username,
    password: data.password,
  };

  const response = await httpRequestService
    .createAxios()
    .post<ApiResponseData<AuthApiModel>>(
      `${RoleResourceType.Public}/${data.orgName}/authentication/jwt`,
      signInData,
    );
  return response;
}

export async function signInWithEncrypt(data: SignInData) {
  const signInDataWithEncrypt: SignInDataWithEncrypt = {
    orgName: data.orgName,
    username: data.username,
    encryptPassword: await encryptPassword(data.password),
  };

  const response = await httpRequestService
    .createAxios()
    .post<ApiResponseData<AuthApiModel>>(
      `${RoleResourceType.Public}/${data.orgName}/authentication/jwt_encrypt`,
      signInDataWithEncrypt,
    );
  return response;
}

async function encryptPassword(password: string) {
  const publicKeyPem = environment.rsaPublicKey;

  if (!publicKeyPem) {
    throw new Error('公钥配置错误，请联系管理员');
  }

  const rsaHelper = new RsaHelper();
  await rsaHelper.importPublicKey(publicKeyPem);
  const encryptedPassword = await rsaHelper.encrypt(password);
  return encryptedPassword;
}
