import { TypeException } from '@shukun/exception';
import {
  IAuthRepository,
  IRepository,
  IRouterRepository,
} from '@shukun/presenter/definition';
import {
  IRepositoryManager,
  repositoryIdentifier,
} from '@shukun/presenter/definition';

export class RepositoryManager implements IRepositoryManager {
  private repositories: Map<string, IRepository> = new Map();

  register(identifier: repositoryIdentifier, repository: IRepository): void {
    this.repositories.set(this.getRepositoryKey(identifier), repository);
  }

  get(identifier: repositoryIdentifier): IRepository {
    const key = this.getRepositoryKey(identifier);
    const repository = this.repositories.get(key);
    if (!repository) {
      throw new TypeException('Did not find repository: {{key}}', { key });
    }
    return repository;
  }

  public registerRouterRepository(routerRepository: IRouterRepository): void {
    this.register(
      { scope: 'app', containerId: 'app', repositoryId: 'router' },
      routerRepository,
    );
  }

  public getRouterRepository(): IRouterRepository {
    const repository = this.repositories.get(
      this.getRepositoryKey({
        scope: 'app',
        containerId: 'app',
        repositoryId: 'router',
      }),
    );

    if (!repository) {
      throw new TypeException('The router repository did not registered.');
    }

    return repository as IRouterRepository;
  }

  registerAuthRepository(authRepository: IAuthRepository): void {
    this.register(
      { scope: 'app', containerId: 'app', repositoryId: 'auth' },
      authRepository,
    );
  }

  getAuthRepository(): IAuthRepository {
    const repository = this.repositories.get(
      this.getRepositoryKey({
        scope: 'app',
        containerId: 'app',
        repositoryId: 'auth',
      }),
    );

    if (!repository) {
      throw new TypeException('The auth repository did not registered.');
    }

    return repository as IAuthRepository;
  }

  private getRepositoryKey(identifier: repositoryIdentifier) {
    const { scope, containerId, repositoryId } = identifier;
    switch (scope) {
      case 'app':
        return `_app:${repositoryId}`;
      case 'container':
        return `container:${containerId}:${repositoryId}`;
    }
  }
}
