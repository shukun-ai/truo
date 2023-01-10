import { FlowEventSourceUpdate } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileSourceUpdateEvent(
  event: FlowEventSourceUpdate,
): Promise<string> {
  return `
      const id = ${compileJsonTemplate(event.id)};
      const orgName = $.orgName;
      const atomName = "${event.atomName}";
      const dto = ${compileJsonTemplate(event.data)};
      const operatorId = $.operatorId;
      const output = await $$._sourceResolver.update(id, orgName, atomName, dto, operatorId);

      return {
        ...$,
        next: "${event.next}",
        input: output
      }
    `;
}
