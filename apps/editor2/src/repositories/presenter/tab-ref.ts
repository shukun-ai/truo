import { entitiesPropsFactory } from '@ngneat/elf-entities';

export type PresenterTabEntity = {
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
);

const { tabEntitiesRef, withTabEntities } = entitiesPropsFactory('tab');

export const withTab = () => {
  return withTabEntities<PresenterTabEntity>();
};

export const tabRef = tabEntitiesRef;
