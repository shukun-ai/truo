import { RoleResourceType } from '@shukun/schema';
import { ApiResponseData, createAxios } from '../../utils/axios';

export async function uploadCodebase(file: FormData) {
  const response = await createAxios().post<ApiResponseData<null>>(
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
