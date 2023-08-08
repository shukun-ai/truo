import {
  RepositoryContext,
  TemporaryState,
} from '@shukun/presenter/definition';
import { PresenterEvent } from '@shukun/schema';

import {
  createState,
  removeState,
  updateState,
} from '../common/scope-operator';

export class TemporaryRepository {
  constructor(readonly context: RepositoryContext) {}

  register() {
    const defaultValue = this.context.definition?.parameters?.['defaultValue'];
    const parseDefaultValue: TemporaryState =
      typeof defaultValue === 'undefined' ? {} : defaultValue;

    createState(this.context, parseDefaultValue);
  }

  unregister() {
    removeState(this.context);
  }

  setValue(event: PresenterEvent, payload: unknown): void {
    const { path } = event;
    updateState(this.context, path ?? [], () => payload);
  }
}
