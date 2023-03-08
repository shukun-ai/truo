import { TypeException } from '@shukun/exception';
import { PlayerEvent, PlayerEventSetRepository } from '@shukun/schema';
import { BehaviorSubject } from 'rxjs';

import { IRepositoryManager } from '../repository/repository-manager.interface';

import { IEventQueue } from './event-queue.interface';

export class EventQueue implements IEventQueue {
  private queue = new BehaviorSubject<{
    containerId: string;
    event: PlayerEvent;
    payload: unknown;
  } | null>(null);

  constructor(private readonly repositoryManager: IRepositoryManager) {
    this.subscribeQueue();
  }

  emit(containerId: string, event: PlayerEvent, payload: unknown) {
    this.queue.next({ containerId, event, payload });
  }

  private subscribeQueue() {
    this.queue.subscribe(this.handleEvent.bind(this));
  }

  private handleEvent(
    params: {
      containerId: string;
      event: PlayerEvent;
      payload: unknown;
    } | null,
  ): void {
    if (!params) {
      return;
    }

    switch (params.event.action) {
      case 'setRepository':
        return this.handleSetRepository(
          params.containerId,
          params.event,
          params.payload,
        );
    }

    throw new TypeException(
      'We did not support this event action: {{action}}',
      {
        action: params.event.action,
      },
    );
  }

  private handleSetRepository(
    containerId: string,
    event: PlayerEventSetRepository,
    payload: unknown,
  ) {
    const { target, path } = event;
    this.repositoryManager.setValue(
      { scope: 'container', containerId, repositoryId: target },
      path,
      payload,
    );
  }
}
