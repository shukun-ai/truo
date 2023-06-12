import { entitiesPropsFactory } from '@ngneat/elf-entities';

export type PresenterTreeCollapse = {
  id: string;
  collapse: true;
};

const { presenterTreeCollapseEntitiesRef, withPresenterTreeCollapseEntities } =
  entitiesPropsFactory('presenterTreeCollapse');

export const withTreeCollapse = () => {
  return withPresenterTreeCollapseEntities<PresenterTreeCollapse>();
};

export const treeCollapseRef = presenterTreeCollapseEntitiesRef;
