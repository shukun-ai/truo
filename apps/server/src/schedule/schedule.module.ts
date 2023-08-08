import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';

import { ScheduleBootstrapService } from './schedule-bootstrap.service';
import { ScheduleJobService } from './schedule-job.service';
import { ScheduleLogService } from './schedule-log.service';
import { ScheduleOrgOperatorService } from './schedule-org-operator.service';

import { ScheduleRegisterService } from './schedule-register.service';

@Module({
  imports: [CoreModule],
  providers: [
    ScheduleJobService,
    ScheduleRegisterService,
    ScheduleOrgOperatorService,
    ScheduleBootstrapService,
    ScheduleLogService,
  ],
  exports: [ScheduleOrgOperatorService],
})
export class ScheduleModule {}
