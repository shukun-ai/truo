import { PlayerRepository } from '@shukun/schema';
import { Observable } from 'rxjs';

export interface IRepositoryManager {
  initialize(): void;
  register(repositorySchemas: Record<string, PlayerRepository>): void;
  unregister(repositorySchemas: Record<string, PlayerRepository>): void;
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
  trigger(repositoryName: string): void;
}
