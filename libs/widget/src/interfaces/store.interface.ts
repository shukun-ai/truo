import { Observable } from 'rxjs';

export interface IStore {
  update<SelectedState>(
    scope: StoreScope,
    path: string[],
    callback: StoreCallback<SelectedState>,
  ): void;
  remove(scope: StoreScope, path: string[]): void;
  getValue<SelectedState>(scope: StoreScope, path: string[]): SelectedState;
  query<SelectedState>(
    scope: StoreScope,
    path: string[],
  ): Observable<SelectedState>;
}

export type StoreScope = {
  type: 'app' | 'container';
  containerId: string | null;
  repositoryId: string;
};

export type StoreCallback<SelectedState> = (
  previous: SelectedState,
) => SelectedState;
