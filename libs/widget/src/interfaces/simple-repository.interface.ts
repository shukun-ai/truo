import { Observable } from 'rxjs';

export type SimpleState = unknown;

export interface ISimpleRepository {
  destroy(): void;
  setValue(path: string[], value: unknown): void;
  getValue(): unknown;
  resetValue(): void;
  query(): Observable<unknown>;
}
