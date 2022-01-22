import { MetadataSchema } from '@shukun/schema';
import { AxiosResponse } from 'axios';

import { UnknownMetadataModel } from '../../models/metadata';

import { Request } from './Request';
import { ApiResponseData, QueryParams, ResourceType } from './types';

export class MetadataRequest<Model = UnknownMetadataModel> {
  metadata: MetadataSchema;
  request: Request<Model>;

  constructor(metadata: MetadataSchema, options?: { globalSelect?: string[] }) {
    const urlPath = metadata.name;
    const globalSelect =
      options?.globalSelect ??
      metadata.electrons.map((item) => item.name).concat('_id');

    this.metadata = metadata;
    this.request = new Request<Model>({
      resourceType: ResourceType.Source,
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
