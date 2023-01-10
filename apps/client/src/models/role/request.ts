import { ApiResponseData } from '@shukun/api';
import { RoleResourceType, RoleSchema } from '@shukun/schema';

import { httpRequestService } from '../../utils/http-helper';

export async function findAllRoles() {
  const response = await httpRequestService
    .createAxios()
    .get<ApiResponseData<RoleSchema[]>>(
      `${RoleResourceType.Public}/:orgName/roles`,
    );
  return response;
}
