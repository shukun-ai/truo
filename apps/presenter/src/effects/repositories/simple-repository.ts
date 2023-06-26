import { TypeException } from '@shukun/exception';
import { PresenterEvent } from '@shukun/schema';
import { ISimpleRepository, SimpleState } from '@shukun/widget';
import { cloneDeep, set } from 'lodash';
import { Observable } from 'rxjs';

import { RepositoryFactoryContext } from './repository-factory.type';
import { Store } from './store';

export class SimpleRepository implements ISimpleRepository {
  private readonly state: Store<SimpleState>;

  constructor(readonly context: RepositoryFactoryContext) {
    const { defaultValue } = context.definition.parameters;
    const parseDefaultValue: SimpleState =
      typeof defaultValue === 'undefined' ? {} : defaultValue;
    this.state = new Store(parseDefaultValue);
  }

  query(): Observable<SimpleState> {
    return this.state.asObservable();
  }

  getValue(): SimpleState {
    return this.state.getValue();
  }

  setValue(event: PresenterEvent, payload: unknown): void {
    const { path } = event;
    this.updateValue(path ?? [], payload);
  }

  private updateValue(path: (string | number)[], value: SimpleState): void {
    if (path.length === 0) {
      this.state.update(() => value);
    } else {
      const target = cloneDeep(this.state.getValue());

      if (target === null) {
        throw new TypeException('The target is null, so we cannot update it.');
      } else if (typeof target === 'object') {
        set(target, path, value);
        this.state.update(() => target);
      } else {
        throw new TypeException(
          'The target is not a object, so we cannot update it.',
        );
      }
    }
  }

  resetValue(): void {
    this.state.reset();
  }

  destroy(): void {
    this.state.unsubscribe();
  }
}
