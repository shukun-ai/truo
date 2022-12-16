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
            const request = $.request;
            const output = await $.sourceResolver.create(orgName, atomName, dto, request);
            
            return {
              ...$,
              next: "${event.next}",
              input: output
            }
        };
        exports.default=main;
    `;
}
