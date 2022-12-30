import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ScheduleSchema } from '@shukun/schema';
import { CronJob } from 'cron';

import { FlowService } from '../flow/flow.service';

import { ScheduleLogService } from './schedule-log.service';

@Injectable()
export class ScheduleJobService {
  constructor(
    private readonly flowService: FlowService,
    private readonly scheduleLogService: ScheduleLogService,
    private readonly configService: ConfigService,
  ) {}

  createJob(orgName: string, schedule: ScheduleSchema) {
    return new CronJob(
      schedule.cron,
      () => {
        this.jobOnTick(orgName, schedule);
      },
      () => {
        this.jobOnComplete(orgName, schedule);
      },
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

  protected async jobOnTick(orgName: string, schedule: ScheduleSchema) {
    try {
      const output = await this.flowService.execute(
        orgName,
        schedule.flow,
        schedule.input,
        {
          orgName,
          operatorId: undefined, // TODO set operatorId.
        },
      );

      this.scheduleLogService.logSuccess(orgName, schedule, output);
    } catch (error) {
      this.scheduleLogService.logException(orgName, schedule, error);
    }
  }

  protected jobOnComplete(orgName: string, schedule: ScheduleSchema) {
    this.scheduleLogService.logComplete(orgName, schedule);
  }
}
