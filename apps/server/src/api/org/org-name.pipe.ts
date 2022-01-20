import { Inject, Injectable, PipeTransform } from '@nestjs/common';

import { OrgService } from '../../core/org.service';

@Injectable()
export class OrgNamePipe implements PipeTransform {
  @Inject()
  private readonly orgService!: OrgService;

  async transform(orgName: string) {
    const orgId = await this.orgService.findOrgId(orgName);
    return orgId;
  }
}
