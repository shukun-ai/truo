import { RoleResourceType, ApiResponseData } from '@shukun/schema';

import { httpRequestService } from '../../utils/http-helper';

export async function uploadCodebase(file: FormData) {
  const response = await httpRequestService
    .createAxios()
    .post<ApiResponseData<null>>(
      `${RoleResourceType.Developer}/:orgName/codebase`,
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  return response;
}
