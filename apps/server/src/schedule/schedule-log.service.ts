import { Injectable } from '@nestjs/common';
import { ScheduleSchema } from '@shukun/schema';

@Injectable()
export class ScheduleLogService {
  logSuccess(orgName: string, schedule: ScheduleSchema, result: unknown) {
    const now = new Date();
    // eslint-disable-next-line no-console
    console.log('The job was run successfully', result, {
      orgName,
      schedule,
      now,
    });
  }

  logException(orgName: string, schedule: ScheduleSchema, exception: unknown) {
    const now = new Date();

    console.error({
      orgName,
      schedule,
      exception,
      now,
    });
  }

  logComplete(orgName: string, schedule: ScheduleSchema) {
    const now = new Date();
    // eslint-disable-next-line no-console
    console.log('The job was completed', { orgName, schedule, now });
  }
}
