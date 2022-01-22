import { AxiosResponse } from 'axios';
import merge from 'lodash/merge';

import { IDString } from '../model-helpers';

import { createAxios } from './AxiosInstance';
import { ApiResponseData, QueryParams, ResourceType } from './types';

export interface RequestProps<Model> {
  resourceType: ResourceType;
  urlPath: string;
  globalSelect: Array<keyof Model>;
  orgName?: string;
}

/**
 * @example
 * const atoms = new Request<AtomModel>("editor__atoms", ["_id", "name"]);
 * atoms.findMany();
 */
export class Request<Model> {
  urlPath: string;
  globalSelect: Array<keyof Model>;

  constructor({
    resourceType,
    urlPath,
    globalSelect,
    orgName = ':orgName',
  }: RequestProps<Model>) {
    this.urlPath = `${resourceType}/${orgName}/${urlPath}`;
    this.globalSelect = globalSelect;
  }

  protected combineSelect(select?: Array<keyof Model>) {
    select = select && select.length > 0 ? select : this.globalSelect;
    return select.join(',');
  }

  public async findMany(
    params?: QueryParams,
    select?: Array<keyof Model>,
  ): Promise<AxiosResponse<ApiResponseData<Model[]>>> {
    const response = await createAxios().get<ApiResponseData<Model[]>>(
      this.urlPath,
      {
        params: merge({}, params, {
          select: this.combineSelect(select),
          count: true,
        }),
      },
    );
    return response;
  }

  public async findOne(
    params?: QueryParams,
    select?: Array<keyof Model>,
  ): Promise<AxiosResponse<ApiResponseData<Model>>> {
    // TODO use getOne api instead of getMany
    const response = await createAxios().get<ApiResponseData<Model[]>>(
      this.urlPath,
      {
        params: merge(
          {},
          params,
          {
            limit: 1,
          },
          { select: this.combineSelect(select) },
        ),
      },
    );
    if (response.data.value.length > 0) {
      const newResponse: AxiosResponse<ApiResponseData<Model>> = {
        ...response,
        data: {
          ...response.data,
          value: response.data.value[0],
        },
      };
      return newResponse;
    } else {
      throw new Error('We can not find this id');
    }
  }

  public async createOne(
    data: Record<string, any> & Partial<Model>,
    select?: Array<keyof Model>,
  ) {
    const response = await createAxios().post<
      ApiResponseData<{ _id: IDString }>
    >(this.urlPath, data, { params: { select: this.combineSelect(select) } });
    return response;
  }

  public async createAndFindOne(
    data: Record<string, any> & Partial<Model>,
    select?: Array<keyof Model>,
  ) {
    const createdResponse = await this.createOne(data, select);
    const foundResponse = await this.findOne({
      filter: { _id: createdResponse.data.value._id },
    });
    return foundResponse;
  }

  public async updateOne(
    id: string,
    data: Record<string, any> & Partial<Model>,
    select?: Array<keyof Model>,
  ) {
    const response = await createAxios().put<ApiResponseData<null>>(
      `${this.urlPath}/${id}`,
      data,
      { params: { select: this.combineSelect(select) } },
    );
    return response;
  }

  public async removeOne(id: string) {
    const response = await createAxios().delete<ApiResponseData<null>>(
      `${this.urlPath}/${id}`,
    );
    return response;
  }
}
