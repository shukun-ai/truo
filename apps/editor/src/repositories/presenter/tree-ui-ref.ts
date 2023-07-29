import { entitiesPropsFactory } from '@ngneat/elf-entities';

export type PresenterTreeCollapse = {
  id: string;
  collapse: true;
};

const { treeCollapseEntitiesRef, withTreeCollapseEntities } =
  entitiesPropsFactory('treeCollapse');

export const withTreeCollapse = () => {
  return withTreeCollapseEntities<PresenterTreeCollapse>();
};

export const treeCollapseRef = treeCollapseEntitiesRef;
