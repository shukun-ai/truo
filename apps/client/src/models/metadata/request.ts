import { MetadataSchema, RoleResourceType } from '@shukun/schema';

import { ApiResponseData, QueryParams } from '@shukun/api';
import { httpRequestService } from '../../utils/http-helper';

// @todo should use core api not source api for getting metadata.
export async function findOneMetadata(source: string, params?: QueryParams) {
  const response = await httpRequestService
    .createAxios()
    .get<ApiResponseData<MetadataSchema>>(
      `${RoleResourceType.Source}/:orgName/${source}/metadata`,
      { params: { ...params, select: '_all' } },
    );
  return response;
}
