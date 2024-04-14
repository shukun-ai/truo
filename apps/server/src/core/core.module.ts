import { Module } from '@nestjs/common';

import { CodebaseService } from './codebase.service';
import { ConnectorService } from './connector/connector.service';
import { ConnectorTaskService } from './connector/task.service';
import { EnvironmentDao } from './dao/environment.dao';
import { DataSourceService } from './data-source.service';
import { EnvironmentService } from './environment.service';

import { MetadataService } from './metadata.service';
import { MongoConnectionService } from './mongo-connection.service';
import { OrgService } from './org.service';
import { PresenterService } from './presenter.service';
import { RoleService } from './role.service';
import { ScheduleService } from './schedule.service';
import { SourceService } from './source/source.service';
import { ViewService } from './view.service';
import { WorkflowService } from './workflow.service';

@Module({
  providers: [
    MongoConnectionService,
    OrgService,
    MetadataService,
    ViewService,
    WorkflowService,
    RoleService,
    ScheduleService,
    EnvironmentService,
    DataSourceService,
    PresenterService,
    ConnectorService,
    ConnectorTaskService,
    SourceService,
    CodebaseService,
    EnvironmentDao,
  ],
  exports: [
    OrgService,
    MetadataService,
    ViewService,
    WorkflowService,
    RoleService,
    ScheduleService,
    EnvironmentService,
    DataSourceService,
    PresenterService,
    ConnectorService,
    ConnectorTaskService,
    SourceService,
    CodebaseService,
  ],
})
export class CoreModule {}
