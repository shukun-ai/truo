import { Observable } from 'rxjs';

import { IRepository } from './repository.interface';
import { IRouterRepository } from './router-repository.interface';

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
