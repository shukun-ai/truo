import {
  ITemplateService,
  CODE_MODE_JS_PREFIX,
  TemplateBasicOutput,
  TemplateEvaluateHelpers,
  TemplateEvaluateStates,
} from '@shukun/widget';

export class TemplateService implements ITemplateService {
  run(
    template: unknown,
    states: TemplateEvaluateStates,
    helpers: TemplateEvaluateHelpers,
  ): TemplateBasicOutput {
    if (typeof template !== 'string') {
      return template;
    }

    if (!template.startsWith(CODE_MODE_JS_PREFIX)) {
      return template;
    }

    const code = template.slice(CODE_MODE_JS_PREFIX.length, template.length);

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
    const value = run($, $$, literal);
    return value;
  }
}
