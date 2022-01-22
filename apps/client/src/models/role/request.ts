import { RoleSchema } from '@shukun/schema';

import { ApiResponseData, createAxios, ResourceType } from '../../utils/axios';

export async function findAllRoles() {
  const response = await createAxios().get<ApiResponseData<RoleSchema[]>>(
    `${ResourceType.Public}/:orgName/roles`,
  );
  return response;
}
