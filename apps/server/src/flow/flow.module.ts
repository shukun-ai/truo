import { Module } from '@nestjs/common';

import { CompilerModule } from '../compiler/compiler.module';

import { SandboxModule } from '../sandbox/sandbox.module';

import { CompiledCodeService } from './compiled-code.service';
import { DefinitionService } from './definition.service';
import { FlowService } from './flow.service';
import { ResolverService } from './resolver.service';

@Module({
  imports: [CompilerModule, SandboxModule],
  providers: [
    FlowService,
    DefinitionService,
    CompiledCodeService,
    ResolverService,
  ],
  exports: [FlowService],
})
export class FlowModule {}
