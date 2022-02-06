import { MetadataSchema, RoleResourceType } from '@shukun/schema';
import { AxiosResponse } from 'axios';

import {
  UnknownSourceModel,
  ApiResponseData,
  QueryParams,
} from './shared-types';
import { HttpRequestService } from './http-request.service';

import { RestfulRequestService } from './restful-request.service';

export class MetadataRequestService<Model = UnknownSourceModel> {
  metadata: MetadataSchema;
  request: RestfulRequestService<Model>;

  constructor(
    private readonly httpRequestService: HttpRequestService,
    metadata: MetadataSchema,
    options?: { globalSelect?: string[] },
  ) {
    const urlPath = metadata.name;
    const globalSelect =
      options?.globalSelect ??
      metadata.electrons.map((item) => item.name).concat('_id');

    this.metadata = metadata;

    this.request = new RestfulRequestService<Model>(this.httpRequestService, {
      resourceType: RoleResourceType.Source,
      urlPath,
      globalSelect: globalSelect as any,
    });
  }

  public async findMany(
    params?: QueryParams,
  ): Promise<AxiosResponse<ApiResponseData<Model[]>>> {
    return this.request.findMany(params);
  }

  public async findOne(
    params?: QueryParams,
  ): Promise<AxiosResponse<ApiResponseData<Model>>> {
    return this.request.findOne(params);
  }

  public async createOne(data: Record<string, any> & Partial<Model>) {
    return this.request.createOne(data);
  }

  public async createAndFindOne(data: Record<string, any> & Partial<Model>) {
    return this.request.createAndFindOne(data);
  }

  public async updateOne(
    id: string,
    data: Record<string, any> & Partial<Model>,
  ) {
    return this.request.updateOne(id, data);
  }

  public async removeOne(id: string) {
    return this.request.removeOne(id);
  }
}
