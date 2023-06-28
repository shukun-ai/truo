import { PresenterEvent } from '@shukun/schema';
import {
  ISimpleRepository,
  RepositoryFactoryContext,
  SimpleState,
} from '@shukun/widget';

import { ContainerRepository } from './abstract/container-repository';

export class SimpleRepository
  extends ContainerRepository<unknown>
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
