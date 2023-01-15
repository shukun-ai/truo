import { ApiResponseData } from '@shukun/api';
import { RoleResourceType, RoleSchema } from '@shukun/schema';

import { httpRequestService } from '../../utils/http-helper';

export async function findGrantList() {
  const response = await httpRequestService
    .createAxios()
    .get<ApiResponseData<RoleSchema[]>>(
      `${RoleResourceType.Public}/:orgName/grant-list`,
    );
  return response;
}

export async function findGrantRoles() {
  const response = await httpRequestService
    .createAxios()
    .get<ApiResponseData<string[]>>(
      `${RoleResourceType.Public}/:orgName/grant-roles`,
    );
  return response;
}
