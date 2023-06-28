import { HttpQuerySchema, PresenterEvent } from '@shukun/schema';
import { AsyncState, IApiRequester, IAsyncRepository } from '@shukun/widget';

import { BaseRepository } from './base-repository';
import { RepositoryFactoryContext } from './repository-factory.type';

export class SourceQueryRepository
  extends BaseRepository<AsyncState>
  implements IAsyncRepository
{
  constructor(override readonly context: RepositoryFactoryContext) {
    super(context);
    this.setInitialValue();
  }

  async run(event: PresenterEvent, payload: unknown): Promise<void> {
    this.updateValue((draft) => (draft.loading = true));

    const { apiRequester, definition } = this.context;
    const { atomName } = definition.parameters as any;

    // TODO Validate the parsedQuery is HttpQuerySchema in development mode.

    const response = await this.sendRequester(
      apiRequester,
      atomName,
      payload as HttpQuerySchema,
    );

    this.updateValue((draft) => {
      draft.loading = false;
      draft.errorMessage = null;
      draft.data = response.data;
    });
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
      this.updateValue((draft) => {
        draft.loading = false;
        draft.errorMessage =
          error instanceof Error ? error.message : '未知错误';
      });
      throw error;
    }
  }

  private setInitialValue() {
    this.initializeValue({
      loading: false,
      errorMessage: null,
      data: {},
    });
  }
}
