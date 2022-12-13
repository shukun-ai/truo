import { FlowEventSourceCreate } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileSourceCreateEvent(
  event: FlowEventSourceCreate,
): Promise<string> {
  return `
        async function main($){
            const orgName = $.orgName;
            const atomName = "${event.atomName}";
            const dto = ${compileJsonTemplate(event.data)};
            const request = $.request;
            return await $.sourceResolver.create(orgName, atomName, dto, request);
        };
        exports.default=main;
    `;
}
