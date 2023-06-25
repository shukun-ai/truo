import { BehaviorSubject, Observable } from 'rxjs';

export type AsyncState = {
  loading: boolean;
  errorMessage: string | null;
  data: unknown;
};

export interface IAsyncRepository {
  readonly state: BehaviorSubject<AsyncState>;
  destroy(): void;
  getValue(): AsyncState;
  resetValue(): void;
  query(): Observable<AsyncState>;
  run(): void;
}
