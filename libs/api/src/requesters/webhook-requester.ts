import { RoleResourceType } from '@shukun/schema';

import { IRequestAdaptor } from '../request-adaptor/request-adaptor.interface';
import { ApiResponse } from '../request-adaptor/request-adaptor.type';

export class WebhookRequester {
  constructor(private readonly requestAdaptor: IRequestAdaptor) {}

  /**
   * @deprecated
   * @remarks
   * POST /apis/v1/webhook/{orgName}/${workflowName}
   */
  public async runWorkflow<Model>(workflowName: string, input: unknown) {
    return await this.requestAdaptor.fetch<ApiResponse<Model>>(
      'POST',
      this.buildUri(workflowName),
      {
        body: input,
      },
    );
  }

  private buildUri(suffix: string, orgName?: string) {
    return `${RoleResourceType.Webhook}/${orgName || ':orgName'}/${suffix}`;
  }
}
