import { Observable } from 'rxjs';

export interface IRepository {
  destroy(): void;
  getValue(): unknown;
  query(): Observable<unknown>;
}

export enum RepositoryType {
  'Simple' = 'Simple',
  'Form' = 'Form',
  'Router' = 'Router',
  'Auth' = 'Auth',
  'SourceQuery' = 'SourceQuery',
  'Async' = 'Async',
  'Computed' = 'Computed',
}
