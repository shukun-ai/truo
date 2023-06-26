import { PresenterEvent } from '@shukun/schema';
import { Observable } from 'rxjs';

import { EventHandlerContext } from './event-handler.interface';
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
  run(event: PresenterEvent, context: EventHandlerContext): Promise<void>;
}
