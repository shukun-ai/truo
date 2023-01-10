import { FlowEventSourceQuery } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileSourceQueryEvent(
  event: FlowEventSourceQuery,
): Promise<string> {
  return `
      const orgName = $.orgName;
      const atomName = "${event.atomName}";
      const query = ${compileJsonTemplate(event.query)};
      const output = await $$._sourceResolver.query($.orgName, atomName, query);

      return {
        ...$,
        next: "${event.next}",
        input: output
      }
    `;
}
