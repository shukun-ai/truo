import { ApiResponseData, createAxios, ResourceType } from '../../utils/axios';

import { GrantList, GrantRoles } from './model';

export async function findGrantList() {
  const response = await createAxios().get<ApiResponseData<GrantList>>(
    `${ResourceType.Public}/:orgName/grant-list`,
  );
  return response;
}

export async function findGrantRoles() {
  const response = await createAxios().get<ApiResponseData<GrantRoles>>(
    `${ResourceType.Public}/:orgName/grant-roles`,
  );
  return response;
}
