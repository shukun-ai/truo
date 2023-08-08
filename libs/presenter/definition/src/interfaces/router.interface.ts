export interface IRouter {
  go(payload: { page?: string; search?: Record<string, unknown> }): void;
  back(): void;
}

// TODO rename to RouterStates
export type RouterRepositoryStates = {
  app: string;
  orgName: string;
  page: string;
  search: Record<string, unknown>;
  mode: RouterMode;
};

export enum RouterMode {
  Local = 'local',
  Editor = 'Editor',
  Server = 'server',
}
