import { PresenterEvent } from '@shukun/schema';
import { ISimpleRepository, SimpleState } from '@shukun/widget';

import { BaseRepository } from './base-repository';
import { RepositoryFactoryContext } from './repository-factory.type';

export class SimpleRepository
  extends BaseRepository<unknown>
  implements ISimpleRepository
{
  constructor(override readonly context: RepositoryFactoryContext) {
    super(context);
    this.setInitialValue(context);
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

  private setInitialValue(context: RepositoryFactoryContext) {
    const { defaultValue } = context.definition.parameters;
    const parseDefaultValue: SimpleState =
      typeof defaultValue === 'undefined' ? {} : defaultValue;

    this.initializeValue(parseDefaultValue);
  }
}
