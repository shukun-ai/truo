import { DataSourceSchema, RoleResourceType } from '@shukun/schema';

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
  public async updateCodebase(formData: FormData) {
    return await this.requestAdaptor.fetch<null>(
      'POST',
      this.buildUri('codebase'),
      {
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
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

  private buildUri(suffix: string) {
    return `${RoleResourceType.Developer}/:orgName/${suffix}`;
  }
}
