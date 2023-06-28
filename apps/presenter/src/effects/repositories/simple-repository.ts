import { PresenterEvent } from '@shukun/schema';
import { ContainerRepositoryContext, SimpleState } from '@shukun/widget';

import { ContainerRepository } from './abstract/container-repository';

export class SimpleRepository extends ContainerRepository<unknown> {
  constructor(override readonly context: ContainerRepositoryContext) {
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

  private setInitialValue(context: ContainerRepositoryContext) {
    const defaultValue = context.definition?.parameters?.['defaultValue'];
    const parseDefaultValue: SimpleState =
      typeof defaultValue === 'undefined' ? {} : defaultValue;

    this.initializeValue(parseDefaultValue);
  }
}
