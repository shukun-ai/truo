import { InspectionResponse } from '@shukun/api';
import { RoleResourceType } from '@shukun/schema';
import { ApiResponseData } from '@shukun/api';
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
