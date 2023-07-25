import { entitiesPropsFactory } from '@ngneat/elf-entities';

export type TabEntity = {
  id: string;
  isPreview: boolean;
  isEdit: boolean;
  hasError: boolean;
} & (
  | {
      tabType: 'widget';
      containerName: string;
      widgetName: string;
      widgetEntityId: string;
    }
  | {
      tabType: 'repository';
      containerName: string;
      repositoryName: string;
      repositoryEntityId: string;
    }
  | {
      tabType: 'watch';
      containerName: string;
      watchName: string;
      watchEntityId: string;
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
  | {
      tabType: 'screens';
    }
);

const { tabEntitiesRef, withTabEntities } = entitiesPropsFactory('tab');

export const withTab = () => {
  return withTabEntities<TabEntity>();
};

export const tabRef = tabEntitiesRef;
