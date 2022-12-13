import { FlowEventSourceDelete } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileSourceDeleteEvent(
  event: FlowEventSourceDelete,
): Promise<string> {
  return `
        async function main($){
            const id = ${compileJsonTemplate(event.id)};
            const orgName = $.orgName;
            const atomName = "${event.atomName}";
            return await $.sourceResolver.delete(id, orgName, atomName);
        };
        exports.default=main;
    `;
}
