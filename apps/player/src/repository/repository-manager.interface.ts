import { PlayerRepository } from '@shukun/schema';
import { Observable } from 'rxjs';

export interface IRepositoryManager {
  register(repositorySchemas: Record<string, PlayerRepository>): void;
  subscribe(repositories: string[]): Observable<unknown>;
  set(repository: string, path: (string | number)[], value: unknown): void;
  reset(repository: string): void;
  trigger(repository: string): void;
}
