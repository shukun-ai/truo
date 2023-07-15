import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConnectorService } from './connector/connector.service';
import { ConnectorTaskService } from './connector/task.service';
import { DataSourceService } from './data-source.service';
import { EnvironmentService } from './environment.service';

import { FlowService } from './flow.service';

import { MetadataService } from './metadata.service';
import { OrgSchema, OrgDocumentName } from './org/org.schema';
import { OrgService } from './org.service';
import {
  PresenterDocumentName,
  PresenterSchema,
} from './presenter/presenter.schema';
import { PresenterService } from './presenter.service';
import { RoleService } from './role.service';
import { ScheduleService } from './schedule.service';
import { SourceService } from './source/source.service';
import { ViewService } from './view.service';
import { WorkflowService } from './workflow.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrgDocumentName, schema: OrgSchema },
      { name: PresenterDocumentName, schema: PresenterSchema },
    ]),
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
    PresenterService,
    ConnectorService,
    ConnectorTaskService,
    SourceService,
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
    PresenterService,
    ConnectorService,
    ConnectorTaskService,
    SourceService,
  ],
})
export class CoreModule {}
