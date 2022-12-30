import { Injectable } from '@nestjs/common';
import { ScheduleSchema } from '@shukun/schema';

@Injectable()
export class ScheduleLogService {
  logSuccess(orgName: string, schedule: ScheduleSchema, result: unknown) {
    // eslint-disable-next-line no-console
    console.log('The job was run successfully', result, { orgName, schedule });
  }

  logException(orgName: string, schedule: ScheduleSchema, exception: unknown) {
    console.error({
      orgName,
      schedule,
      exception,
    });
  }

  logComplete(orgName: string, schedule: ScheduleSchema) {
    // eslint-disable-next-line no-console
    console.log('The job was completed', { orgName, schedule });
  }
}
