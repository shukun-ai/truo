import { Injectable } from '@nestjs/common';
import { NodeVM } from 'vm2';

import { ResolverContext } from '../flow/flow.interface';

import { SourceResolverService } from './resolvers/source-resolver.service';

import { SandboxVMScope } from './sandbox.interface';

@Injectable()
export class SandboxService {
  constructor(private readonly sourceResolverService: SourceResolverService) {}

  async executeVM(
    compiledCode: string,
    input: unknown,
    context: ResolverContext,
  ): Promise<unknown> {
    const vm = new NodeVM();
    const exports = vm.run(compiledCode);
    const output = await exports.default(this.prepareVMScope(input, context));
    return output;
  }

  prepareVMScope(input: unknown, context: ResolverContext): SandboxVMScope {
    const vmScope: SandboxVMScope = {
      input,
      index: context.index,
      env: context.environment,
      math: Math,
      sourceResolver: this.sourceResolverService,
      orgName: context.orgName,
      operatorId: context.operatorId,
    };

    return vmScope;
  }
}
