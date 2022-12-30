import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FlowService } from './flow.service';

import { MetadataService } from './metadata.service';
import { OrgService } from './org.service';
import { OrgSchema, OrgDocumentName } from './org/org.schema';
import { RoleService } from './role.service';
import { ScheduleService } from './schedule.service';
import { ViewService } from './view.service';
import { WorkflowService } from './workflow.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrgDocumentName, schema: OrgSchema }]),
  ],
  providers: [
    OrgService,
    MetadataService,
    ViewService,
    WorkflowService,
    RoleService,
    FlowService,
    ScheduleService,
  ],
  exports: [
    OrgService,
    MetadataService,
    ViewService,
    WorkflowService,
    RoleService,
    FlowService,
    ScheduleService,
  ],
})
export class CoreModule {}
