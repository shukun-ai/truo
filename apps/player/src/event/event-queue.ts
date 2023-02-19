import { PlayerEvent } from '@shukun/schema';
import { BehaviorSubject } from 'rxjs';

import { RepositoryManager } from '../repository/repository-manager';

export class EventQueue {
  queue = new BehaviorSubject<PlayerEvent | null>(null);

  constructor(private readonly repositoryManager: RepositoryManager) {
    this.handleSetRepository();
  }

  emit(event: PlayerEvent) {
    this.queue.next(event);
  }

  handleSetRepository() {
    this.queue.subscribe((event) => {
      if (event?.action !== 'setRepository') {
        return;
      }
      const { target, path, value } = event;
      this.repositoryManager.set(target, path, value);
    });
  }
}
