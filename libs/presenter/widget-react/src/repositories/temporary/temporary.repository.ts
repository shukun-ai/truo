import {
  RepositoryContext,
  TemporaryState,
} from '@shukun/presenter/definition';
import { PresenterEvent } from '@shukun/schema';

import { BaseRepository } from '../base-repository';

export class TemporaryRepository extends BaseRepository<unknown> {
  constructor(override readonly context: RepositoryContext) {
    super(context);
    this.setInitialValue();
  }

  setValue(event: PresenterEvent, payload: unknown): void {
    const { path } = event;

    this.context.store.update(
      {
        type: 'container',
        containerId: this.context.containerId,
        repositoryId: this.context.repositoryId,
      },
      path ?? [],
      () => payload,
    );
  }

  private setInitialValue() {
    const defaultValue = this.context.definition?.parameters?.['defaultValue'];
    const parseDefaultValue: TemporaryState =
      typeof defaultValue === 'undefined' ? {} : defaultValue;

    this.initializeValue(parseDefaultValue);
  }
}
