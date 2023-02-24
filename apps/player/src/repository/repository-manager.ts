import { TypeException } from '@shukun/exception';
import { PlayerRepository } from '@shukun/schema';
import { combineLatest, map, Observable } from 'rxjs';

import { SimpleRepository } from './repositories/simple-repository';

import { IRepositoryManager } from './repository-manager.interface';
import { IRepository } from './repository.interface';

export class RepositoryManager implements IRepositoryManager {
  private repositories: Map<string, IRepository> = new Map();

  constructor() {
    // this.repositories.set(
    //   CURRENT_USER_REPOSITORY_KEY,
    //   new CurrentUserRepository(),
    // );
  }

  public register(repositorySchemas: Record<string, PlayerRepository>): void {
    for (const [key, schema] of Object.entries(repositorySchemas)) {
      switch (schema.type) {
        case 'Simple':
          this.repositories.set(key, new SimpleRepository(schema));
          break;
      }
    }
  }

  public unregister(repositorySchemas: Record<string, PlayerRepository>): void {
    for (const name of Object.keys(repositorySchemas)) {
      this.repositories.get(name)?.destroy();
      this.repositories.delete(name);
    }
  }

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
