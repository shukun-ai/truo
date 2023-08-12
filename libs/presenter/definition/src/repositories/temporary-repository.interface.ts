import { PresenterEvent } from '@shukun/schema';

export type TemporaryState = unknown;

export interface ITemporaryRepository {
  setValue(event: PresenterEvent, value: unknown): void;
}
