import { RoleResourceType } from '@shukun/schema';
import { ApiResponseData, createAxios } from '../../utils/axios';

import { OrgModel } from './model';

export async function findOneOrg(orgName: string | null) {
  const response = await createAxios().get<ApiResponseData<OrgModel>>(
    `${RoleResourceType.Public}/${orgName || ':orgName'}/org`,
  );
  return response;
}
