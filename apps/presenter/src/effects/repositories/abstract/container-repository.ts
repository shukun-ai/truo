import {
  ContainerFactoryContext,
  IRepository,
  StoreScope,
} from '@shukun/widget';

import { write } from '../utils/mutation';

export class ContainerRepository<State> implements IRepository {
  constructor(readonly context: ContainerFactoryContext) {}

  initializeValue(initialValue: State) {
    this.context.store.update(this.getScope(), [], () => initialValue);
  }

  updateValue(callback: (draft: State) => void) {
    this.context.store.update(this.getScope(), [], write(callback));
  }

  getState(path?: string[]): State {
    return this.context.store.getValue(this.getScope(), path ?? []);
  }

  getScope(): StoreScope {
    return {
      type: 'container',
      containerId: this.context.containerId,
      repositoryId: this.context.repositoryId,
    };
  }
}
