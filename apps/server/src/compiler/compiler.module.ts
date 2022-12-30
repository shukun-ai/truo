import { Module } from '@nestjs/common';

import { SandboxModule } from '../sandbox/sandbox.module';

import { CompileFactoryService } from './compile-factory.service';
import { CompilerService } from './compiler.service';

@Module({
  imports: [SandboxModule],
  providers: [CompilerService, CompileFactoryService],
  exports: [CompilerService],
})
export class CompilerModule {}
