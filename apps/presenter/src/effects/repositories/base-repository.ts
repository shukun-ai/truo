import { StoreScope } from '@shukun/widget';

import { write } from './mutation';
import { RepositoryFactoryContext } from './repository-factory.type';

export abstract class BaseRepository<State> {
  constructor(readonly context: RepositoryFactoryContext) {}

  protected initializeValue(initialValue: State) {
    this.context.store.update(this.getScope(), [], () => initialValue);
  }

  protected updateValue(callback: (draft: State) => void) {
    this.context.store.update(this.getScope(), [], write(callback));
  }

  protected getScope(): StoreScope {
    return {
      type: 'container',
      containerId: this.context.containerId,
      repositoryId: this.context.repositoryId,
    };
  }
}
