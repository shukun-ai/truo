import { Injectable } from '@nestjs/common';
import { ApplicationSchema } from '@shukun/schema';

import { OrgService } from './org.service';

@Injectable()
export class CodebaseService {
  constructor(private readonly orgService: OrgService) {}

  async update(orgName: string, codebase: ApplicationSchema) {
    return await this.orgService.updateCodebase(orgName, codebase);
  }

  async findByOrgName(orgName: string): Promise<ApplicationSchema> {
    return await this.orgService.findCodebaseByOrgName(orgName);
  }
}
