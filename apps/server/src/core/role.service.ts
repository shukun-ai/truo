import { Injectable } from '@nestjs/common';
import { RoleSchema } from '@shukun/schema';

import { CodebaseService } from './codebase.service';

@Injectable()
export class RoleService {
  constructor(private readonly codebaseService: CodebaseService) {}

  async findAll(orgName: string): Promise<RoleSchema[]> {
    const application = await this.codebaseService.findByOrgName(orgName);

    return application?.roles || [];
  }
}
