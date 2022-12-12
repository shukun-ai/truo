import { Injectable } from '@nestjs/common';

import { ResolverContext } from './interface';

@Injectable()
export class VMService {
  async executeVM(
    compiledCode: string,
    input: unknown,
    context: ResolverContext,
  ): Promise<unknown> {
    // TODO implement this method.
    return 3;
  }
}
