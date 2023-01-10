import { FlowEventSuccess } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileSuccessEvent(
  event: FlowEventSuccess,
): Promise<string> {
  return `
      const output = ${compileJsonTemplate(event.output)};
      return {
        ...$,
        input: output,
        next: ''
      };
    `;
}
