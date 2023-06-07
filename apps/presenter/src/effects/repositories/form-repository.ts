import { PresenterRepositorySimple } from '@shukun/schema';
import { FormRepositoryFields, IFormRepository } from '@shukun/widget';
import { BehaviorSubject, Observable } from 'rxjs';

export class FormRepository implements IFormRepository {
  readonly type = 'Form';

  private fields: BehaviorSubject<Record<string, unknown>>;

  private schema: PresenterRepositorySimple;

  constructor(repository: PresenterRepositorySimple) {
    this.schema = repository;
    this.fields = new BehaviorSubject({});
  }
  setFieldValue(path: string, value: unknown): void {
    throw new Error('Method not implemented.');
  }
  setFieldValid(path: string, valid: boolean): void {
    throw new Error('Method not implemented.');
  }
  getFieldValue(path: string): unknown {
    throw new Error('Method not implemented.');
  }
  submit(): FormRepositoryFields {
    throw new Error('Method not implemented.');
  }

  query(): Observable<FormRepositoryFields> {
    return this.fields;
  }

  getValue(): FormRepositoryFields {
    return this.fields.getValue();
  }

  setValue(): Error {
    throw new Error();
  }

  resetValue(): void {
    this.fields.next({});
  }

  destroy(): void {
    this.fields.unsubscribe();
  }

  trigger(): Error {
    throw new Error();
  }
}
