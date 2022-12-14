import { FlowEventRepeat } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileRepeatEvent(
  event: FlowEventRepeat,
): Promise<string> {
  return `
        async function main($){
            return ${compileJsonTemplate(event.repeatCount)};
        };
        exports.default=main;
    `;
}
