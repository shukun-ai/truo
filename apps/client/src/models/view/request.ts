import { ApiResponseData } from '@shukun/api';
import { RoleResourceType, ViewSchema } from '@shukun/schema';

import { httpRequestService } from '../../utils/http-helper';

export async function findAllViews() {
  const response = await httpRequestService
    .createAxios()
    .get<ApiResponseData<ViewSchema[]>>(
      `${RoleResourceType.View}/:orgName/views`,
    );
  return response;
}
