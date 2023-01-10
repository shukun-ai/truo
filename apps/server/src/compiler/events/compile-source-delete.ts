import { FlowEventSourceDelete } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileSourceDeleteEvent(
  event: FlowEventSourceDelete,
): Promise<string> {
  return `
      const id = ${compileJsonTemplate(event.id)};
      const orgName = $.orgName;
      const atomName = "${event.atomName}";
      const output = await $$._sourceResolver.delete(id, orgName, atomName);

      return {
        ...$,
        next: "${event.next}",
        input: output
      }
    `;
}
