import { FlowEventFail } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileFailEvent(event: FlowEventFail): Promise<string> {
  return `
        const output = ${compileJsonTemplate(event.output)};

        return {
            ...$,
            input: output
        }
    `;
}
