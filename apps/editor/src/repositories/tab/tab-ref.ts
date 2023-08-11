import { entitiesPropsFactory } from '@ngneat/elf-entities';

export type TabEntity = {
  id: string;
  isPreview: boolean;
  isEdit: boolean;
  hasError: boolean;
} & (
  | {
      tabType: 'widget';
      widgetId: string;
    }
  | {
      tabType: 'repository';
      repositoryId: string;
    }
  | {
      tabType: 'connector';
      connectorName: string;
      connectorEntityId: string;
    }
  | {
      tabType: 'metadata';
      metadataName: string;
      metadataEntityId: string;
    }
  | {
      tabType: 'environment';
      environmentName: string;
      environmentEntityId: string;
    }
);

const { tabEntitiesRef, withTabEntities } = entitiesPropsFactory('tab');

export const withTab = () => {
  return withTabEntities<TabEntity>();
};

export const tabRef = tabEntitiesRef;
