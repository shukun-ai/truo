import { HttpQuerySchema, PresenterEvent } from '@shukun/schema';

import { RepositoryContext } from '../../interfaces/repository.interface';
import { IApiRequester } from '../../interfaces/requester.interface';
import { AsyncRepository } from '../abstracts/async-repository';

export class SourceQueryRepository extends AsyncRepository {
  constructor(override readonly context: RepositoryContext) {
    super(context);
    this.setInitialValue();
  }

  async run(event: PresenterEvent, payload: unknown): Promise<void> {
    this.updateDraft((draft) => (draft.loading = true));

    const { apiRequester, definition } = this.context;
    const { atomName } = definition.parameters as any;

    // TODO Validate the parsedQuery is HttpQuerySchema in development mode.

    const response = await this.sendRequester(
      apiRequester,
      atomName,
      payload as HttpQuerySchema,
    );

    this.updateDraft((draft) => {
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
      this.updateDraft((draft) => {
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
