import { PresenterWatch } from '@shukun/schema';
import { Subscription } from 'rxjs';

export interface IWatchManager {
  register(watchId: string, watch: PresenterWatch): void;
  unregister(watchId: string): void;
}

export type WatchSubscriptions = {
  stateChanged?: Subscription;
  containerMounted?: Subscription;
  interval?: Subscription;
};
