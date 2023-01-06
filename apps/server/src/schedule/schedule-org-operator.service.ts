import { Injectable } from '@nestjs/common';
import { ScheduleSchema } from '@shukun/schema';

import { ScheduleService } from '../core/schedule.service';

import { ScheduleRegisterService } from './schedule-register.service';

@Injectable()
export class ScheduleOrgOperatorService {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly scheduleRegisterService: ScheduleRegisterService,
  ) {}

  async registerOrgSchedules(orgName: string) {
    const schedules = await this.findOrgSchedules(orgName);
    schedules.forEach((schedule) => {
      this.scheduleRegisterService.register(orgName, schedule);
    });
  }

  unregisterOrgSchedules(orgName: string) {
    this.scheduleRegisterService.scheduleContexts.forEach((context) => {
      if (context.orgName === orgName) {
        this.scheduleRegisterService.unregister(orgName, context.schedule);
      }
    });
  }

  startOrgSchedules(orgName: string) {
    this.scheduleRegisterService.scheduleContexts.forEach((context) => {
      if (context.orgName === orgName) {
        this.scheduleRegisterService.start(orgName, context.schedule);
      }
    });
  }

  async findOrgSchedules(orgName: string): Promise<ScheduleSchema[]> {
    const orgSchedules = await this.scheduleService.findAll(orgName);
    const activeSchedules = orgSchedules.filter((schedule) => schedule.active);
    return activeSchedules;
  }
}
