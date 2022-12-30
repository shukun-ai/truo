import { Injectable } from '@nestjs/common';
import { ScheduleSchema } from '@shukun/schema';

import { OrgService } from './org.service';

@Injectable()
export class ScheduleService {
  constructor(private readonly orgService: OrgService) {}

  async findAll(orgName: string): Promise<ScheduleSchema[]> {
    const application = await this.orgService.findCodebaseByOrgName(orgName);
    return application.schedules ?? [];
  }
}
