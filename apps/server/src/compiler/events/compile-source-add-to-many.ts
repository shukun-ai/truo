import { FlowEventSourceAddToMany } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileSourceAddToManyEvent(
  event: FlowEventSourceAddToMany,
): Promise<string> {
  return `
        async function main($){
            const id = ${compileJsonTemplate(event.id)};
            const orgName = $.orgName;
            const atomName = "${event.atomName}";
            const dto = {
              electronName: ${compileJsonTemplate(event.electronName)},
              foreignId: ${compileJsonTemplate(event.foreignId)},
            };

            return await $.sourceResolver.addToMany(id, orgName, atomName, dto);
        };
        exports.default=main;
    `;
}
