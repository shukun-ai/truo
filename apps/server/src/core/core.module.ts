import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DataSourceService } from './data-source.service';
import { EnvironmentService } from './environment.service';

import { FlowService } from './flow.service';

import { MetadataService } from './metadata.service';
import { OrgService } from './org.service';
import { OrgSchema, OrgDocumentName } from './org/org.schema';
import { PlayerService } from './player.service';
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
    EnvironmentService,
    DataSourceService,
    PlayerService,
  ],
  exports: [
    OrgService,
    MetadataService,
    ViewService,
    WorkflowService,
    RoleService,
    FlowService,
    ScheduleService,
    EnvironmentService,
    DataSourceService,
    PlayerService,
  ],
})
export class CoreModule {}
