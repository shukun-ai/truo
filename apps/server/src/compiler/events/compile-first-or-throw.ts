import { FlowEventFirstOrThrow } from '@shukun/schema';

export async function compileFirstOrThrowEvent(
  event: FlowEventFirstOrThrow,
): Promise<string> {
  return `
      if (!Array.isArray($.input)) {
        throw new $$$.IsNotArrayException('The input is not a array.');
      }

      if ($.input.length === 0) {
        throw new $$$.IsEmptyArrayException('The input is a empty array.');
      }

      const output = $.input[0];

      return {
        ...$,
        next: "${event.next}",
        input: output
      }
    `;
}
