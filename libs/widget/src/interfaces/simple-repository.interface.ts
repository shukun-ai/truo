import { PresenterEvent } from '@shukun/schema';
import { Observable } from 'rxjs';

import { EventHandlerContext } from './event-handler.interface';
import { IRepository } from './repository.interface';

export type SimpleState = unknown;

export interface ISimpleRepository extends IRepository {
  destroy(): void;
  setValue(event: PresenterEvent, context: EventHandlerContext): void;
  getValue(): unknown;
  resetValue(): void;
  query(): Observable<unknown>;
}
