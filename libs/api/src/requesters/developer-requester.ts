import {
  DataSourceSchema,
  RoleResourceType,
  MigrationDifference,
  PresenterSchema,
  IDString,
} from '@shukun/schema';

import { IRequestAdaptor } from '../request-adaptor/request-adaptor.interface';
import { ApiResponse } from '../request-adaptor/request-adaptor.type';

export class DeveloperRequester {
  constructor(private readonly requestAdaptor: IRequestAdaptor) {}

  /**
   * @remarks
   * POST /apis/v1/developer/{orgName}/codebase
   *
   * @example
   * const formData = new FormData();
   * formData.append('file', acceptedFiles[0]);
   * updateCodebase(formData);
   */
  public async updateCodebase(
    formData: FormData,
    headers?: Record<string, string>,
  ) {
    return await this.requestAdaptor.fetch<null>(
      'POST',
      this.buildUri('codebase'),
      {
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          ...headers,
        },
      },
    );
  }

  /**
   * @remarks
   * POST /apis/v1/developer/{orgName}/presenters-code
   *
   * @example
   * const formData = new FormData();
   * formData.append('file', acceptedFiles[0]);
   * updatePresentersCode(formData);
   */
  public async updatePresentersCode(
    formData: FormData,
    headers?: Record<string, string>,
  ) {
    return await this.requestAdaptor.fetch<null>(
      'POST',
      this.buildUri('presenters-code'),
      {
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          ...headers,
        },
      },
    );
  }

  /**
   * @remarks
   * POST /apis/v1/developer/{orgName}/data-source
   */
  public async updateDataSource(dataSource: DataSourceSchema) {
    return await this.requestAdaptor.fetch<ApiResponse<null>>(
      'POST',
      this.buildUri('data-source'),
      {
        body: dataSource,
      },
    );
  }

  /**
   * @remarks
   * POST /apis/v1/developer/{orgName}/migration/preview
   */
  public async previewMigration() {
    return await this.requestAdaptor.fetch<ApiResponse<MigrationDifference>>(
      'POST',
      this.buildUri('migration/preview'),
    );
  }

  /**
   * @remarks
   * POST /apis/v1/developer/{orgName}/migration/execute
   */
  public async executeMigration() {
    return await this.requestAdaptor.fetch<ApiResponse<null>>(
      'POST',
      this.buildUri('migration/execute'),
    );
  }

  /**
   * @remarks
   * POST /apis/v1/editor/{orgName}/presenters/:presenterId/query
   */
  public async getPresenter(presenterName: string) {
    return await this.requestAdaptor.fetch<PresenterSchema>(
      'POST',
      this.buildUri(`presenters/${presenterName}/query`),
    );
  }

  /**
   * @remarks
   * POST /apis/v1/editor/{orgName}/presenters/any/query
   */
  public async getPresenters() {
    return await this.requestAdaptor.fetch<Record<string, PresenterSchema>>(
      'POST',
      this.buildUri(`presenters/any/query`),
    );
  }

  /**
   * @remarks
   * POST /apis/v1/editor/{orgName}/presenters/:presenterId
   */
  public async createPresenter(presenterName: string) {
    return await this.requestAdaptor.fetch<{ _id: IDString }>(
      'POST',
      this.buildUri(`presenters/any/create`),
      {
        body: { presenterName },
      },
    );
  }

  /**
   * @remarks
   * POST /apis/v1/editor/{orgName}/presenters/:presenterId
   */
  public async updatePresenter(
    presenterName: string,
    definition: PresenterSchema,
  ) {
    return await this.requestAdaptor.fetch<PresenterSchema>(
      'POST',
      this.buildUri(`presenters/${presenterName}/update`),
      {
        body: {
          definition,
        },
      },
    );
  }

  /**
   * @remarks
   * POST /apis/v1/editor/{orgName}/presenters/:presenterId
   */
  public async deletePresenter(presenterName: string) {
    return await this.requestAdaptor.fetch<PresenterSchema>(
      'POST',
      this.buildUri(`presenters/${presenterName}/delete`),
    );
  }

  private buildUri(suffix: string) {
    return `${RoleResourceType.Developer}/:orgName/${suffix}`;
  }
}
