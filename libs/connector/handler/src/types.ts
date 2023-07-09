import {
  ConnectorSchema,
  DataSourceEnvironments,
  IDString,
} from '@shukun/schema';

export type HandlerContext = {
  input: unknown;
  next: string | undefined | null;
  index: number;
  env: DataSourceEnvironments;
  store: Record<string, unknown>;
  orgName: string;
  operatorId: IDString | undefined;
  connector: ConnectorSchema;
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
