import { Module } from '@nestjs/common';

import { SandboxModule } from '../sandbox/sandbox.module';

import { CompileFactoryService } from './compile-factory.service';
import { CompilerHelperService } from './compiler-helper.service';
import { CompilerService } from './compiler.service';
import { SourceQueryCompilerService } from './compilers/source-query-compiler.service';
import { SuccessCompilerService } from './compilers/success-compiler.service';
import { NestedEventService } from './nested-event.service';

@Module({
  imports: [SandboxModule],
  providers: [
    CompilerService,
    NestedEventService,
    CompileFactoryService,
    CompilerHelperService,
    SuccessCompilerService,
    SourceQueryCompilerService,
  ],
  exports: [CompilerService, NestedEventService],
})
export class CompilerModule {}
