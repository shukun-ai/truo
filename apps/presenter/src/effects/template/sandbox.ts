import {
  TemplateBasicOutput,
  TemplateEvaluateHelpers,
  TemplateEvaluateStates,
} from '@shukun/presenter/definition';

export const runSandbox = (
  code: string,
  states: TemplateEvaluateStates,
  helpers: TemplateEvaluateHelpers,
): TemplateBasicOutput => {
  // eslint-disable-next-line no-new-func
  const run = new Function('$', '$$', 'literal', code);

  const literal = (texts: string[], ...expressions: string[]) => {
    return {
      texts,
      expressions,
    };
  };
  const $ = states;
  const $$ = helpers;

  try {
    const value = run($, $$, literal);
    return value;
  } catch (error) {
    console.error(error);
    return '';
  }
};
