import { PlayerRepository } from '@shukun/schema';
import { Observable } from 'rxjs';

import { IRepository } from './repository.interface';

export interface IRepositoryManager {
  register(repositorySchemas: Record<string, PlayerRepository>): void;
  unregister(repositorySchemas: Record<string, PlayerRepository>): void;
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
