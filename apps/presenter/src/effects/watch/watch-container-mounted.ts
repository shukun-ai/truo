import { PresenterWatch } from '@shukun/schema';
import { IEventManager } from '@shukun/widget';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

export const createContainerMounted = (
  containerId: string,
  eventManager: IEventManager,
  watch: PresenterWatch,
): Subscription => {
  const subject = new BehaviorSubject<number>(0);
  const subscription = subject
    .pipe(
      tap(() => {
        eventManager.handleEvents(watch.events, {
          containerId,
          index: 0,
          item: {},
          payload: {},
        });
      }),
    )
    .subscribe();
  return subscription;
};
