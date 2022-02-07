import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { IdentityModule } from '../identity/identity.module';
import { SourceModule } from '../source/source.module';
import { PassportModule } from '../util/passport/passport.module';

import { CodeResolverService } from './resolvers/code-resolver.service';
import { HttpResolverService } from './resolvers/http-resolver.service';
import { PassportResolverService } from './resolvers/passport-resolver.service';
import { SourceResolverService } from './resolvers/source-resolver.service';
import { WorkflowResolverService } from './resolvers/workflow-resolver.service';
import { ResourceService } from './resource.service';
import { WebhookLogService } from './webhook-log.service';

@Module({
  imports: [CoreModule, SourceModule, PassportModule, IdentityModule],
  providers: [
    WebhookLogService,
    ResourceService,
    SourceResolverService,
    HttpResolverService,
    WorkflowResolverService,
    PassportResolverService,
    CodeResolverService,
  ],
  exports: [WebhookLogService, ResourceService],
})
export class WebhookModule {}
