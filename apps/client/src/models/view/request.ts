import { RoleResourceType, ViewSchema } from '@shukun/schema';

import { ApiResponseData, createAxios } from '../../utils/axios';

export async function findAllViews() {
  const response = await createAxios().get<ApiResponseData<ViewSchema[]>>(
    `${RoleResourceType.View}/:orgName/views`,
  );
  return response;
}
