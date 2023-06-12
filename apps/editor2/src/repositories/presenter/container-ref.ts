import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterTreeNodes } from '@shukun/schema';

export type PresenterContainerEntity = {
  id: string; // containerId
  containerId: string;
  type: 'page';
  tree: PresenterTreeNodes;
};

const { presenterContainerEntitiesRef, withPresenterContainerEntities } =
  entitiesPropsFactory('presenterContainer');

export const withContainer = () => {
  return withPresenterContainerEntities<PresenterContainerEntity>();
};

export const containerRef = presenterContainerEntitiesRef;

export const getContainerEntityId = (containerId: string) => {
  return `${containerId}`;
};
