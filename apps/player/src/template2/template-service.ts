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
    throw new Error('Method not implemented.');
  }
}
