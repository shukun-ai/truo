import { RoleResourceType } from '@shukun/schema';

import { IRequestAdaptor } from '../request-adaptor/request-adaptor.interface';
import { SeedCreateDto } from '../request-adaptor/request-adaptor.type';

export class TenantRequester {
  constructor(private readonly requestAdaptor: IRequestAdaptor) {}

  /**
   * @remarks
   * POST /apis/v1/tenant/any/seeds
   */
  public async createOrg(body: SeedCreateDto) {
    return await this.requestAdaptor.fetch<null>(
      'POST',
      this.buildUri('seeds'),
      { body },
    );
  }

  public async destroyOrg(orgName: string) {
    return await this.requestAdaptor.fetch<null>(
      'POST',
      this.buildUri('seeds/destroy'),
      { body: { orgName } },
    );
  }

  private buildUri(suffix: string) {
    return `${RoleResourceType.Tenant}/any/${suffix}`;
  }
}
