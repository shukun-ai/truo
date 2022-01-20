import { Inject, Injectable } from '@nestjs/common';
import { RoleSchema } from '@shukun/schema';

import { OrgService } from './org.service';

@Injectable()
export class RoleService {
  @Inject() private readonly orgService: OrgService;

  async findAll(orgName: string): Promise<RoleSchema[]> {
    const application = await this.orgService.findCodebaseByOrgName(orgName);

    return application?.roles || [];
  }
}
