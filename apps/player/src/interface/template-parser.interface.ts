export interface ITemplateParser {
  parse(template: string): TemplateLiteral;
  evaluate(templateLiteral: TemplateLiteral, variables: unknown[]): string;
}

export type TemplateLiteral = {
  literals: string[];
  variables: {
    name: string;
    pipes: { name: string; parameters: string[] }[];
  }[];
};
