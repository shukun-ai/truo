import { combineLatest, map, Observable } from 'rxjs';

import {
  IRepositoryManager,
  repositoryIdentifier,
} from './repository-manager.interface';
import { IRepository } from './repository.interface';

export class RepositoryManager implements IRepositoryManager {
  private repositories: Map<string, IRepository> = new Map();

  private getRepositoryKey(identifier: repositoryIdentifier) {
    const { scope, containerId, repositoryId } = identifier;
    const repositoryKey =
      scope === 'app'
        ? `_app:${repositoryId}`
        : `${containerId}:${repositoryId}`;
    return repositoryKey;
  }

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
    this.repositories
      .get(this.getRepositoryKey(identifier))
      ?.setValue(path, value);
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
    this.repositories.get(this.getRepositoryKey(identifier))?.trigger(payload);
  }
}
