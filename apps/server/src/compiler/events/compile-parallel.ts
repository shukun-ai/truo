import { FlowEventParallel } from '@shukun/schema';

export async function compileParallelEvent(
  event: FlowEventParallel,
): Promise<string> {
  return `
      return {
        ...$,
        next: "${event.next}",
      };
    `;
}
