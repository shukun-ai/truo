import {
  ConnectorSchema,
  ConnectorTask,
  DataSourceEnvironments,
  IDString,
  TaskSchema,
} from '@shukun/schema';

export type HandlerContext = {
  input: unknown;
  next: string | undefined | null;
  index: number;
  env: DataSourceEnvironments;
  temps: Record<string, unknown>; // For storing temporary values
  params: Record<string, unknown>; // Fix value from http body
  orgName: string;
  operatorId: IDString | undefined;
  accessToken: string | undefined;
};

export type HandlerInjector = {
  connector: ConnectorSchema;
  taskDefinitions: Record<string, TaskSchema>;
  executeTask:
    | null
    | ((
        context: HandlerContext,
        injector: HandlerInjector,
      ) => Promise<HandlerContext>);
  executeSandbox: null | ((code: string, context: HandlerContext) => unknown);
  parseParameters: (
    parameters: unknown,
    context: HandlerContext,
    injector: HandlerInjector,
  ) => unknown;
  taskHandlers: Record<
    string,
    (
      task: ConnectorTask,
      context: HandlerContext,
      injector: HandlerInjector,
    ) => Promise<HandlerContext>
  >;
};

export type ParallelParameters = {
  branches: {
    start: string;
  }[];
};

export type RepeatParameters = {
  start: string;
  repeatCount: number;
};

export type ChoiceParameters = {
  conditions: {
    next: string;
    condition: unknown;
  }[];
};
