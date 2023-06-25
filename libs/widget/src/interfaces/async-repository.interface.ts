import { Observable } from 'rxjs';

export type AsyncState = {
  loading: boolean;
  errorMessage: string | null;
  data: Record<string, unknown>;
};

export interface IAsyncRepository {
  destroy(): void;
  getValue(): AsyncState;
  resetValue(): void;
  query(): Observable<AsyncState>;
  run(): void;
}
