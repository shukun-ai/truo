import { PlayerRepositorySimple } from '@shukun/schema';
import { cloneDeep, set } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';

import { IRepository } from '../repository/repository.interface';

export class SimpleRepository implements IRepository {
  private fields: BehaviorSubject<Record<string, unknown>>;

  private schema: PlayerRepositorySimple;

  constructor(repository: PlayerRepositorySimple) {
    this.schema = repository;
    this.fields = new BehaviorSubject({});
  }

  query(): Observable<unknown> {
    return this.fields;
  }

  getValue(): unknown {
    return this.fields.getValue();
  }

  setValue(path: (string | number)[], value: unknown): void {
    const target = cloneDeep(this.fields.getValue());
    set(target, path, value);
    this.fields.next(target);
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
