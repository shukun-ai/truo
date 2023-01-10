import { InspectionResponse } from '@shukun/api';
import { RoleResourceType, ApiResponseData } from '@shukun/schema';

import { httpRequestService } from '../../utils/http-helper';

export class InspectionService {
  public async queryInspection() {
    const response = await httpRequestService
      .createAxios()
      .get<ApiResponseData<InspectionResponse>>(
        `${RoleResourceType.Developer}/:orgName/inspection`,
      );
    return response;
  }
}
