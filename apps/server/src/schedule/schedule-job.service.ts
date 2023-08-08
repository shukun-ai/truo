import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ScheduleSchema } from '@shukun/schema';
import { CronJob } from 'cron';

import { ScheduleLogService } from './schedule-log.service';

@Injectable()
export class ScheduleJobService {
  constructor(
    private readonly scheduleLogService: ScheduleLogService,
    private readonly configService: ConfigService,
  ) {}

  createJob(orgName: string, schedule: ScheduleSchema) {
    return new CronJob(
      schedule.cron,
      this.createJobOnTick(orgName, schedule),
      this.createJobOnComplete(orgName, schedule),
      false,
      schedule.timezone,
    );
  }

  startJob(job: CronJob): void {
    const disabledSchedule = this.configService.get('schedule.disabled');

    if (!disabledSchedule) {
      job.start();
    }
  }

  stopJob(job: CronJob): void {
    job.stop();
  }

  isRunning(job: CronJob): boolean {
    return job.running ?? false;
  }

  createJobOnTick(orgName: string, schedule: ScheduleSchema) {
    return async () => {
      try {
        // TODO remove flowService, please use connector instead.
        // Please check the removed code here from GIT.
      } catch (error) {
        this.scheduleLogService.logException(orgName, schedule, error);
      }
    };
  }

  createJobOnComplete(orgName: string, schedule: ScheduleSchema) {
    return async () => {
      this.scheduleLogService.logComplete(orgName, schedule);
    };
  }
}
