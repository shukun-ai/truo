import { ApiResponseData, QueryParams } from '@shukun/api';
import { MetadataSchema, RoleResourceType } from '@shukun/schema';

import { httpRequestService } from '../../utils/http-helper';

// TODO Design a new API SDK in @shukun/api, not only source api.
// TODO SE stable level
export async function findOneMetadata(source: string, params?: QueryParams) {
  const response = await httpRequestService
    .createAxios()
    .post<ApiResponseData<MetadataSchema>>(
      `${RoleResourceType.Source}/:orgName/${source}/any/metadata`,
      { params },
    );
  return response;
}
