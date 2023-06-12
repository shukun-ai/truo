import { entitiesPropsFactory } from '@ngneat/elf-entities';

export type PresenterTabEntity = {
  id: string;
  isPreview: boolean;
  isEdit: boolean;
  hasError: boolean;
} & (
  | {
      tabType: 'widget';
      containerId: string;
      widgetId: string;
    }
  | {
      tabType: 'repository';
      containerId: string;
      repositoryId: string;
    }
);

const { presenterTabEntitiesRef, withPresenterTabEntities } =
  entitiesPropsFactory('presenterTab');

export const withTab = () => {
  return withPresenterTabEntities<PresenterTabEntity>();
};

export const tabRef = presenterTabEntitiesRef;
