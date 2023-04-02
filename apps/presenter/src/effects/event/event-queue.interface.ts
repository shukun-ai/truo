import { PresenterEvent } from '@shukun/schema';

export interface IEventQueue {
  emit(containerId: string, event: PresenterEvent, payload: unknown): void;
}
