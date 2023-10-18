import { entitiesPropsFactory } from '@ngneat/elf-entities';

export type TabEntity = {
  id: string;
  isPreview: boolean;
  isEdit: boolean;
  hasError: boolean;
  tabType:
    | 'widget'
    | 'repository'
    | 'process'
    | 'watch'
    | 'connector'
    | 'metadata'
    | 'environment';
  foreignId: string;
};

const { tabEntitiesRef, withTabEntities } = entitiesPropsFactory('tab');

export const withTab = () => {
  return withTabEntities<TabEntity>();
};

export const tabRef = tabEntitiesRef;
