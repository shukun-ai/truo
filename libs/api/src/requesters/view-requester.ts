import { RoleResourceType } from '@shukun/schema';

import { IRequestAdaptor } from '../request-adaptor/request-adaptor.interface';
import { ApiResponse } from '../request-adaptor/request-adaptor.type';

export class ViewRequester {
  constructor(private readonly requestAdaptor: IRequestAdaptor) {}

  /**
   * @remarks
   * GET /apis/v1/view/{orgName}/views
   */
  public async getViews() {
    return await this.requestAdaptor.fetch<ApiResponse<string[]>>(
      'GET',
      this.buildUri('views'),
    );
  }

  // TODO GET /apis/v1/view/{orgName}/views/{viewName}

  private buildUri(suffix: string) {
    return `${RoleResourceType.View}/:orgName/${suffix}`;
  }
}
