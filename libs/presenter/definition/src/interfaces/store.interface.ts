import { Observable } from 'rxjs';

export interface IStore {
  update<SelectedState>(
    target: string,
    path: string[],
    callback: StoreCallback<SelectedState>,
  ): void;
  remove(target: string, path: string[]): void;
  getValue<SelectedState>(target: string, path: string[]): SelectedState;
  query<SelectedState>(
    target: string,
    path: string[],
  ): Observable<SelectedState>;
  queryAll(): Observable<unknown>;
  getAllValue(): unknown;
}

export type StoreCallback<SelectedState> = (
  previous: SelectedState,
) => SelectedState;
