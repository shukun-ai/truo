import { TypeException } from '@shukun/exception';
import { PresenterEvent, PresenterWatch } from '@shukun/schema';
import { IEventManager } from '@shukun/widget';
import { Observable, Subscription, of, tap } from 'rxjs';

export const createStateChanged = (
  containerId: string,
  eventManager: IEventManager,
  watch: PresenterWatch,
): Subscription => {
  const { stateChanged } = watch.trigger;
  if (!stateChanged) {
    throw new TypeException('stateChanged is empty.');
  }

  const observable =
    stateChanged.length === 0
      ? createAutomaticallyWatch(containerId, eventManager, watch.events)
      : createExplicitWatch(containerId, eventManager, stateChanged);

  return observable
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

const createAutomaticallyWatch = (
  containerId: string,
  eventManager: IEventManager,
  events: PresenterEvent[],
): Observable<unknown> => {
  return createExplicitWatch(containerId, eventManager, []);
};

const createExplicitWatch = (
  containerId: string,
  eventManager: IEventManager,
  stateList: string[][],
): Observable<unknown> => {
  // TODO implement it
  return of();
};
