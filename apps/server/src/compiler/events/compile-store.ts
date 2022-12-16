import { FlowEventStore } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileStoreEvent(
  event: FlowEventStore,
): Promise<string> {
  return `
        async function main($, $$, $$$){
            const key = "${event.key}";
            const value = ${compileJsonTemplate(event.value)};

            return {
              ...$,
              store: {
                ...$.store,
                [key]: value,
              },
              output: $.input,
              next: "${event.next}"
            }
        };
        exports.default=main;
    `;
}
