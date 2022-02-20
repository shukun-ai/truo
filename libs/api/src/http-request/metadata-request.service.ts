import { MetadataElectron, MetadataSchema } from '@shukun/schema';
import { AxiosResponse } from 'axios';

import { HttpRequestService } from './http-request.service';

import { RestfulRequestService } from './restful-request.service';
import { IDString } from './shared-types';
import {
  UnknownSourceModel,
  ApiResponseData,
  QueryParams,
} from './shared-types';

export class MetadataRequestService<Model = UnknownSourceModel> {
  metadata: MetadataSchema;
  request: RestfulRequestService<Model>;
  globalSelect: Record<keyof Model, true>;

  constructor(
    private readonly httpRequestService: HttpRequestService,
    metadata: MetadataSchema,
  ) {
    const atomName = metadata.name;
    this.metadata = metadata;

    this.request = new RestfulRequestService<Model>(this.httpRequestService, {
      atomName,
    });

    this.globalSelect = this.convertGlobalSelect(metadata.electrons);
  }

  protected convertGlobalSelect(
    electrons: MetadataElectron[],
  ): Record<keyof Model, true> {
    const selectKeys: string[] = electrons
      .map((item) => item.name)
      .concat('_id', 'updatedAt', 'createdAt');

    const initialValue = {} as Record<keyof Model, true>;

    const select = selectKeys.reduce((previous, current) => {
      previous[current as keyof Model] = true;
      return previous;
    }, initialValue);

    return select;
  }

  public async findMany(
    params?: QueryParams,
  ): Promise<AxiosResponse<ApiResponseData<Model[]>>> {
    return this.request.findMany(params || {}, this.globalSelect);
  }

  public async findOne(
    params?: QueryParams,
  ): Promise<AxiosResponse<ApiResponseData<Model>>> {
    return this.request.findOne(params || {}, this.globalSelect);
  }

  public async createOne(data: Partial<Model>): Promise<
    AxiosResponse<
      ApiResponseData<{
        _id: IDString;
      }>
    >
  > {
    return this.request.createOne(data);
  }

  public async createAndFindOne(
    data: Partial<Model>,
  ): Promise<AxiosResponse<ApiResponseData<Model>>> {
    return this.request.createAndFindOne(data, this.globalSelect);
  }

  public async updateOne(
    id: string,
    data: Partial<Model>,
  ): Promise<AxiosResponse<ApiResponseData<null>>> {
    return this.request.updateOne(id, data);
  }

  public async removeOne(
    id: string,
  ): Promise<AxiosResponse<ApiResponseData<null>>> {
    return this.request.removeOne(id);
  }
}
