import { Observable } from 'rxjs';

export interface IRepository {
  get(): Observable<unknown>;
  set(path: (string | number)[], value: unknown): void;
  reset(): void;
  destroy(): void;
  trigger(): void;
}
