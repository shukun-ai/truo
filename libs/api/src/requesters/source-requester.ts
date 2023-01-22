import { TypeException } from '@shukun/exception';
import {
  HttpQuerySchema,
  IDString,
  MetadataSchema,
  RoleResourceType,
} from '@shukun/schema';

import { firstOrNull } from '../helpers/source-helper';
import { IRequestAdaptor } from '../request-adaptor/request-adaptor.interface';
import {
  AddToManyDto,
  IncreaseDto,
  RemoveFromManyDto,
  CreateResponseData,
} from '../request-adaptor/request-adaptor.type';

import { ApiResponse } from '../request-adaptor/request-adaptor.type';

export class SourceRequester<Model> {
  constructor(
    private readonly requestAdaptor: IRequestAdaptor,
    private readonly atomName: string,
  ) {}

  public async metadata(): Promise<ApiResponse<MetadataSchema>> {
    return await this.post('metadata');
  }

  public async query(params: HttpQuerySchema): Promise<ApiResponse<Model[]>> {
    return await this.post('query', params);
  }

  /**
   * @alias query
   * @deprecated
   */
  public async findMany(params: HttpQuerySchema) {
    return this.query(params);
  }

  /**
   * @deprecated
   */
  public async findOne(params: HttpQuerySchema): Promise<ApiResponse<Model>> {
    return this.findOneOrThrow(params);
  }

  public async findIdOrThrow(id: IDString): Promise<ApiResponse<Model>> {
    return this.findOneOrThrow({ filter: { _id: id } });
  }

  public async findOneOrThrow(
    params: HttpQuerySchema,
  ): Promise<ApiResponse<Model>> {
    const response = await this.query({ ...params, limit: 1 });
    const value = firstOrNull(response.data.value);

    if (!value) {
      throw new TypeException('We can not find it: {{json}}.', {
        json: JSON.stringify(params),
      });
    }

    return {
      data: {
        value,
      },
    };
  }

  public async findOneOrNull(
    params: HttpQuerySchema,
  ): Promise<ApiResponse<Model | null>> {
    const response = await this.query({ ...params, limit: 1 });
    const value = firstOrNull(response.data.value);

    return {
      data: {
        value,
      },
    };
  }

  public async create(model: Model): Promise<ApiResponse<CreateResponseData>> {
    return await this.post('create', model);
  }

  /**
   * @deprecated
   * @alias create
   */
  public async createOne(
    model: Model,
  ): Promise<ApiResponse<CreateResponseData>> {
    return this.create(model);
  }

  public async update(
    id: IDString,
    model: Partial<Model>,
  ): Promise<ApiResponse<null>> {
    return await this.post('update', model, id);
  }

  /**
   * @deprecated
   * @alias update
   */
  public async updateOne(
    id: IDString,
    model: Partial<Model>,
  ): Promise<ApiResponse<null>> {
    return this.update(id, model);
  }

  public async delete(id: IDString): Promise<ApiResponse<null>> {
    return await this.post('delete', undefined, id);
  }

  /**
   * @deprecated
   * @alias delete
   */
  public async deleteOne(id: IDString): Promise<ApiResponse<null>> {
    return this.delete(id);
  }

  public async addToMany(
    id: IDString,
    body: AddToManyDto,
  ): Promise<ApiResponse<null>> {
    return await this.post('add-to-many', body, id);
  }

  public async removeFromMany(
    id: IDString,
    body: RemoveFromManyDto,
  ): Promise<ApiResponse<null>> {
    return await this.post('remove-from-many', body, id);
  }

  public async increase(
    id: IDString,
    body: IncreaseDto,
  ): Promise<ApiResponse<null>> {
    return await this.post('increase', body, id);
  }

  private async post<T>(
    action: string,
    body?: unknown,
    id?: IDString,
  ): Promise<ApiResponse<T>> {
    return await this.requestAdaptor.fetch<T>(
      'POST',
      this.buildUri(action, id),
      {
        body,
      },
    );
  }

  private buildUri(action: string, id?: IDString) {
    const idString = id ? id : 'any';
    return `${RoleResourceType.Source}/:orgName/${this.atomName}/${idString}/${action}`;
  }
}
