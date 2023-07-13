import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { TaskSchema } from '@shukun/schema';

export type TaskEntity = {
  id: string;
  taskName: string;
} & TaskSchema;

const { taskEntitiesRef, withTaskEntities } = entitiesPropsFactory('task');

export const withTask = () => {
  return withTaskEntities<TaskEntity>();
};

export const taskRef = taskEntitiesRef;

export const createTaskEntityId = (taskName: string): `${string}` => {
  return `${taskName}`;
};

export const getTask = (entity: TaskEntity): TaskSchema => {
  const { id, taskName, ...task } = entity;
  return { ...task };
};
