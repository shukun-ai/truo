import { Observable } from 'rxjs';

import { TaskEntity } from './task-ref';

export interface ITaskRepository {
  all$: Observable<TaskEntity[]>;

  initialize(): Promise<void>;
}
