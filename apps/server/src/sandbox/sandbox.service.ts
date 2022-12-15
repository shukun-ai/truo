import { Injectable } from '@nestjs/common';
import { NodeVM } from 'vm2';

import { IsEmptyArrayException } from '../exceptions/is-empty-array';

import { IsNotArrayException } from '../exceptions/is-not-array';

import { ResolverContext } from '../flow/flow.interface';

import { SourceResolverService } from './resolvers/source-resolver.service';

import { SandboxContext, SandboxVMResolver } from './sandbox.interface';

@Injectable()
export class SandboxService {
  constructor(private readonly sourceResolverService: SourceResolverService) {}

  async executeVM(
    compiledCode: string,
    context: ResolverContext,
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

  prepareVMContext(context: ResolverContext): SandboxContext {
    return context;
  }

  prepareVMResolver(): SandboxVMResolver {
    return {
      sourceResolver: this.sourceResolverService,
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
