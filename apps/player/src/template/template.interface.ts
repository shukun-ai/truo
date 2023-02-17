import { Literal } from './template-literal.interface';

export interface ITemplateService {
  parse(template: string): Literal;
  evaluate(literal: Literal, dependencies: Record<string, unknown>): unknown;
}
