import { IRepository } from '../interfaces/repository.interface';
import { RouterRepositoryStates } from '../interfaces/router.interface';

export interface IRouterRepository extends IRepository {
  getValue(): RouterRepositoryStates;
  trigger(payload: {
    action?: 'push' | 'pop' | 'replace';
    page?: string;
    search?: Record<string, unknown>;
  }): void;
}
