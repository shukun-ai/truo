import { select } from '@ngneat/elf';
import { setEntities } from '@ngneat/elf-entities';

import { IApiRequester } from '../../apis/requester.interface';

import { TaskEntity, createTaskEntityId, taskRef } from './task-ref';
import { taskStore } from './task-store';

export const taskRepository = {
  all$: taskStore.pipe(select((state) => state.taskEntities)),

  initialize: async (apiRequester: IApiRequester): Promise<void> => {
    const response = await apiRequester.developerRequester.queryTask();
    const entities: TaskEntity[] = Object.entries(response.data.value).map(
      ([taskName, task]) => ({
        ...task,
        id: createTaskEntityId(taskName),
        taskName,
      }),
    );
    taskStore.update(setEntities(entities, { ref: taskRef }));
  },
};
