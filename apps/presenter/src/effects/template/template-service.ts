import { CodeExecutor } from './implements/code-executor';
import { TemplateEvaluator } from './implements/template-evaluator';
import { TemplateParser } from './implements/template-parser';

import {
  ITemplateService,
  TemplateBasicOutput,
  TemplateDependencies,
  TemplateLiteral,
} from './template-service.interface';

export class TemplateService implements ITemplateService {
  parse(template: string): TemplateLiteral {
    return new TemplateParser().parse(template);
  }

  evaluate(
    templateLiteral: TemplateLiteral,
    dependencies: TemplateDependencies,
  ): TemplateBasicOutput {
    return new TemplateEvaluator().evaluate(templateLiteral, dependencies);
  }

  executeCode(code: string, dependencies: TemplateDependencies): unknown {
    return new CodeExecutor().run(code, dependencies);
  }
}
