import { Observable } from 'rxjs';

import { IRepository } from './repository.interface';

export interface IRouterRepository extends IRepository {
  query(): Observable<RouterRepositoryStates>;
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
};
