export interface ITemplateService {
  parse(template: string): TemplateLiteral;
  evaluate(
    templateLiteral: TemplateLiteral,
    dependencies: TemplateDependencies,
  ): TemplateBasicOutput;
  executeCode(code: string, dependency: TemplateDependencies[number]): unknown;
}

export type TemplateLiteral = {
  raw: boolean;
  texts: string[];
  codes: {
    code: string;
    repositories: string[];
    helpers: string[];
  }[];
};

export type TemplateDependencies = {
  repositories?: { [keyName: string]: TemplateEvaluateState };
  helpers?: { [keyName: string]: TemplateEvaluateMethod };
}[];

export type TemplateEvaluateState = unknown;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TemplateEvaluateMethod = (...args: any) => any;

export type TemplateBasicOutput = unknown;
