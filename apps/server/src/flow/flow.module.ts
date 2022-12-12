import { Module } from '@nestjs/common';

import { SandboxModule } from '../sandbox/sandbox.module';

import { CompiledCodeService } from './compiled-code.service';
import { DefinitionService } from './definition.service';
import { FlowService } from './flow.service';
import { NestedEventService } from './nested-event.service';
import { ResolverService } from './resolver.service';

@Module({
  imports: [SandboxModule],
  providers: [
    FlowService,
    DefinitionService,
    CompiledCodeService,
    NestedEventService,
    ResolverService,
  ],
  exports: [FlowService],
})
export class FlowModule {}
