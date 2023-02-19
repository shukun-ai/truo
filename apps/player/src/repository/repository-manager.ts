import { PlayerRepository } from '@shukun/schema';
import { combineLatest, debounceTime, Observable } from 'rxjs';

import { SimpleRepository } from './repositories/simple-repository';

import { IRepositoryManager } from './repository-manager.interface';
import { IRepository } from './repository.interface';

export class RepositoryManager implements IRepositoryManager {
  customRepositories: Map<string, IRepository> = new Map();

  register(repositorySchemas: Record<string, PlayerRepository>): void {
    for (const [key, schema] of Object.entries(repositorySchemas)) {
      switch (schema.type) {
        case 'Simple':
          this.customRepositories.set(key, new SimpleRepository(schema));
          break;
      }
    }
  }

  unregister(): void {
    this.customRepositories.forEach((repository) => repository.destroy());
    this.customRepositories.clear();
  }

  getValues(customRepositories: string[]): unknown[] {
    return customRepositories.reduce((values, name) => {
      const repository = this.customRepositories.get(name);
      return repository ? [...values, repository.getValue()] : values;
    }, [] as unknown[]);
  }

  subscribe(customRepositories: string[]): Observable<unknown> {
    const childObservables = customRepositories.reduce((observables, name) => {
      const repository = this.customRepositories.get(name);
      return repository ? [...observables, repository.get()] : observables;
    }, [] as Observable<unknown>[]);
    return combineLatest(childObservables);
  }

  set(repository: string, path: (string | number)[], value: unknown): void {
    this.customRepositories.get(repository)?.set(path, value);
  }

  reset(repository: string): void {
    this.customRepositories.get(repository)?.reset();
  }

  trigger(repository: string): void {
    this.customRepositories.get(repository)?.trigger();
  }
}
