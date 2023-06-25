import { IRepository } from '@shukun/widget';
import { cloneDeep, set } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';

export class SimpleRepository implements IRepository {
  readonly type = 'Simple';

  private fields: BehaviorSubject<Record<string, unknown>>;

  constructor(defaultValue: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parseDefaultValue: any =
      typeof defaultValue === 'undefined' ? {} : defaultValue;
    this.fields = new BehaviorSubject(parseDefaultValue);
  }

  query(): Observable<unknown> {
    return this.fields;
  }

  getValue(): unknown {
    return this.fields.getValue();
  }

  setValue(path: (string | number)[], value: unknown): void {
    if (path.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.fields.next(value as any);
    } else {
      const target = cloneDeep(this.fields.getValue());
      set(target, path, value);
      this.fields.next(target);
    }
  }

  resetValue(): void {
    this.fields.next({});
  }

  destroy(): void {
    this.fields.unsubscribe();
  }

  trigger(): void {
    throw new Error('Method not implemented.');
  }
}
