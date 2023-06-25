import { Observable } from 'rxjs';

export interface IStore<T> {
  update(callback: (previous: T) => T): void;
  getValue(): T;
  asObservable(): Observable<T>;
  reset(): void;
  unsubscribe(): void;
}
