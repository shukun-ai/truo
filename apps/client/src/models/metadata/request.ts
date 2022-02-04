import { MetadataSchema, RoleResourceType } from '@shukun/schema';

import { ApiResponseData, createAxios, QueryParams } from '../../utils/axios';

// @todo should use core api not source api for getting metadata.
export async function findOneMetadata(source: string, params?: QueryParams) {
  const response = await createAxios().get<ApiResponseData<MetadataSchema>>(
    `${RoleResourceType.Source}/:orgName/${source}/metadata`,
    { params: { ...params, select: '_all' } },
  );
  return response;
}
