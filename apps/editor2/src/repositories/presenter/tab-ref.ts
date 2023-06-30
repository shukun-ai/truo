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
      widgetId: string;
    }
  | {
      tabType: 'repository';
      containerName: string;
      repositoryName: string;
    }
);

const { presenterTabEntitiesRef, withPresenterTabEntities } =
  entitiesPropsFactory('presenterTab');

export const withTab = () => {
  return withPresenterTabEntities<PresenterTabEntity>();
};

export const tabRef = presenterTabEntitiesRef;
