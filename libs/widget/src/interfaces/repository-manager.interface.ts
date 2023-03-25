import { IRepository, IRouterRepository } from '@shukun/widget';
import { Observable } from 'rxjs';

export interface IRepositoryManager {
  register(identifier: repositoryIdentifier, repository: IRepository): void;
  setValue(
    identifier: repositoryIdentifier,
    path: (string | number)[],
    value: unknown,
  ): void;
  queryAll(): Observable<Record<string, unknown>>;
  trigger(identifier: repositoryIdentifier, payload: unknown): void;

  registerRouterRepository(routerRepository: IRouterRepository): void;
  getRouterRepository(): IRouterRepository;
}

export type repositoryIdentifier = {
  scope: 'app' | 'container';
  containerId: string;
  repositoryId: string;
};
