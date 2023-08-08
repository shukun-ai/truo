import { PresenterEvent } from '@shukun/schema';

import { IRepository } from '../interfaces/repository.interface';

export type TemporaryState = unknown;

export interface ITemporaryRepository extends IRepository {
  setValue(event: PresenterEvent, value: unknown): void;
}
