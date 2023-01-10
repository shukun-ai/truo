import { FlowEventLastOrThrow } from '@shukun/schema';

export async function compileLastOrThrowEvent(
  event: FlowEventLastOrThrow,
): Promise<string> {
  return `
      if (!Array.isArray($.input)) {
        throw new $$$.IsNotArrayException('The input is not a array.');
      }

      if ($.input.length === 0) {
        throw new $$$.IsEmptyArrayException('The input is a empty array.');
      }

      const output = $.input[$.input.length - 1];

      return {
        ...$,
        next: "${event.next}",
        input: output
      }
    `;
}
