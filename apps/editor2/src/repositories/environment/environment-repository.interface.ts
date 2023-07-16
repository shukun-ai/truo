import { Observable } from 'rxjs';

import { EnvironmentEntity } from './environment-ref';

export interface IEnvironmentRepository {
  all$: Observable<EnvironmentEntity[]>;

  initialize(): Promise<void>;
  create(environmentName: string): void;
  update(entity: EnvironmentEntity): void;
  remove(entityId: string): void;
}
