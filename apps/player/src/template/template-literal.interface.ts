export interface ITemplateLiteral {
  parse(template: string): Literal;
  evaluate(literal: Literal, dependencies: Record<string, unknown>): unknown;
}

export type Literal = {
  texts: string[];
  codes: string[];
  dependencies: string[];
};
