import { RoleResourceType } from '@shukun/schema';
import { AxiosResponse } from 'axios';
import merge from 'lodash/merge';

import { HttpRequestService } from './http-request.service';

import { IDString, ApiResponseData, QueryParams } from './shared-types';

export interface RestfulRequestServiceOptions {
  atomName: string;
  orgName?: string;
}

/**
 * @example
 * const atoms = new RestfulRequestService<SystemUsersModel>({ atomName: "system__users" });
 * atoms.findMany<"_id", "name">({ "_id": true, "name": true });
 */
export class RestfulRequestService<Model> {
  urlPath: string;

  constructor(
    private readonly httpRequestService: HttpRequestService,
    { atomName, orgName = ':orgName' }: RestfulRequestServiceOptions,
  ) {
    const resourceType = RoleResourceType.Source;
    this.urlPath = `${resourceType}/${orgName}/${atomName}`;
  }

  protected combineSelect<SelectedFields extends keyof Model>(
    select: Record<SelectedFields, true>,
  ) {
    return Object.keys(select).join(',');
  }

  public async findMany<SelectedFields extends keyof Model>(
    params: QueryParams,
    select: Record<SelectedFields, true>,
  ): Promise<AxiosResponse<ApiResponseData<Pick<Model, SelectedFields>[]>>> {
    const response = await this.httpRequestService
      .createAxios()
      .get<ApiResponseData<Pick<Model, SelectedFields>[]>>(this.urlPath, {
        params: merge({}, params, {
          select: this.combineSelect(select),
          count: true,
        }),
      });
    return response;
  }

  public async findOne<SelectedFields extends keyof Model>(
    params: QueryParams,
    select: Record<SelectedFields, true>,
  ): Promise<AxiosResponse<ApiResponseData<Pick<Model, SelectedFields>>>> {
    // TODO use getOne api instead of getMany
    const response = await this.httpRequestService
      .createAxios()
      .get<ApiResponseData<Pick<Model, SelectedFields>[]>>(this.urlPath, {
        params: merge(
          {},
          params,
          {
            limit: 1,
          },
          { select: this.combineSelect(select) },
        ),
      });
    if (response.data.value.length > 0) {
      const newResponse: AxiosResponse<
        ApiResponseData<Pick<Model, SelectedFields>>
      > = {
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

  public async createOne(data: Partial<Model>): Promise<
    AxiosResponse<
      ApiResponseData<{
        _id: IDString;
      }>
    >
  > {
    const response = await this.httpRequestService
      .createAxios()
      .post<ApiResponseData<{ _id: IDString }>>(this.urlPath, data);
    return response;
  }

  public async createAndFindOne<SelectedFields extends keyof Model>(
    data: Partial<Model>,
    select: Record<SelectedFields, true>,
  ): Promise<AxiosResponse<ApiResponseData<Pick<Model, SelectedFields>>>> {
    const createdResponse = await this.createOne(data);
    const foundResponse = await this.findOne(
      {
        filter: { _id: createdResponse.data.value._id },
      },
      select,
    );
    return foundResponse;
  }

  public async updateOne(
    id: string,
    data: Partial<Model>,
  ): Promise<AxiosResponse<ApiResponseData<null>>> {
    const response = await this.httpRequestService
      .createAxios()
      .put<ApiResponseData<null>>(`${this.urlPath}/${id}`, data);
    return response;
  }

  public async removeOne(
    id: string,
  ): Promise<AxiosResponse<ApiResponseData<null>>> {
    const response = await this.httpRequestService
      .createAxios()
      .delete<ApiResponseData<null>>(`${this.urlPath}/${id}`);
    return response;
  }
}
