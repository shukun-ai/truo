import { MiddlewareConsumer, Module } from '@nestjs/common';

import { CompilerModule } from '../compiler/compiler.module';

import { CoreModule } from '../core/core.module';
import { FlowModule } from '../flow/flow.module';
import { IdentityMiddleware } from '../identity/identity.middleware';
import { IdentityModule } from '../identity/identity.module';
import { MigrationModule } from '../migration/migration.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { SourceModule } from '../source/source.module';
import { SystemSourceModule } from '../system-source/system-source.module';
import { PassportModule } from '../util/passport/passport.module';
import { WebhookModule } from '../webhook/webhook.module';

import { AuthenticationController } from './authentication/authentication.controller';
import { AuthorizationController } from './authorization/authorization.controller';
import { AuthorizationService } from './authorization/authorization.service';
import { CodebaseController } from './codebase/codebase.controller';
import { DataSourceController } from './data-source/data-source.controller';
import { GrantListController } from './grant-list/grant-list.controller';
import { GrantRoleController } from './grant-role/grant-role.controller';
import { InspectionController } from './inspection/inspection.controller';
import { MigrationController } from './migration/migration.controller';
import { OrgController } from './org/org.controller';
import { RoleController } from './role/role.controller';
import { SeedController } from './seed/seed.controller';
import { SourceAccessControlService } from './source/source-access-control.service';
import { SourceOperationService } from './source/source-operation.service';
import { SourceQueryPermissionService } from './source/source-query-permission.service';
import { SourceController } from './source/source.controller';
import { ViewController } from './view/view.controller';
import { WebhookController } from './webhook/webhook.controller';

@Module({
  imports: [
    PassportModule,
    CoreModule,
    WebhookModule,
    IdentityModule,
    SourceModule,
    SystemSourceModule,
    FlowModule,
    CompilerModule,
    ScheduleModule,
    MigrationModule,
  ],
  controllers: [
    AuthenticationController,
    AuthorizationController,
    GrantListController,
    GrantRoleController,
    OrgController,
    WebhookController,
    ViewController,
    CodebaseController,
    DataSourceController,
    SourceController,
    SeedController,
    RoleController,
    InspectionController,
    MigrationController,
  ],
  providers: [
    SourceAccessControlService,
    SourceQueryPermissionService,
    SourceOperationService,
    AuthorizationService,
  ],
})
export class ApiModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdentityMiddleware).forRoutes('*');
  }
}
