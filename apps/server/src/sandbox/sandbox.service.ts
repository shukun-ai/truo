import { Injectable } from '@nestjs/common';

import { ResolverContext } from '../flow/interface';

@Injectable()
export class SandboxService {
  async executeVM(
    compiledCode: string,
    input: unknown,
    context: ResolverContext,
  ): Promise<unknown> {
    // TODO implement this method.
    return 3;
  }
}
