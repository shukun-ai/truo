import { RoleResourceType } from '@shukun/schema';

import { IRequestAdaptor } from '../request-adaptor/request-adaptor.interface';
import { ApiResponse } from '../request-adaptor/request-adaptor.type';

export class ConnectorRequester {
  constructor(private readonly requestAdaptor: IRequestAdaptor) {}

  /**
   * @remarks
   * POST /apis/v1/connector/{orgName}/${connectorName}
   */
  public async runConnector<Model>(connectorName: string, input: unknown) {
    return await this.requestAdaptor.fetch<ApiResponse<Model>>(
      'POST',
      this.buildUri(connectorName),
      {
        body: input,
      },
    );
  }

  private buildUri(suffix: string, orgName?: string) {
    return `${RoleResourceType.Connector}/${orgName || ':orgName'}/${suffix}`;
  }
}
