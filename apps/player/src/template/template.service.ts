import { TemplateEvaluator } from './template-evaluator';
import { Literal } from './template-literal.interface';
import { TemplateParser } from './template-parser';
import { TemplateSandbox } from './template-sandbox';
import { ITemplateService } from './template.interface';

export class TemplateService implements ITemplateService {
  parse(template: string): Literal {
    return new TemplateParser().parse(template);
  }

  evaluate(literal: Literal, executedCodes: unknown[]): unknown {
    return new TemplateEvaluator().evaluate(literal, executedCodes);
  }

  execute(code: Literal['codes'][number], imports: unknown[]): unknown {
    return new TemplateSandbox().execute(code, imports);
  }
}
