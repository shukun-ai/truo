import { FlowEventRepeat } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileRepeatEvent(
  event: FlowEventRepeat,
): Promise<string> {
  return `
        async function main($, $$, $$$){
            const output = ${compileJsonTemplate(event.repeatCount)};

            return {
              ...$,
              next: "${event.next}",
              output
            }
        };
        exports.default=main;
    `;
}
