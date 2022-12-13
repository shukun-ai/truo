import { FlowEventFail } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileFailEvent(event: FlowEventFail): Promise<string> {
  return `
        async function main($){
            const output = ${compileJsonTemplate(event.output)};
            return output;
        };
        exports.default=main;
    `;
}
