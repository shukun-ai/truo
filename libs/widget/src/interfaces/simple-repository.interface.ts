import { PresenterEvent } from '@shukun/schema';

import { IRepository } from './repository.interface';

export type SimpleState = unknown;

export interface ISimpleRepository extends IRepository {
  setValue(event: PresenterEvent, value: unknown): void;
}
