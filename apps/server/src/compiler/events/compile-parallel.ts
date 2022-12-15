import { FlowEventParallel } from '@shukun/schema';

export async function compileParallelEvent(
  event: FlowEventParallel,
): Promise<string> {
  return `
        async function main($, $$, $$$){
            return {
              ...$,
              next: "${event.next}",
            };
        };
        exports.default=main;
    `;
}
