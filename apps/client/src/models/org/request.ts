import { ApiResponseData } from '@shukun/api';
import { RoleResourceType } from '@shukun/schema';

import { httpRequestService } from '../../utils/http-helper';

import { OrgModel } from './model';

export async function findOneOrg(orgName: string | null) {
  const response = await httpRequestService
    .createAxios()
    .get<ApiResponseData<OrgModel>>(
      `${RoleResourceType.Public}/${orgName || ':orgName'}/org`,
    );
  return response;
}
