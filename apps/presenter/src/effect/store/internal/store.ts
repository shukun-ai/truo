import { Injector } from '@shukun/presenter/definition';
import { getStorePath, setStorePath } from '@shukun/util-functions';
import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';

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
    const previousSelectedState = getStorePath(previousAllState, path);
    const nextSelectedState = callback.apply(null, [previousSelectedState]);
    const nextAllState = setStorePath(
      previousAllState,
      path,
      nextSelectedState,
    );

    this.store.next(nextAllState);
    this.sendDevtool('update', path);
  }

  remove(path: string[]): void {
    this.update(path, () => undefined);
    this.sendDevtool('remove', path);
  }

  getValue<SelectedState>(path: string[]): SelectedState {
    const allState = this.store.getValue();
    const selectedState = getStorePath(allState, path);
    return selectedState;
  }

  query<SelectedState>(path: string[]): Observable<SelectedState> {
    return this.store.pipe(
      map((allState) => {
        const selectedState = getStorePath(allState, path);
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
    const description = `${action} -> ${path.join('.')}`;
    this.devtool.logState(description, this.getAllValue());
  }
}
