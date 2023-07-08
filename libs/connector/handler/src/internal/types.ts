import {
  ConnectorSchema,
  DataSourceEnvironments,
  IDString,
  TaskSchema,
} from '@shukun/schema';

export interface HandlerContext {
  input: unknown;
  next: string | undefined | null;
  index: number;
  env: DataSourceEnvironments;
  store: Record<string, unknown>;
  orgName: string;
  operatorId: IDString | undefined;
  taskDefinitions: Record<string, TaskSchema>;
  connector: ConnectorSchema;
}
