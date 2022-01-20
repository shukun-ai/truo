import { MiddlewareConsumer, Module } from '@nestjs/common';
import { IdentityMiddleware } from '../identity/identity.middleware';
import { IdentityModule } from '../identity/identity.module';
import { SourceModule } from '../source/source.module';
import { PassportModule } from '../util/passport/passport.module';
import { WebhookModule } from '../webhook/webhook.module';

import { CoreModule } from '../core/core.module';

import { AuthenticationController } from './authentication/authentication.controller';
import { AuthorizationController } from './authorization/authorization.controller';
// import { AuthorizationMiddleware } from './authorization/authorization.middleware';
import { AuthorizationService } from './authorization/authorization.service';
import { CodebaseController } from './codebase/codebase.controller';
import { GrantListController } from './grant-list/grant-list.controller';
import { GrantRoleController } from './grant-role/grant-role.controller';
import { OrgController } from './org/org.controller';
import { RoleController } from './role/role.controller';
import { SeedController } from './seed/seed.controller';
import { SourceAccessControlService } from './source/source-access-control.service';
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
    SourceController,
    SeedController,
    RoleController,
  ],
  providers: [SourceAccessControlService, AuthorizationService],
})
export class ApiModule {
  public configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthorizationMiddleware).forRoutes('*');
    consumer.apply(IdentityMiddleware).forRoutes('*');
  }
}
