import { Observable } from 'rxjs';

import { IRepository } from './repository.interface';

export interface IFormRepository extends IRepository {
  destroy(): void;
  getValue(): FormRepositoryFields;
  resetValue(): void;
  query(): Observable<FormRepositoryFields>;
  setValue(): Error;
  trigger(): Error;
  setFieldValue(path: string, value: unknown): void;
  setFieldValid(path: string, valid: boolean): void;
  getFieldValue(path: string): unknown;
  submit(): FormRepositoryFields;
}

export type FormRepositoryFields = Record<string, unknown>;

export type FormRepositoryStatus = {
  submitted: boolean;
  valid: {
    [path: string]: boolean;
  };
};
