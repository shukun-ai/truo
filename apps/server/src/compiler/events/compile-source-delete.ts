import { FlowEventSourceDelete } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileSourceDeleteEvent(
  event: FlowEventSourceDelete,
): Promise<string> {
  return `
        async function main($, $$, $$$){
            const id = ${compileJsonTemplate(event.id)};
            const orgName = $.orgName;
            const atomName = "${event.atomName}";
            const output = await $.sourceResolver.delete(id, orgName, atomName);

            return {
              ...$,
              next: "${event.next}",
              output
            }
        };
        exports.default=main;
    `;
}
