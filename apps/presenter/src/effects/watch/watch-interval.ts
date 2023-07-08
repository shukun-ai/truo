import { IEventManager } from '@shukun/presenter/definition';
import { PresenterWatch } from '@shukun/schema';
import { Subscription, interval, tap } from 'rxjs';

export const createInterval = (
  containerId: string,
  eventManager: IEventManager,
  watch: PresenterWatch,
): Subscription => {
  return interval(watch.triggers.interval)
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
};

export const removeInterval = (interval: Subscription): void => {
  interval.unsubscribe();
};
