import { HttpQuerySchema, PresenterEvent } from '@shukun/schema';
import { AsyncState, IApiRequester, IAsyncRepository } from '@shukun/widget';
import { Observable } from 'rxjs';

import { RepositoryFactoryContext } from './repository-factory.type';
import { Store } from './store';

export class SourceQueryRepository implements IAsyncRepository {
  private readonly store: Store<AsyncState>;

  constructor(readonly context: RepositoryFactoryContext) {
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

  async run(event: PresenterEvent, payload: unknown): Promise<void> {
    this.store.update((previous) => ({
      ...previous,
      loading: true,
    }));

    const { apiRequester, definition } = this.context;
    const { atomName } = definition.parameters as any;

    // TODO Validate the parsedQuery is HttpQuerySchema in development mode.

    const response = await this.sendRequester(
      apiRequester,
      atomName,
      payload as HttpQuerySchema,
    );
    this.store.update(() => ({
      loading: false,
      errorMessage: null,
      data: response.data,
    }));
  }

  private async sendRequester(
    apiRequester: IApiRequester,
    atomName: string,
    query: HttpQuerySchema,
  ) {
    try {
      const response = await apiRequester
        .createSourceRequester(atomName)
        .query(query);
      return response;
    } catch (error) {
      this.store.update((previous) => ({
        ...previous,
        loading: false,
        errorMessage: error instanceof Error ? error.message : '未知错误',
      }));
      throw error;
    }
  }
}
