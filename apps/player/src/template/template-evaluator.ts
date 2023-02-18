import { Literal } from './template-literal.interface';

export class TemplateEvaluator {
  evaluate(literal: Literal, executedCodes: unknown[]): string {
    const set: unknown[] = [];
    literal.texts.forEach((text, index) => {
      if (index > 0) {
        set.push(executedCodes[index - 1]);
      }
      set.push(text);
    });
    return set.join('');
  }
}
