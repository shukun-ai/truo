import { TypeException } from '@shukun/exception';
import {
  IAuthRepository,
  IRepository,
  IRouterRepository,
} from '@shukun/widget';
import { IRepositoryManager, repositoryIdentifier } from '@shukun/widget';
import { combineLatest, map, Observable } from 'rxjs';

import { SimpleRepository } from '../repositories/simple-repository';

export class RepositoryManager implements IRepositoryManager {
  private repositories: Map<string, IRepository> = new Map();

  public register(
    identifier: repositoryIdentifier,
    repository: IRepository,
  ): void {
    this.repositories.set(this.getRepositoryKey(identifier), repository);
  }

  public setValue(
    identifier: repositoryIdentifier,
    path: (string | number)[],
    value: unknown,
  ): void {
    const key = this.getRepositoryKey(identifier);
    const repository = this.repositories.get(key);
    if (!repository) {
      throw new TypeException('Did not find repository: {{key}}', { key });
    }
    if (repository instanceof SimpleRepository) {
      repository.setValue(path, value);
    } else {
      throw new TypeException(
        'The repository is not support setValue, repository type is: {{type}}',
        { type: repository.constructor.name },
      );
    }
  }

  public queryAll(): Observable<Record<string, unknown>> {
    const repositoryNames = [...this.repositories.keys()];
    const repositories: IRepository[] = [];

    repositoryNames.forEach((name) => {
      const repository = this.repositories.get(name);
      if (repository) {
        repositories.push(repository);
      }
    });

    const observables = repositories.map((repository) => repository.query());

    return combineLatest(observables).pipe(
      map((output) => {
        const values: Record<string, unknown> = {};
        repositoryNames.forEach((name, index) => {
          values[name] = output[index] ? output[index] : {};
        });
        return values;
      }),
    );
  }

  public trigger(identifier: repositoryIdentifier, payload: unknown): void {
    // TODO refactor
    // this.repositories.get(this.getRepositoryKey(identifier))?.trigger(payload);
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
