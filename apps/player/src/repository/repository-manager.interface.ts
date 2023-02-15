import { Observable } from 'rxjs';

export interface IRepositoryManager {
  subscribe<T>(repositories: string[]): Observable<T>;
  set(repository: string, path: string, value: unknown): void;
  reset(repository: string): void;
  trigger(repository: string): void;
}
