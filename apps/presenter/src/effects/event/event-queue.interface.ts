import { PlayerEvent } from '@shukun/schema';

export interface IEventQueue {
  emit(containerId: string, event: PlayerEvent, payload: unknown): void;
}
