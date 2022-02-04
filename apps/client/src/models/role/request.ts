import { RoleResourceType, RoleSchema } from '@shukun/schema';

import { ApiResponseData, createAxios } from '../../utils/axios';

export async function findAllRoles() {
  const response = await createAxios().get<ApiResponseData<RoleSchema[]>>(
    `${RoleResourceType.Public}/:orgName/roles`,
  );
  return response;
}
