import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { IdentityModule } from '../identity/identity.module';
import { SourceModule } from '../source/source.module';
import { PassportModule } from '../util/passport/passport.module';

import { CompiledCodeService } from './compiled-code.service';
import { DefinitionService } from './definition.service';
import { ExecutorService } from './executor.service';
import { NestedEventService } from './nested-event.service';
import { ResolverService } from './resolver.service';
import { VMService } from './vm.service';

@Module({
  imports: [CoreModule, SourceModule, PassportModule, IdentityModule],
  providers: [
    ExecutorService,
    DefinitionService,
    CompiledCodeService,
    NestedEventService,
    ResolverService,
    VMService,
  ],
  exports: [],
})
export class WebhookModule {}
