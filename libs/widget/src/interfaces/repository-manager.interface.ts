import { Observable } from 'rxjs';

import { IAuthRepository } from './auth-repository.interface';

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

  registerAuthRepository(authRepository: IAuthRepository): void;
  getAuthRepository(): IAuthRepository;
}

export type repositoryIdentifier = {
  scope: 'app' | 'container';
  containerId: string;
  repositoryId: string;
};
