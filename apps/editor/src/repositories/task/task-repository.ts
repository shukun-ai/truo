import { select } from '@ngneat/elf';
import { setEntities } from '@ngneat/elf-entities';

import {
  assignTask,
  eitherTask,
  messageTask,
  parallelTask,
  repeatTask,
  transformerTask,
} from '@shukun/connector/task';

import { TaskSchema } from '@shukun/schema';

import { IApiRequester } from '../../apis/requester.interface';

import { TaskEntity, createTaskEntityId, taskRef } from './task-ref';
import { taskStore } from './task-store';

export const taskRepository = {
  all$: taskStore.pipe(select((state) => state.taskEntities)),

  initialize: async (apiRequester: IApiRequester): Promise<void> => {
    const loadWeb = true;
    const tasks = loadWeb
      ? await loadWebTasks(apiRequester)
      : await loadNodeTasks(apiRequester);
    const entities: TaskEntity[] = Object.entries(tasks).map(
      ([taskName, task]) => ({
        ...task,
        id: createTaskEntityId(taskName),
        taskName,
      }),
    );
    taskStore.update(setEntities(entities, { ref: taskRef }));
  },
};

const loadNodeTasks = async (
  apiRequester: IApiRequester,
): Promise<Record<string, TaskSchema>> => {
  const response = await apiRequester.developerRequester.queryTask();
  return response.data.value;
};

const loadWebTasks = async (
  apiRequester: IApiRequester,
): Promise<Record<string, TaskSchema>> => {
  return {
    either: eitherTask,
    parallel: parallelTask,
    repeat: repeatTask,
    transformer: transformerTask,
    message: messageTask,
    assign: assignTask,
  };
};
