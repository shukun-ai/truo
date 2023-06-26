import { Observable } from 'rxjs';

import { IAuthRepository } from './auth-repository.interface';

import { IRepository } from './repository.interface';
import { IRouterRepository } from './router-repository.interface';

export interface IRepositoryManager {
  register(identifier: repositoryIdentifier, repository: IRepository): void;
  queryAll(): Observable<Record<string, unknown>>;
  getValue(): Record<string, unknown>;

  get(identifier: repositoryIdentifier): IRepository;

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
