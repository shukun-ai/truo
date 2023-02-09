import { RoleResourceType, ViewSchema } from '@shukun/schema';

import { IRequestAdaptor } from '../request-adaptor/request-adaptor.interface';

export class ViewRequester {
  constructor(private readonly requestAdaptor: IRequestAdaptor) {}

  /**
   * @remarks
   * GET /apis/v1/view/{orgName}/views
   */
  public async getViews() {
    return await this.requestAdaptor.fetch<ViewSchema[]>(
      'GET',
      this.buildUri('views'),
    );
  }

  // TODO GET /apis/v1/view/{orgName}/views/{viewName}

  private buildUri(suffix: string) {
    return `${RoleResourceType.View}/:orgName/${suffix}`;
  }
}
