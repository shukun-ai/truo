export interface ITemplateService {
  run(
    template: unknown,
    states: TemplateEvaluateStates,
    helpers: TemplateEvaluateHelpers,
  ): TemplateBasicOutput;
}

export type TemplateEvaluateStates = {
  [keyName: string]: TemplateEvaluateState;
};

export type TemplateEvaluateHelpers = {
  [keyName: string]: TemplateEvaluateHelper;
};

export type TemplateEvaluateState = unknown;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TemplateEvaluateHelper = (...args: any) => any;

export type TemplateBasicOutput = unknown;
