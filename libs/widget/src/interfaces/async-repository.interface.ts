import { PresenterEvent } from '@shukun/schema';
import { Observable } from 'rxjs';

import { IRepository } from './repository.interface';

export type AsyncState = {
  loading: boolean;
  errorMessage: string | null;
  data: Record<string, unknown>;
};

export interface IAsyncRepository extends IRepository {
  destroy(): void;
  getValue(): AsyncState;
  resetValue(): void;
  query(): Observable<AsyncState>;
  run(event: PresenterEvent, payload: unknown): Promise<void>;
}
