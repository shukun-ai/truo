import {
  ConnectorSchema,
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
  connector: ConnectorSchema;
  taskDefinitions: Record<string, TaskSchema>;
  executeTask?: null | ((context: HandlerContext) => Promise<HandlerContext>);
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
