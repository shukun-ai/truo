import { FlowEventSourceQuery } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileSourceQueryEvent(
  event: FlowEventSourceQuery,
): Promise<string> {
  return `
        async function main($){
            const orgName = $.orgName;
            const atomName = "${event.atomName}";
            const query = ${compileJsonTemplate(event.query)};
            return await $.sourceResolver.query($.orgName, atomName, query);
        };
        exports.default=main;
    `;
}
