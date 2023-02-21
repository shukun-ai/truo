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
    imports: TemplateDependencies,
  ): TemplateBasicOutput {
    return new TemplateEvaluator().evaluate(templateLiteral, imports);
  }
}
