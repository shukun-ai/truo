import { IStore, StoreScope } from '@shukun/widget';
import produce from 'immer';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { send } from '../../observable/devtool';

import { get, set } from './store-utils';

export class Store implements IStore {
  store = new BehaviorSubject<Record<string, unknown>>({});

  constructor() {
    this.store.pipe(
      tap((state) => {
        send({ action: 'store changed', state });
      }),
    );
  }

  update<SelectedState>(
    scope: StoreScope,
    path: string[],
    callback: (previous: SelectedState) => SelectedState,
  ): void {
    const state = this.store.getValue();
    const selectedState = get(state, scope, path);
    const newSelectedState = callback(selectedState);
    const newState = produce(state, (draft) => {
      set(draft, scope, path, newSelectedState);
    });
    this.store.next(newState);
  }

  remove(scope: StoreScope, path: string[]): void {
    throw new Error('Method not implemented.');
  }

  getValue<SelectedState>(scope: StoreScope, path: string[]): SelectedState {
    throw new Error('Method not implemented.');
  }

  query<SelectedState>(
    scope: StoreScope,
    path: string[],
  ): Observable<SelectedState> {
    throw new Error('Method not implemented.');
  }
}
