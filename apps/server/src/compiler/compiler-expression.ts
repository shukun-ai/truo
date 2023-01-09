import { FlowBadCompileException } from '@shukun/exception';

export const LEFT_TAG = '<%%';

export const RIGHT_TAG = '%%>';

export function compileJsonTemplate(input: unknown): string {
  return replaceExpressionTag(stringify(compileJsonExpression(input)));
}

export function compileExpression(input: string): string {
  return `${LEFT_TAG}${checkInjection(input)}${RIGHT_TAG}`;
}

export function checkInjection(input: string): string {
  const regex = new RegExp(/\$\$\._[a-zA-Z0-9_-]*[.(;\s]/);

  if (regex.test(input)) {
    throw new FlowBadCompileException(
      'Do not allow to use private method in code, like: $$._',
    );
  }

  return input;
}

export function replaceExpressionTag(input: string): string {
  return input.replaceAll(`"${LEFT_TAG}`, '').replaceAll(`${RIGHT_TAG}"`, '');
}

export function compileJsonExpression(input: unknown): unknown {
  if (typeof input === 'string') {
    return compileExpression(input);
  }

  if (typeof input === 'object' && Array.isArray(input)) {
    return input.map((item) => compileJsonExpression(item));
  }

  if (typeof input === 'object' && input !== null) {
    const newInput: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(input)) {
      newInput[key] = compileJsonExpression(item);
    }
    return newInput;
  }

  return input;
}

export function stringify(input: unknown): string {
  return JSON.stringify(input);
}
