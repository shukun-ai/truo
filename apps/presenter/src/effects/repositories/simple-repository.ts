import { TypeException } from '@shukun/exception';
import { ISimpleRepository, SimpleState } from '@shukun/widget';
import { cloneDeep, set } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';

export class SimpleRepository implements ISimpleRepository {
  private readonly state: BehaviorSubject<SimpleState>;

  constructor(private readonly defaultValue: SimpleState) {
    const parseDefaultValue: SimpleState =
      typeof this.defaultValue === 'undefined' ? {} : this.defaultValue;
    this.state = new BehaviorSubject(parseDefaultValue);
  }

  query(): Observable<SimpleState> {
    return this.state;
  }

  getValue(): SimpleState {
    return this.state.getValue();
  }

  setValue(path: (string | number)[], value: SimpleState): void {
    if (path.length === 0) {
      this.state.next(value);
    } else {
      const target = cloneDeep(this.state.getValue());

      if (target === null) {
        throw new TypeException('The target is null, so we cannot update it.');
      } else if (typeof target === 'object') {
        set(target, path, value);
        this.state.next(target);
      } else {
        throw new TypeException(
          'The target is not a object, so we cannot update it.',
        );
      }
    }
  }

  resetValue(): void {
    this.state.next(this.defaultValue);
  }

  destroy(): void {
    this.state.unsubscribe();
  }
}
