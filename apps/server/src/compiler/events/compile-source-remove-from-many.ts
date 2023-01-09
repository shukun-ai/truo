import { FlowEventSourceRemoveFromMany } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileSourceRemoveFromManyEvent(
  event: FlowEventSourceRemoveFromMany,
): Promise<string> {
  return `
        async function main($, $$, $$$){
            const id = ${compileJsonTemplate(event.id)};
            const orgName = $.orgName;
            const atomName = "${event.atomName}";
            const dto = {
              electronName: ${compileJsonTemplate(event.electronName)},
              foreignId: ${compileJsonTemplate(event.foreignId)},
            };
            const output = await $$._sourceResolver.removeFromMany(id, orgName, atomName, dto);

            return {
              ...$,
              next: "${event.next}",
              input: output
            }
        };
        exports.default=main;
    `;
}
