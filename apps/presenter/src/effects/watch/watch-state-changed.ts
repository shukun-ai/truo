import { TypeException } from '@shukun/exception';
import { PresenterEvent, PresenterWatch } from '@shukun/schema';
import { IEventManager, IStore } from '@shukun/widget';
import { Observable, Subscription, distinctUntilChanged, map, tap } from 'rxjs';

import { get } from '../store/store-utils';
import { getSyntheticState } from '../store/synthetic-state';

export const createStateChanged = (
  store: IStore,
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
      ? createAutomaticallyWatch(store, containerId, watch.events)
      : createExplicitWatch(store, containerId, stateChanged);

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
  store: IStore,
  containerId: string,
  events: PresenterEvent[],
): Observable<unknown> => {
  // TODO implement automatically watch.
  return createExplicitWatch(store, containerId, []);
};

const createExplicitWatch = (
  store: IStore,
  containerId: string,
  stateList: string[][],
): Observable<unknown> => {
  return store.queryAll().pipe(
    map((allState) => getSyntheticState(allState, containerId)),
    map((containerState) => {
      const watched = stateList.map((item) => {
        return get(containerState, item);
      });
      return generateDistinctValue(watched);
    }),
    distinctUntilChanged(),
  );
};

const generateDistinctValue = (value: unknown) => {
  return JSON.stringify(value);
};
