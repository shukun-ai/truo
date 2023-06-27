import { PresenterWatch } from '@shukun/schema';
import {
  IEventManager,
  IWatchManager,
  WatchIdentifier,
  WatchSubscriptions,
} from '@shukun/widget';

import { createContainerMounted } from './watch-container-mounted';
import { createInterval } from './watch-interval';

export class WatchManager implements IWatchManager {
  private watches: Map<string, WatchSubscriptions> = new Map();

  constructor(private readonly eventManager: IEventManager) {}

  register(identifier: WatchIdentifier, watch: PresenterWatch): void {
    const subscriptions: WatchSubscriptions = {};

    if (watch.trigger.containerMounted === true) {
      subscriptions.containerMounted = createContainerMounted(
        identifier.containerId,
        this.eventManager,
        watch,
      );
    }

    if (typeof watch.trigger.interval === 'number') {
      subscriptions.interval = createInterval(
        identifier.containerId,
        this.eventManager,
        watch,
      );
    }

    this.watches.set(this.getWatchKey(identifier), subscriptions);
  }

  unregister(identifier: WatchIdentifier): void {
    const subscriptions = this.watches.get(this.getWatchKey(identifier));
    subscriptions?.containerMounted?.unsubscribe();
    subscriptions?.interval?.unsubscribe();
    this.watches.delete(this.getWatchKey(identifier));
  }

  private getWatchKey(identifier: WatchIdentifier) {
    const { scope, containerId, watchId } = identifier;
    switch (scope) {
      case 'app':
        return `_app:${watchId}`;
      case 'container':
        return `container:${containerId}:${watchId}`;
    }
  }
}
