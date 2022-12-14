import { FlowEventSourceIncrease } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileSourceIncreaseEvent(
  event: FlowEventSourceIncrease,
): Promise<string> {
  return `
        async function main($, $$){
            const id = ${compileJsonTemplate(event.id)};
            const orgName = $.orgName;
            const atomName = "${event.atomName}";
            const dto = {
              electronName: ${compileJsonTemplate(event.electronName)},
              increment: ${compileJsonTemplate(event.increment)},
            };
            const output = await $.sourceResolver.increase(id, orgName, atomName, dto);

            return {
              ...$,
              next: "${event.next}",
              output
            }
        };
        exports.default=main;
    `;
}
