import { PresenterWatch } from '@shukun/schema';
import { Subscription } from 'rxjs';

export interface IWatchManager {
  register(identifier: WatchIdentifier, watch: PresenterWatch): void;
  unregister(identifier: WatchIdentifier): void;
}

export type WatchIdentifier = {
  scope: 'app' | 'container';
  containerId: string;
  watchId: string;
};

export type WatchSubscriptions = {
  stateChanged?: Subscription;
  containerMounted?: Subscription;
  interval?: Subscription;
};
