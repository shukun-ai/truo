import { Injectable } from '@nestjs/common';
import { ScheduleSchema } from '@shukun/schema';

import { TypeException } from '../exceptions/type-exception';

import { ScheduleJobService } from './schedule-job.service';

import { OrgScheduleName, ScheduleContext } from './schedule.interface';

@Injectable()
export class ScheduleRegisterService {
  scheduleContexts = new Map<OrgScheduleName, ScheduleContext>();

  constructor(private readonly scheduleJobService: ScheduleJobService) {}

  startAll() {
    this.scheduleContexts.forEach((scheduleContext) =>
      this.scheduleJobService.startJob(scheduleContext.job),
    );
  }

  stopAll() {
    this.scheduleContexts.forEach((scheduleContext) =>
      this.scheduleJobService.stopJob(scheduleContext.job),
    );
  }

  clearAll() {
    this.stopAll();
    this.scheduleContexts.clear();
  }

  start(orgName: string, schedule: ScheduleSchema): void {
    const orgScheduleName = this.buildOrgScheduleName(orgName, schedule.name);
    const context = this.scheduleContexts.get(orgScheduleName);

    if (!context) {
      throw new TypeException('Did not find schedule: {{orgScheduleName}}', {
        orgScheduleName,
      });
    }

    this.scheduleJobService.startJob(context.job);
  }

  register(orgName: string, schedule: ScheduleSchema): void {
    const orgScheduleName = this.buildOrgScheduleName(orgName, schedule.name);
    const job = this.scheduleJobService.createJob(orgName, schedule);

    const scheduleContext: ScheduleContext = {
      orgName,
      schedule,
      job,
    };

    this.scheduleContexts.set(orgScheduleName, scheduleContext);
  }

  unregister(orgName: string, schedule: ScheduleSchema): void {
    const orgScheduleName = this.buildOrgScheduleName(orgName, schedule.name);
    const context = this.scheduleContexts.get(orgScheduleName);

    if (!context) {
      return;
    }

    this.scheduleJobService.stopJob(context.job);
    this.scheduleContexts.delete(orgScheduleName);
  }

  protected buildOrgScheduleName(orgName: string, scheduleName: string) {
    return `${orgName}->${scheduleName}`;
  }
}
