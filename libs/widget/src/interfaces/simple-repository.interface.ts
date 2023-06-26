import { PresenterEvent } from '@shukun/schema';
import { Observable } from 'rxjs';

import { IRepository } from './repository.interface';

export type SimpleState = unknown;

export interface ISimpleRepository extends IRepository {
  destroy(): void;
  setValue(event: PresenterEvent, value: unknown): void;
  getValue(): unknown;
  resetValue(): void;
  query(): Observable<unknown>;
}
