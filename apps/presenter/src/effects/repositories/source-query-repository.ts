import { HttpQuerySchema } from '@shukun/schema';
import { AsyncState, IApiRequester, IAsyncRepository } from '@shukun/widget';
import { Observable } from 'rxjs';

import { Store } from './store';

export type SourceQueryProps = {
  atomName: string;
  query: HttpQuerySchema;
};

export class SourceQueryRepository implements IAsyncRepository {
  private readonly store: Store<AsyncState>;

  constructor(
    private readonly apiRequester: IApiRequester,
    private readonly parameters: SourceQueryProps,
  ) {
    this.store = new Store({
      loading: false,
      errorMessage: null,
      data: {},
    } as AsyncState);
  }

  query(): Observable<AsyncState> {
    return this.store.asObservable();
  }

  getValue(): AsyncState {
    return this.store.getValue();
  }

  resetValue(): void {
    this.store.reset();
  }

  destroy(): void {
    this.store.unsubscribe();
  }

  async run(): Promise<void> {
    this.store.update((previous) => ({
      ...previous,
      loading: true,
    }));

    try {
      const response = await this.apiRequester
        .createSourceRequester(this.parameters.atomName)
        .query(this.parameters.query);

      this.store.update(() => ({
        loading: false,
        errorMessage: null,
        data: response.data,
      }));
    } catch (error) {
      this.store.update((previous) => ({
        ...previous,
        loading: false,
        errorMessage: error instanceof Error ? error.message : '未知错误',
      }));
    }
  }
}
