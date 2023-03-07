import { TypeException } from '@shukun/exception';
import { combineLatest, map, Observable } from 'rxjs';

import { IRepositoryManager } from './repository-manager.interface';
import { IRepository } from './repository.interface';

export class RepositoryManager implements IRepositoryManager {
  private repositories: Map<string, IRepository> = new Map();

  public add(repositoryName: string, repository: IRepository) {
    if (this.repositories.has(repositoryName)) {
      throw new TypeException(
        'The repository is registered: {{repositoryName}}',
        { repositoryName },
      );
    }
    this.repositories.set(repositoryName, repository);
  }

  public remove(repositoryName: string) {
    this.repositories.delete(repositoryName);
  }

  public has(repositoryName: string): boolean {
    return this.repositories.has(repositoryName);
  }

  public get(repositoryName: string): IRepository {
    const repository = this.repositories.get(repositoryName);
    if (!repository) {
      throw new TypeException('Did not defined repository');
    }
    return repository;
  }

  public getValues(repositoryNames: string[]): Record<string, unknown> {
    const values: Record<string, unknown> = {};

    for (const name of repositoryNames) {
      const repository = this.repositories.get(name);
      values[name] = repository ? repository.getValue() : {};
    }

    return values;
  }

  public setValue(
    repositoryName: string,
    path: (string | number)[],
    value: unknown,
  ): void {
    this.repositories.get(repositoryName)?.setValue(path, value);
  }

  public resetValue(repositoryName: string): void {
    this.repositories.get(repositoryName)?.resetValue();
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

  public combineQueries(
    repositoryNames: string[],
  ): Observable<Record<string, unknown>> {
    repositoryNames = [...new Set(repositoryNames)];
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

  public trigger(repositoryName: string, payload: unknown): void {
    this.repositories.get(repositoryName)?.trigger(payload);
  }
}
