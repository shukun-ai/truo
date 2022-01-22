import { ViewSchema } from '@shukun/schema';

import { ApiResponseData, createAxios, ResourceType } from '../../utils/axios';

export async function findAllViews() {
  const response = await createAxios().get<ApiResponseData<ViewSchema[]>>(
    `${ResourceType.View}/:orgName/views`,
  );
  return response;
}
