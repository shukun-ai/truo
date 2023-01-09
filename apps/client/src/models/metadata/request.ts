import { ApiResponseData, QueryParams } from '@shukun/api';
import { MetadataSchema, RoleResourceType } from '@shukun/schema';

import { httpRequestService } from '../../utils/http-helper';

// TODO should use core api not source api for getting metadata.
export async function findOneMetadata(source: string, params?: QueryParams) {
  const response = await httpRequestService
    .createAxios()
    .get<ApiResponseData<MetadataSchema>>(
      `${RoleResourceType.Source}/:orgName/${source}/metadata`,
      { params },
    );
  return response;
}
