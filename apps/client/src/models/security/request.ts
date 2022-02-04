import { RoleResourceType } from '@shukun/schema';
import { ApiResponseData, createAxios } from '../../utils/axios';

import { GrantList, GrantRoles } from './model';

export async function findGrantList() {
  const response = await createAxios().get<ApiResponseData<GrantList>>(
    `${RoleResourceType.Public}/:orgName/grant-list`,
  );
  return response;
}

export async function findGrantRoles() {
  const response = await createAxios().get<ApiResponseData<GrantRoles>>(
    `${RoleResourceType.Public}/:orgName/grant-roles`,
  );
  return response;
}
