export interface ITemplateService {
  parse(template: string): TemplateLiteral;
  evaluate(
    templateLiteral: TemplateLiteral,
    imports: TemplateDependencies,
  ): TemplateBasicOutput;
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

export type TemplateEvaluateState =
  | string
  | number
  | boolean
  | undefined
  | null
  | object
  | Array<unknown>;

export type TemplateEvaluateMethod = (...args: any) => any;

export type TemplateBasicOutput =
  | string
  | number
  | boolean
  | undefined
  | null
  | object
  | Array<unknown>;
