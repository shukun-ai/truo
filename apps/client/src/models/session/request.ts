import { RoleResourceType } from '@shukun/schema';
import { ApiResponseData, createAxios } from '../../utils/axios';

import { AuthApiModel } from './model';

export interface SignInData {
  orgName: string;
  username: string;
  password: string;
}

export async function signIn(data: SignInData) {
  const response = await createAxios().post<ApiResponseData<AuthApiModel>>(
    `${RoleResourceType.Public}/${data.orgName}/authentication/jwt`,
    data,
  );
  return response;
}
