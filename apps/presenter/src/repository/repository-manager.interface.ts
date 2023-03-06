import { Observable } from 'rxjs';

import { IRepository } from './repository.interface';

export interface IRepositoryManager {
  add(repositoryName: string, repository: IRepository): void;
  remove(repositoryName: string): void;
  get(repositoryName: string): IRepository;
  has(repositoryName: string): boolean;
  getValues(repositoryNames: string[]): Record<string, unknown>;
  setValue(
    repositoryName: string,
    path: (string | number)[],
    value: unknown,
  ): void;
  resetValue(repositoryName: string): void;
  combineQueries(
    repositoryNames: string[],
  ): Observable<Record<string, unknown>>;
  trigger(repositoryName: string, payload: unknown): void;
}
