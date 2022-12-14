import { Injectable } from '@nestjs/common';
import { NodeVM } from 'vm2';

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
    const output: SandboxContext = await exports.default($, $$);
    return output;
  }

  prepareVMContext(context: ResolverContext): SandboxContext {
    return context;
  }

  prepareVMResolver(): SandboxVMResolver {
    return {
      sourceResolver: this.sourceResolverService,
    };
  }
}
