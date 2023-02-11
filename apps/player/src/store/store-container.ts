import { get } from 'lodash';
import { BehaviorSubject, map, distinctUntilChanged, Observable } from 'rxjs';

import { IStoreContainer } from '../interface/store-container.interface';
export class StoreContainer implements IStoreContainer {
  store = new BehaviorSubject<any>({});

  storeMap!: Record<string, Store>;

  register(storeName: string, store: Store) {
    this.storeMap[storeName] = store;
  }

  dispatch() {
    this.store.next({
      ...this.store.getValue(),
      customQuery: {
        title: 'hhhhhh',
      },
    });
  }

  createObservable(path: string): Observable<any> {
    return this.store.pipe(
      map((state) => {
        console.log('state', state);
        return get(state, path);
      }, distinctUntilChanged()),
    );
  }
}

export type Store = {
  [keyName: string]: {
    type: 'string';
    defaultValue: 'UI';
  };
};
