import { FlowEventSourceUpdate } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileSourceUpdateEvent(
  event: FlowEventSourceUpdate,
): Promise<string> {
  return `
        async function main($, $$, $$$){
            const id = ${compileJsonTemplate(event.id)};
            const orgName = $.orgName;
            const atomName = "${event.atomName}";
            const dto = ${compileJsonTemplate(event.data)};
            const output = await $$._sourceResolver.update(id, orgName, atomName, dto);

            return {
              ...$,
              next: "${event.next}",
              input: output
            }
        };
        exports.default=main;
    `;
}
