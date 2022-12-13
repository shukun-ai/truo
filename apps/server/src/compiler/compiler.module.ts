import { Module } from '@nestjs/common';

import { SandboxModule } from '../sandbox/sandbox.module';

import { CompileFactoryService } from './compile-factory.service';
import { CompilerService } from './compiler.service';
import { NestedEventService } from './nested-event.service';

@Module({
  imports: [SandboxModule],
  providers: [CompilerService, NestedEventService, CompileFactoryService],
  exports: [CompilerService, NestedEventService],
})
export class CompilerModule {}
