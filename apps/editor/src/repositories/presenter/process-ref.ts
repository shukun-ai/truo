import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterProcess } from '@shukun/schema';
import { nanoid } from 'nanoid';

export type PresenterProcessEntity = {
  id: string;
} & PresenterProcess;

const { processEntitiesRef, withProcessEntities } =
  entitiesPropsFactory('process');

export const withProcess = () => {
  return withProcessEntities<PresenterProcessEntity>();
};

export const processRef = processEntitiesRef;

export const createProcessEntityId = (): string => {
  return `P-${nanoid()}`;
};

export const getProcess = (processEntity: PresenterProcessEntity) => {
  const { id, ...process } = processEntity;
  return process;
};
