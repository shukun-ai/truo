import { ScheduleSchema } from '@shukun/schema';
import { CronJob } from 'cron';

export type OrgScheduleName = string;

export interface ScheduleContext {
  orgName: string;
  schedule: ScheduleSchema;
  job: CronJob;
}
