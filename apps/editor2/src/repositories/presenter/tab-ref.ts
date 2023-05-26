import { entitiesPropsFactory } from '@ngneat/elf-entities';

export type PresenterTabEntity = {
  id: string;
  tabType: 'widget';
  widgetId: string | null;
  isPreview: boolean;
  isEdit: boolean;
  hasError: boolean;
};

const { presenterTabEntitiesRef, withPresenterTabEntities } =
  entitiesPropsFactory('presenterTab');

export const withTab = () => {
  return withPresenterTabEntities<PresenterTabEntity>();
};

export const tabRef = presenterTabEntitiesRef;
