import { Module } from '@nestjs/common';

import { CompilerModule } from '../compiler/compiler.module';
import { CoreModule } from '../core/core.module';

import { SandboxModule } from '../sandbox/sandbox.module';

import { CompiledCodeService } from './compiled-code.service';
import { DefinitionService } from './definition.service';
import { FlowService } from './flow.service';
import { ResolverService } from './resolver.service';

@Module({
  imports: [CoreModule, CompilerModule, SandboxModule],
  providers: [
    FlowService,
    DefinitionService,
    CompiledCodeService,
    ResolverService,
  ],
  exports: [FlowService],
})
export class FlowModule {}
