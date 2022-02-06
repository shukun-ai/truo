import { RoleResourceType, RoleSchema } from '@shukun/schema';

import { ApiResponseData } from '@shukun/api';
import { httpRequestService } from '../../utils/http-helper';

export async function findAllRoles() {
  const response = await httpRequestService
    .createAxios()
    .get<ApiResponseData<RoleSchema[]>>(
      `${RoleResourceType.Public}/:orgName/roles`,
    );
  return response;
}
