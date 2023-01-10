import { RoleResourceType, ApiResponseData } from '@shukun/schema';

import { httpRequestService } from '../../utils/http-helper';

import { GrantList, GrantRoles } from './model';

export async function findGrantList() {
  const response = await httpRequestService
    .createAxios()
    .get<ApiResponseData<GrantList>>(
      `${RoleResourceType.Public}/:orgName/grant-list`,
    );
  return response;
}

export async function findGrantRoles() {
  const response = await httpRequestService
    .createAxios()
    .get<ApiResponseData<GrantRoles>>(
      `${RoleResourceType.Public}/:orgName/grant-roles`,
    );
  return response;
}
