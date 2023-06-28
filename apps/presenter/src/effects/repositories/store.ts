import { BehaviorSubject, Observable } from 'rxjs';

/**
 * deprecated
 */
export class Store<T> {
  private readonly store: BehaviorSubject<T>;

  private readonly initialValue: T;

  constructor(initialValue: T) {
    this.store = new BehaviorSubject<T>(initialValue);
    this.initialValue = initialValue;
  }

  update(callback: (previous: T) => T): void {
    const previous = this.store.getValue();
    const next = callback(previous);
    this.store.next(next);
  }

  getValue(): T {
    return this.store.getValue();
  }

  asObservable(): Observable<T> {
    return this.store.asObservable();
  }

  unsubscribe(): void {
    this.store.unsubscribe();
  }

  reset(): void {
    this.store.next(this.initialValue);
  }
}
