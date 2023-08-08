import {
  IRepository,
  RepositoryContext,
  StoreScope,
} from '@shukun/presenter/definition';

import { write } from './common/mutation';

export class BaseRepository<State> implements IRepository {
  constructor(readonly context: RepositoryContext) {}

  initializeValue(initialValue: State) {
    this.context.store.update(this.getScope(), [], () => initialValue);
  }

  updateDraft(callback: (draft: State) => void) {
    this.context.store.update(this.getScope(), [], write(callback));
  }

  getState(path?: string[]): State {
    return this.context.store.getValue(this.getScope(), path ?? []);
  }

  getScope(): StoreScope {
    return {
      type: this.context.type,
      containerId: this.context.containerId,
      repositoryId: this.context.repositoryId,
    };
  }
}
