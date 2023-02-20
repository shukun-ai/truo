import { PlayerRepository } from '@shukun/schema';
import { combineLatest, Observable } from 'rxjs';

import { SimpleRepository } from './repositories/simple-repository';

import { IRepositoryManager } from './repository-manager.interface';
import { IRepository } from './repository.interface';

export class RepositoryManager implements IRepositoryManager {
  private repositories: Map<string, IRepository> = new Map();

  public register(repositorySchemas: Record<string, PlayerRepository>): void {
    for (const [key, schema] of Object.entries(repositorySchemas)) {
      switch (schema.type) {
        case 'Simple':
          this.repositories.set(key, new SimpleRepository(schema));
          break;
      }
    }
  }

  public unregister(): void {
    this.repositories.forEach((repository) => repository.destroy());
    this.repositories.clear();
  }

  public getValues(repositoryNames: string[]): unknown[] {
    return repositoryNames.reduce((values, name) => {
      const repository = this.repositories.get(name);
      return repository ? [...values, repository.getValue()] : values;
    }, [] as unknown[]);
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

  public combineQueries(repositoryNames: string[]): Observable<unknown> {
    const childObservables = repositoryNames.reduce((observables, name) => {
      const repository = this.repositories.get(name);
      return repository ? [...observables, repository.query()] : observables;
    }, [] as Observable<unknown>[]);
    return combineLatest(childObservables);
  }

  public trigger(repositoryName: string): void {
    this.repositories.get(repositoryName)?.trigger();
  }
}
