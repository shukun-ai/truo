import { ConfigService } from '@nestjs/config';
import { TypeException } from '@shukun/exception';
import { ScheduleSchema } from '@shukun/schema';
import { CronJob } from 'cron';

import { mockEmptyDependencies } from '../util/unit-testing/unit-testing.helper';

import { ScheduleJobService } from './schedule-job.service';
import { ScheduleLogService } from './schedule-log.service';

import { ScheduleRegisterService } from './schedule-register.service';

describe('ScheduleRegisterService', () => {
  let scheduleRegisterService: ScheduleRegisterService;
  let scheduleJobService: ScheduleJobService;
  let scheduleLogService: ScheduleLogService;
  let configService: ConfigService;

  const orgName = 'org';
  const schedule: ScheduleSchema = {
    name: 'test',
    flow: 'test',
    cron: 'mock',
    timezone: 'mock',
    active: true,
  };

  beforeAll(() => {
    configService = new ConfigService({
      schedule: { disabled: false },
    });
    scheduleLogService = new ScheduleLogService();
    scheduleJobService = new ScheduleJobService(
      mockEmptyDependencies(),
      scheduleLogService,
      configService,
    );
    scheduleRegisterService = new ScheduleRegisterService(scheduleJobService);

    jest.spyOn(scheduleJobService, 'createJob').mockImplementation(() => {
      const job = new CronJob(
        '* * * * * *',
        () => {
          /** no value */
        },
        null,
        false,
      );
      return job;
    });

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

  it('register', () => {
    scheduleRegisterService.register(orgName, schedule);

    expect(
      scheduleRegisterService.scheduleContexts.get('org->test')?.schedule,
    ).toEqual(schedule);
  });

  it('startAll', () => {
    scheduleRegisterService.startAll();

    expect(
      scheduleRegisterService.scheduleContexts.get('org->test')?.job.running,
    ).toEqual(true);
  });

  it('stopAll', () => {
    scheduleRegisterService.stopAll();

    expect(
      scheduleRegisterService.scheduleContexts.get('org->test')?.job.running,
    ).toEqual(false);
  });

  it('start', () => {
    scheduleRegisterService.start(orgName, schedule);

    expect(
      scheduleRegisterService.scheduleContexts.get('org->test')?.job.running,
    ).toEqual(true);
  });

  it('unregister a wrong name', () => {
    scheduleRegisterService.unregister('mock', schedule);

    expect(scheduleRegisterService.scheduleContexts.size).toEqual(1);
  });

  it('unregister', () => {
    scheduleRegisterService.unregister(orgName, schedule);

    expect(scheduleRegisterService.scheduleContexts.size).toEqual(0);
  });

  it('clearAll', () => {
    scheduleRegisterService.clearAll();

    expect(scheduleRegisterService.scheduleContexts.size).toEqual(0);
  });

  it('start a wrong name', () => {
    expect(() => scheduleRegisterService.start('mock', schedule)).toThrow(
      new TypeException('Did not find schedule: {{orgScheduleName}}', {
        orgScheduleName: 'mock',
      }),
    );
  });
});
