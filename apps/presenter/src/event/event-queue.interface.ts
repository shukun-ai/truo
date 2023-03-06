import { PlayerEvent } from '@shukun/schema';

export interface IEventQueue {
  emit(event: PlayerEvent, payload: unknown): void;
}
