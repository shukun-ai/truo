import { ApiResponseData, createAxios, ResourceType } from '../../utils/axios';

import { AuthApiModel } from './model';

export interface SignInData {
  orgName: string;
  username: string;
  password: string;
}

export async function signIn(data: SignInData) {
  const response = await createAxios().post<ApiResponseData<AuthApiModel>>(
    `${ResourceType.Public}/${data.orgName}/authentication/jwt`,
    data,
  );
  return response;
}
