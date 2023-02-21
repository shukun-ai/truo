import {
  TemplateBasicOutput,
  TemplateDependencies,
  TemplateEvaluateState,
  TemplateLiteral,
} from '../template-service.interface';

export class TemplateEvaluator {
  evaluate(
    templateLiteral: TemplateLiteral,
    imports: TemplateDependencies,
  ): TemplateBasicOutput {
    const set: unknown[] = [];
    templateLiteral.texts.forEach((text, index) => {
      if (index > 0) {
        const executedCode = this.executeCode(
          templateLiteral.codes[index - 1],
          imports[index - 1],
        );
        set.push(executedCode);
      }
      set.push(text);
    });

    return this.isRawDataType(templateLiteral.raw, set)
      ? this.getRawData(set)
      : set.join('');
  }

  private isRawDataType(raw: boolean, set: unknown[]) {
    return set.length === 3 && raw;
  }

  private getRawData(set: unknown[]): TemplateEvaluateState {
    return set[1] as TemplateEvaluateState;
  }

  private executeCode(
    code: TemplateLiteral['codes'][number],
    dependencies: TemplateDependencies[number],
  ): unknown {
    const run = new Function('$', '$$', this.wrapCode(code.code));
    const $ = dependencies.repositories ?? {};
    const $$ = dependencies.helpers ?? {};
    const value = run($, $$);
    return value;
  }

  private wrapCode(code: string) {
    return `return ${code};`;
  }
}
