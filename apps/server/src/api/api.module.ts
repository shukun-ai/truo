import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ConnectorHandlerModule } from '@shukun/connector/handler';

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

import { ConnectorController } from './connector/connector.controller';
import { DeveloperCodebaseController } from './developer/developer-codebase.controller';
import { DeveloperConnectorController } from './developer/developer-connector.controller';
import { DeveloperDataSourceController } from './developer/developer-data-source.controller';
import { DeveloperInspectionController } from './developer/developer-inspection.controller';
import { DeveloperMigrationController } from './developer/developer-migration.controller';
import { DeveloperPresenterCodeController } from './developer/developer-presenter-code.controller';
import { DeveloperPresenterController } from './developer/developer-presenter.controller';
import { DeveloperTaskController } from './developer/developer-task.controller';
import { AuthenticationController } from './public/authentication/authentication.controller';
import { AuthorizationController } from './public/authorization/authorization.controller';
import { AuthorizationService } from './public/authorization/authorization.service';
import { GrantListController } from './public/grant-list/grant-list.controller';
import { GrantRoleController } from './public/grant-role/grant-role.controller';
import { OrgController } from './public/org/org.controller';
import { PresenterController } from './public/presenter/presenter.controller';
import { RoleController } from './public/role/role.controller';
import { SourceAccessControlService } from './source/source-access-control.service';
import { SourceOperationService } from './source/source-operation.service';
import { SourceQueryPermissionService } from './source/source-query-permission.service';
import { SourceController } from './source/source.controller';
import { SeedController } from './tenant/seed/seed.controller';
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
    ConnectorHandlerModule,
  ],
  controllers: [
    AuthenticationController,
    AuthorizationController,
    GrantListController,
    GrantRoleController,
    OrgController,
    WebhookController,
    ViewController,
    SourceController,
    SeedController,
    RoleController,
    PresenterController,
    ConnectorController,
    DeveloperCodebaseController,
    DeveloperDataSourceController,
    DeveloperInspectionController,
    DeveloperMigrationController,
    DeveloperPresenterCodeController,
    DeveloperPresenterController,
    DeveloperConnectorController,
    DeveloperTaskController,
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
