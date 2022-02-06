import { RoleResourceType } from '@shukun/schema';
import { ApiResponseData } from '@shukun/api';
import { httpRequestService } from '../../utils/http-helper';

import { AuthApiModel } from './model';

export interface SignInData {
  orgName: string;
  username: string;
  password: string;
}

export async function signIn(data: SignInData) {
  const response = await httpRequestService
    .createAxios()
    .post<ApiResponseData<AuthApiModel>>(
      `${RoleResourceType.Public}/${data.orgName}/authentication/jwt`,
      data,
    );
  return response;
}
