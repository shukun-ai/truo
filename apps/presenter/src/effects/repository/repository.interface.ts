import { Observable } from 'rxjs';

export interface IRepository {
  destroy(): void;
  setValue(path: (string | number)[], value: unknown): void;
  getValue(): unknown;
  resetValue(): void;
  query(): Observable<unknown>;
  trigger(payload: unknown): void;
}
