import { Injectable } from '@nestjs/common';

import { IsEmptyArrayException } from '@shukun/exception';

import { IsNotArrayException } from '@shukun/exception';
import { NodeVM } from 'vm2';

import { DateResolverService } from './resolvers/date-resolver.service';

import { SourceResolverService } from './resolvers/source-resolver.service';

import { SandboxContext, SandboxVMResolver } from './sandbox.interface';

@Injectable()
export class SandboxService {
  constructor(
    private readonly sourceResolverService: SourceResolverService,
    private readonly dateResolverService: DateResolverService,
  ) {}

  async executeVM(
    compiledCode: string,
    context: SandboxContext,
  ): Promise<SandboxContext> {
    const vm = new NodeVM();
    const exports = vm.run(compiledCode);
    const $ = this.prepareVMContext(context);
    const $$ = this.prepareVMResolver();
    const $$$ = this.prepareVMException();

    try {
      const computedContext: SandboxContext = await exports.default($, $$, $$$);
      return this.serialize(computedContext);
    } catch (error) {
      throw this.catchError(error);
    }
  }
  protected serialize(context: SandboxContext): SandboxContext {
    return JSON.parse(JSON.stringify(context));
  }

  protected prepareVMContext(context: SandboxContext): SandboxContext {
    return context;
  }

  protected prepareVMResolver(): SandboxVMResolver {
    return {
      sourceResolver: this.sourceResolverService,
      date: this.dateResolverService,
    };
  }

  protected prepareVMException() {
    return {
      IsNotArrayException: IsNotArrayException,
      IsEmptyArrayException: IsEmptyArrayException,
    };
  }

  protected catchError(error: unknown) {
    return error;
  }
}
