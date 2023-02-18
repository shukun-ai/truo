import { Literal } from './template-literal.interface';

export interface ITemplateService {
  parse(template: string): Literal;
  evaluate(literal: Literal, executedCodes: unknown[]): unknown;
  execute(code: Literal['codes'][number], imports: unknown[]): unknown;
}
