import { ConfigService } from '@nestjs/config';
import { ScheduleSchema } from '@shukun/schema';
import { CronJob } from 'cron';

import { FlowService } from '../flow/flow.service';
import { mockEmptyDependencies } from '../util/unit-testing/unit-testing.helper';

import { ScheduleJobService } from './schedule-job.service';
import { ScheduleLogService } from './schedule-log.service';

describe('', () => {
  let scheduleJobService: ScheduleJobService;
  let scheduleLogService: ScheduleLogService;
  let configService: ConfigService;
  let flowService: FlowService;

  let job: CronJob;

  const orgName = 'org';
  const schedule: ScheduleSchema = {
    name: 'test',
    flow: 'test',
    cron: '* * * * *',
    timezone: 'Asia/Shanghai',
    active: true,
  };

  beforeAll(() => {
    flowService = new FlowService(
      mockEmptyDependencies(),
      mockEmptyDependencies(),
      mockEmptyDependencies(),
      mockEmptyDependencies(),
    );
    configService = new ConfigService({
      schedule: { disabled: false },
    });
    scheduleLogService = new ScheduleLogService();
    scheduleJobService = new ScheduleJobService(
      mockEmptyDependencies(),
      scheduleLogService,
      configService,
    );
    scheduleJobService = new ScheduleJobService(
      flowService,
      scheduleLogService,
      configService,
    );

    jest
      .spyOn(flowService, 'execute')
      .mockImplementation(async () => ({ value: true }));

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
    jest.spyOn(flowService, 'execute').mockImplementation(async () => {
      throw new Error();
    });

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
