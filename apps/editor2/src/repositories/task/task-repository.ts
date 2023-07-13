import { selectAllEntities, setEntities } from '@ngneat/elf-entities';

import { Observable } from 'rxjs';

import { ApiRequester } from '../../apis/requester';

import { TaskEntity, createTaskEntityId, taskRef } from './task-ref';
import { ITaskRepository } from './task-repository.interface';
import { taskStore } from './task-store';

export class TaskRepository implements ITaskRepository {
  private readonly taskStore = taskStore;

  all$: Observable<TaskEntity[]> = this.taskStore.pipe(
    selectAllEntities({ ref: taskRef }),
  );

  constructor(private readonly apiRequester: ApiRequester) {}

  async initialize(): Promise<void> {
    const response = await this.apiRequester.developerRequester.queryTask();
    const entities: TaskEntity[] = Object.entries(response.data.value).map(
      ([taskName, task]) => ({
        ...task,
        id: createTaskEntityId(taskName),
        taskName,
      }),
    );
    this.taskStore.update(setEntities(entities, { ref: taskRef }));
  }
}
