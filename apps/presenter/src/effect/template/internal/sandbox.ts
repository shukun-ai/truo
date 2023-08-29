import { TemplateHelpers } from '@shukun/presenter/definition';

export const runSandbox = (
  code: string,
  state: unknown,
  helpers: TemplateHelpers,
): unknown => {
  // eslint-disable-next-line no-new-func
  const run = new Function('$', '$$', 'literal', code);

  const literal = (texts: string[], ...expressions: string[]) => {
    return {
      texts,
      expressions,
    };
  };
  const $ = state;
  const $$ = helpers;

  try {
    const value = run($, $$, literal);
    return value;
  } catch (error) {
    console.error(error);
    return '';
  }
};
