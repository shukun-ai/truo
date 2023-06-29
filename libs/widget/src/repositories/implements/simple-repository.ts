import { PresenterEvent } from '@shukun/schema';

import { RepositoryContext } from '../../interfaces/repository.interface';
import { SimpleState } from '../../interfaces/simple-repository.interface';
import { BaseRepository } from '../abstracts/base-repository';

export class SimpleRepository extends BaseRepository<unknown> {
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
    const parseDefaultValue: SimpleState =
      typeof defaultValue === 'undefined' ? {} : defaultValue;

    this.initializeValue(parseDefaultValue);
  }
}
