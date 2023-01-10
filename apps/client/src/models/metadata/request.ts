import {
  MetadataSchema,
  RoleResourceType,
  ApiResponseData,
  HttpQuerySchema,
} from '@shukun/schema';

import { httpRequestService } from '../../utils/http-helper';

// TODO should use core api not source api for getting metadata.
export async function findOneMetadata(
  source: string,
  params?: HttpQuerySchema,
) {
  const response = await httpRequestService
    .createAxios()
    .get<ApiResponseData<MetadataSchema>>(
      `${RoleResourceType.Source}/:orgName/${source}/metadata`,
      { params },
    );
  return response;
}
