import { Literal } from './template-literal.interface';
import { TemplateParser } from './template-parser';
import { ITemplateService } from './template.interface';

export class TemplateService implements ITemplateService {
  parse(template: string): Literal {
    return new TemplateParser().parse(template);
  }

  evaluate(literal: Literal, dependencies: Record<string, unknown>): unknown {
    throw new Error('Method not implemented.');
  }
}
