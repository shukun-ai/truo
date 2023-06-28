import { IStore, StoreScope } from '@shukun/widget';
import produce from 'immer';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  map,
  tap,
} from 'rxjs';

import { send } from '../../observable/devtool';

import { getByScope, setByScope } from './store-utils';

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
    const previousAllState = this.store.getValue();
    const previousSelectedState = getByScope(previousAllState, scope, path);
    const nextSelectedState = callback.apply(null, [previousSelectedState]);
    const nextAllState = produce(previousAllState, (draft) => {
      setByScope(draft, scope, path, nextSelectedState);
    });
    this.store.next(nextAllState);
  }

  remove(scope: StoreScope, path: string[]): void {
    this.update(scope, path, () => undefined);
  }

  getValue<SelectedState>(scope: StoreScope, path: string[]): SelectedState {
    const allState = this.store.getValue();
    const selectedState = getByScope(allState, scope, path);
    return selectedState;
  }

  query<SelectedState>(
    scope: StoreScope,
    path: string[],
  ): Observable<SelectedState> {
    return this.store.pipe(
      map((allState) => {
        const selectedState = getByScope(allState, scope, path);
        return selectedState;
      }),
      distinctUntilChanged(),
    );
  }
}
