import { FlowEventSourceCreate } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileSourceCreateEvent(
  event: FlowEventSourceCreate,
): Promise<string> {
  return `
        async function main($, $$, $$$){
            const orgName = $.orgName;
            const atomName = "${event.atomName}";
            const dto = ${compileJsonTemplate(event.data)};
            const operatorId = $.operatorId;
            const output = await $$._sourceResolver.create(orgName, atomName, dto, operatorId);
            
            return {
              ...$,
              next: "${event.next}",
              input: output
            }
        };
        exports.default=main;
    `;
}
