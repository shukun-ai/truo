import { Injectable } from '@nestjs/common';
import { ScheduleSchema } from '@shukun/schema';

import { CodebaseService } from './codebase.service';

@Injectable()
export class ScheduleService {
  constructor(private readonly codebaseService: CodebaseService) {}

  async findAll(orgName: string): Promise<ScheduleSchema[]> {
    const application = await this.codebaseService.findByOrgName(orgName);
    return application.schedules ?? [];
  }
}
