import { InspectionResponse } from '@shukun/api';
import { RoleResourceType } from '@shukun/schema';
import { ApiResponseData, createAxios } from '../../utils/axios';

export class InspectionService {
  public async queryInspection() {
    const response = await createAxios().get<
      ApiResponseData<InspectionResponse>
    >(`${RoleResourceType.Developer}/:orgName/inspection`);
    return response;
  }
}
