import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { OrgService } from '../core/org.service';

import { ScheduleOrgOperatorService } from './schedule-org-operator.service';

import { ScheduleRegisterService } from './schedule-register.service';

@Injectable()
export class ScheduleBootstrapService implements OnApplicationBootstrap {
  constructor(
    private readonly orgService: OrgService,
    private readonly scheduleRegisterService: ScheduleRegisterService,
    private readonly scheduleOrgOperatorService: ScheduleOrgOperatorService,
  ) {}

  async onApplicationBootstrap() {
    this.scheduleRegisterService.clearAll();
    await this.registerAll();
    this.scheduleRegisterService.startAll();
  }

  async registerAll() {
    const orgs = await this.orgService.findAll({ filter: {} });

    for (const org of orgs) {
      const schedules = await this.scheduleOrgOperatorService.findOrgSchedules(
        org.name,
      );
      for (const schedule of schedules) {
        this.scheduleRegisterService.register(org.name, schedule);
      }
    }
  }
}
