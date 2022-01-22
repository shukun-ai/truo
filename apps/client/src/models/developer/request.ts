import { ApiResponseData, createAxios, ResourceType } from '../../utils/axios';

export async function uploadCodebase(file: FormData) {
  const response = await createAxios().post<ApiResponseData<null>>(
    `${ResourceType.Developer}/:orgName/codebase`,
    file,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response;
}
