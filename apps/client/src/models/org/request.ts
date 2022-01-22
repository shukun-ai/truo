import { ApiResponseData, createAxios, ResourceType } from '../../utils/axios';

import { OrgModel } from './model';

export async function findOneOrg(orgName: string | null) {
  const response = await createAxios().get<ApiResponseData<OrgModel>>(
    `${ResourceType.Public}/${orgName || ':orgName'}/org`,
  );
  return response;
}
