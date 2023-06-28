import { AppRepositoryContext, IRepository, StoreScope } from '@shukun/widget';

import { write } from '../utils/mutation';

export class AppRepository<State> implements IRepository {
  constructor(readonly context: AppRepositoryContext) {}

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
      type: 'app',
      containerId: null,
      repositoryId: this.context.repositoryId,
    };
  }
}
