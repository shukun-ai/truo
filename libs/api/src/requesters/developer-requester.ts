import {
  DataSourceSchema,
  RoleResourceType,
  MigrationDifference,
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
   * POST /apis/v1/developer/{orgName}/players-code
   *
   * @example
   * const formData = new FormData();
   * formData.append('file', acceptedFiles[0]);
   * updatePlayersCode(formData);
   */
  public async updatePlayersCode(
    formData: FormData,
    headers?: Record<string, string>,
  ) {
    return await this.requestAdaptor.fetch<null>(
      'POST',
      this.buildUri('players-code'),
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

  private buildUri(suffix: string) {
    return `${RoleResourceType.Developer}/:orgName/${suffix}`;
  }
}
