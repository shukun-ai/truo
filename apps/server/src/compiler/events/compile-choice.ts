import { FlowEventChoice } from '@shukun/schema';

import { compileJsonTemplate } from '../compiler-expression';

export async function compileChoiceEvent(
  event: FlowEventChoice,
): Promise<string> {
  return `
        async function main($, $$, $$$){
            let next = "${event.next}";

            const condition = [
              ${prepareConditions(event.conditions)}
            ].find(item => !!item.condition);

            if (condition) {
              next = condition.next;
            }

            const output = $.input;

            return {
              ...$,
              next,
              output
            }
        };
        exports.default=main;
    `;
}

function prepareConditions(conditions: FlowEventChoice['conditions']) {
  return conditions
    .map(
      (item) => `
      {
        next: "${item.next}", condition: ${compileJsonTemplate(item.condition)}
      }
    `,
    )
    .join(',');
}
