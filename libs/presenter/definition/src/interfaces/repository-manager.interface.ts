import { IAuthRepository } from '../repositories/auth-repository.interface';

import { IRouterRepository } from '../repositories/router-repository.interface';

import { IRepository } from './repository.interface';

export interface IRepositoryManager {
  register(identifier: repositoryIdentifier, repository: IRepository): void;
  get(identifier: repositoryIdentifier): IRepository;

  /**
   * @deprecated
   */
  registerRouterRepository(routerRepository: IRouterRepository): void;
  /**
   * @deprecated
   */
  getRouterRepository(): IRouterRepository;

  /**
   * @deprecated
   */
  registerAuthRepository(authRepository: IAuthRepository): void;
  /**
   * @deprecated
   */
  getAuthRepository(): IAuthRepository;
}

export type repositoryIdentifier = {
  scope: 'app' | 'container';
  containerId: string;
  repositoryId: string;
};
