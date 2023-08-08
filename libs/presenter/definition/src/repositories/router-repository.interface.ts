import { IRepository } from '../interfaces/repository.interface';

export interface IRouterRepository extends IRepository {
  getValue(): RouterRepositoryStates;
  trigger(payload: {
    action?: 'push' | 'pop' | 'replace';
    page?: string;
    search?: Record<string, unknown>;
  }): void;
}

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
