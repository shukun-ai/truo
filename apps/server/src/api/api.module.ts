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
import { CodebaseController } from './developer/codebase/codebase.controller';
import { DataSourceController } from './developer/data-source/data-source.controller';
import { DeveloperConnectorController } from './developer/developer-connector.controller';
import { DeveloperPresenterController } from './developer/developer-presenter.controller';
import { InspectionController } from './developer/inspection/inspection.controller';
import { MigrationController } from './developer/migration/migration.controller';
import { PresenterCodeController } from './developer/presenter-code/presenter-code.controller';
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
    CodebaseController,
    DataSourceController,
    SourceController,
    SeedController,
    RoleController,
    InspectionController,
    MigrationController,
    PresenterController,
    PresenterCodeController,
    ConnectorController,
    DeveloperPresenterController,
    DeveloperConnectorController,
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
