import { Injectable } from '@nestjs/common';
import { FlowEvent, FlowEventCompiledCode } from '@shukun/schema';

import { BaseCompiler } from './compilers/base-compiler.interface';

import { SourceQueryCompilerService } from './compilers/source-query-compiler.service';
import { SuccessCompilerService } from './compilers/success-compiler.service';

@Injectable()
export class CompileFactoryService {
  compilers: Record<FlowEvent['type'], BaseCompiler> = {
    Success: this.successCompilerService,
    Fail: this.sourceQueryCompilerService,
    SourceQuery: this.sourceQueryCompilerService,
    SourceCreate: this.sourceQueryCompilerService,
    SourceUpdate: this.sourceQueryCompilerService,
    SourceDelete: this.sourceQueryCompilerService,
    SourceAddToMany: this.sourceQueryCompilerService,
    SourceRemoveFromMany: this.sourceQueryCompilerService,
    SourceIncrease: this.sourceQueryCompilerService,
    Choice: this.sourceQueryCompilerService,
    Repeat: this.sourceQueryCompilerService,
  };

  constructor(
    private readonly sourceQueryCompilerService: SourceQueryCompilerService,
    private readonly successCompilerService: SuccessCompilerService,
  ) {}

  async compileEvent(event: FlowEvent): Promise<FlowEventCompiledCode> {
    return await this.compilers[event.type].compile(event);
  }
}
