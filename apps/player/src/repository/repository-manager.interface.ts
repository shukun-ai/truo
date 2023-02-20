import { PlayerRepository } from '@shukun/schema';
import { Observable } from 'rxjs';

export interface IRepositoryManager {
  register(repositorySchemas: Record<string, PlayerRepository>): void;
  getValues(repositoryNames: string[]): unknown[];
  setValue(
    repositoryName: string,
    path: (string | number)[],
    value: unknown,
  ): void;
  resetValue(repositoryName: string): void;
  combineQueries(repositoryNames: string[]): Observable<unknown>;
  trigger(repositoryName: string): void;
}
