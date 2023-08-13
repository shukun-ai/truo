import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';

import { Injector } from '../../../interfaces/injector';

import { get, set } from './store-utils';

export class Store {
  store = new BehaviorSubject<Record<string, unknown>>({});

  constructor(
    private readonly environments: Injector['environments'],
    private readonly devtool: Injector['devtool'],
  ) {}

  update<SelectedState>(
    path: string[],
    callback: (previous: SelectedState) => SelectedState,
  ): void {
    const previousAllState = this.store.getValue();
    const previousSelectedState = get(previousAllState, path);
    const nextSelectedState = callback.apply(null, [previousSelectedState]);
    const nextAllState = set(previousAllState, path, nextSelectedState);

    this.store.next(nextAllState);
    this.sendDevtool('update', path);
  }

  remove(path: string[]): void {
    this.update(path, () => undefined);
    this.sendDevtool('remove', path);
  }

  getValue<SelectedState>(path: string[]): SelectedState {
    const allState = this.store.getValue();
    const selectedState = get(allState, path);
    return selectedState;
  }

  query<SelectedState>(path: string[]): Observable<SelectedState> {
    return this.store.pipe(
      map((allState) => {
        const selectedState = get(allState, path);
        return selectedState;
      }),
      // TODO remember to distinct for array.
      distinctUntilChanged(),
    );
  }

  queryAll(): Observable<unknown> {
    return this.store.pipe(distinctUntilChanged());
  }

  getAllValue(): unknown {
    return this.store.getValue();
  }

  private sendDevtool(action: string, path: string[]) {
    if (!this.environments.production) {
      return;
    }
    const description = `${action} -> ${path.join('.')}`;
    this.devtool.send(description, 'store', this.getAllValue());
  }
}
