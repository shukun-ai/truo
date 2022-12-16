import { Injectable } from '@nestjs/common';
import { NodeVM } from 'vm2';

import { IsEmptyArrayException } from '../exceptions/is-empty-array';

import { IsNotArrayException } from '../exceptions/is-not-array';

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
      const output: SandboxContext = await exports.default($, $$, $$$);
      return output;
    } catch (error) {
      throw this.catchError(error);
    }
  }

  prepareVMContext(context: SandboxContext): SandboxContext {
    return context;
  }

  prepareVMResolver(): SandboxVMResolver {
    return {
      sourceResolver: this.sourceResolverService,
      date: this.dateResolverService,
    };
  }

  prepareVMException() {
    return {
      IsNotArrayException: IsNotArrayException,
      IsEmptyArrayException: IsEmptyArrayException,
    };
  }

  catchError(error: unknown) {
    return error;
  }
}
