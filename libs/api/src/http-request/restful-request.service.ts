import { RoleResourceType, IDString } from '@shukun/schema';
import { AxiosResponse } from 'axios';
import merge from 'lodash/merge';

import { HttpRequestService } from './http-request.service';
import { RestfulRequestNotFoundError } from './restful-request.exception';

import { ApiResponseData, QueryParams } from './shared-types';

export interface RestfulRequestServiceOptions {
  atomName: string;
  orgName?: string;
}

export interface AddToManyDto {
  electronName: string;
  foreignId: string;
}

export interface IncreaseDto {
  electronName: string;
  increment: number;
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
    return select;
  }

  public async findMany<SelectedFields extends keyof Model>(
    params: QueryParams,
    select: Record<SelectedFields, true>,
  ): Promise<AxiosResponse<ApiResponseData<Pick<Model, SelectedFields>[]>>> {
    const data = merge({}, params, {
      select: this.combineSelect(select),
      count: true,
    });
    const response = await this.httpRequestService
      .createAxios()
      .post<ApiResponseData<Pick<Model, SelectedFields>[]>>(
        `${this.urlPath}/any/query`,
        data,
      );
    return response;
  }

  public async findOne<SelectedFields extends keyof Model>(
    params: QueryParams,
    select: Record<SelectedFields, true>,
  ): Promise<AxiosResponse<ApiResponseData<Pick<Model, SelectedFields>>>> {
    const data = merge(
      {},
      params,
      {
        limit: 1,
      },
      { select: this.combineSelect(select) },
    );
    const response = await this.httpRequestService
      .createAxios()
      .post<ApiResponseData<Pick<Model, SelectedFields>[]>>(
        `${this.urlPath}/any/query`,
        data,
      );
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
      throw new RestfulRequestNotFoundError('We can not find this id');
    }
  }

  public async findOneOrNull<SelectedFields extends keyof Model>(
    params: QueryParams,
    select: Record<SelectedFields, true>,
  ): Promise<AxiosResponse<
    ApiResponseData<Pick<Model, SelectedFields>>
  > | null> {
    try {
      return await this.findOne(params, select);
    } catch (error) {
      if (error instanceof RestfulRequestNotFoundError) {
        return null;
      }
      throw error;
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
      .post<ApiResponseData<{ _id: IDString }>>(
        `${this.urlPath}/any/create`,
        data,
      );
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
      .post<ApiResponseData<null>>(`${this.urlPath}/${id}/update`, data);
    return response;
  }

  public async removeOne(
    id: string,
  ): Promise<AxiosResponse<ApiResponseData<null>>> {
    const response = await this.httpRequestService
      .createAxios()
      .post<ApiResponseData<null>>(`${this.urlPath}/${id}/delete`);
    return response;
  }

  public async addToMany(
    id: string,
    data: AddToManyDto,
  ): Promise<AxiosResponse<ApiResponseData<null>>> {
    const response = await this.httpRequestService
      .createAxios()
      .post<ApiResponseData<null>>(`${this.urlPath}/${id}/add-to-many`, data);
    return response;
  }

  public async removeFromMany(
    id: string,
    data: AddToManyDto,
  ): Promise<AxiosResponse<ApiResponseData<null>>> {
    const response = await this.httpRequestService
      .createAxios()
      .post<ApiResponseData<null>>(
        `${this.urlPath}/${id}/remove-from-many`,
        data,
      );
    return response;
  }

  public async increase(
    id: string,
    data: IncreaseDto,
  ): Promise<AxiosResponse<ApiResponseData<null>>> {
    const response = await this.httpRequestService
      .createAxios()
      .post<ApiResponseData<null>>(`${this.urlPath}/${id}/increase`, data);
    return response;
  }
}
