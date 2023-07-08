import {
  RepositoryContext,
  IRepository,
} from '../../interfaces/repository.interface';
import { StoreScope } from '../../interfaces/store.interface';
import { write } from '../utils/mutation';

export class BaseRepository<State> implements IRepository {
  constructor(readonly context: RepositoryContext) {}

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
      type: this.context.type,
      containerId: this.context.containerId,
      repositoryId: this.context.repositoryId,
    };
  }
}
