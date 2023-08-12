import { RouterRepositoryStates } from '../interfaces/router.interface';

export interface IRouterRepository {
  getValue(): RouterRepositoryStates;
  trigger(payload: {
    action?: 'push' | 'pop' | 'replace';
    page?: string;
    search?: Record<string, unknown>;
  }): void;
}
