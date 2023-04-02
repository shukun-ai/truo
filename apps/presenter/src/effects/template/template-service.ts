import {
  ITemplateService,
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

    // eslint-disable-next-line no-new-func
    const run = new Function(
      '$',
      '$$',
      'literal',
      'return literal`' + template + '`',
    );
    const literal = (texts: string[], ...expressions: string[]) => {
      return {
        texts,
        expressions,
      };
    };
    const $ = states;
    const $$ = helpers;
    const value = run($, $$, literal);
    return this.evaluate(value.texts, value.expressions);
  }

  private evaluate(texts: string[], expressions: unknown[]) {
    const isRaw =
      texts.length === 2 &&
      texts.every((item) => item.trim() === '') &&
      expressions.length === 1;

    if (isRaw) {
      return expressions[0];
    }

    const set: unknown[] = [];

    texts.forEach((text, index) => {
      if (index > 0) {
        set.push(expressions[index - 1]);
      }
      set.push(text);
    });

    return set.join('');
  }
}
