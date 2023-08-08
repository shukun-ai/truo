import { ConfigService } from '@nestjs/config';
import { ScheduleSchema } from '@shukun/schema';
import { CronJob } from 'cron';

import { ScheduleJobService } from './schedule-job.service';
import { ScheduleLogService } from './schedule-log.service';

describe('', () => {
  let scheduleJobService: ScheduleJobService;
  let scheduleLogService: ScheduleLogService;
  let configService: ConfigService;

  let job: CronJob;

  const orgName = 'org';
  const schedule: ScheduleSchema = {
    name: 'test',
    cron: '* * * * *',
    timezone: 'Asia/Shanghai',
    active: true,
  };

  beforeAll(() => {
    configService = new ConfigService({
      schedule: { disabled: false },
    });
    scheduleLogService = new ScheduleLogService();
    scheduleJobService = new ScheduleJobService(
      scheduleLogService,
      configService,
    );
    scheduleJobService = new ScheduleJobService(
      scheduleLogService,
      configService,
    );

    jest.spyOn(scheduleLogService, 'logSuccess').mockImplementation(() => {
      /** */
    });
    jest.spyOn(scheduleLogService, 'logException').mockImplementation(() => {
      /** */
    });
    jest.spyOn(scheduleLogService, 'logComplete').mockImplementation(() => {
      /** */
    });
  });

  it('createJob', () => {
    job = scheduleJobService.createJob(orgName, schedule);
    expect(job.running).toEqual(undefined);
  });

  it('isRunning', () => {
    expect(scheduleJobService.isRunning(job)).toEqual(false);
    scheduleJobService.startJob(job);
    expect(scheduleJobService.isRunning(job)).toEqual(true);
    scheduleJobService.stopJob(job);
    expect(scheduleJobService.isRunning(job)).toEqual(false);
  });

  it('jobOnTick', () => {
    jest
      .spyOn(scheduleLogService, 'logSuccess')
      .mockImplementation((orgNameLog) => {
        expect(orgNameLog).toEqual(orgName);
      });

    const jobOnTick = scheduleJobService.createJobOnTick(orgName, schedule);
    jobOnTick();
  });

  it('jobOnTick with exception', () => {
    jest
      .spyOn(scheduleLogService, 'logException')
      .mockImplementation((orgNameLog) => {
        expect(orgNameLog).toEqual(orgName);
      });

    const jobOnTick = scheduleJobService.createJobOnTick(orgName, schedule);
    jobOnTick();
  });

  it('jobOnComplete', () => {
    jest
      .spyOn(scheduleLogService, 'logComplete')
      .mockImplementation((orgNameLog) => {
        expect(orgNameLog).toEqual(orgName);
      });

    const jobOnComplete = scheduleJobService.createJobOnComplete(
      orgName,
      schedule,
    );
    jobOnComplete();
  });
});
