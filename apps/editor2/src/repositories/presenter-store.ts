import { createStore, withProps } from '@ngneat/elf';
import { PresenterSchema } from '@shukun/schema';

import { withTreeCollapse } from './presenter/tree-ui-ref';

export type PresenterProps = {
  currentPresenter: PresenterSchema;
  selectedContainerId: string | null;
  selectedWidgetId: string | null;
};

export const ROOT_NODE_ID = 'root';

export const presenterStore = createStore(
  { name: 'presenter' },
  withProps<PresenterProps>({
    currentPresenter: {
      title: '未命名',
      containers: {},
      screens: {},
    },
    selectedContainerId: null,
    selectedWidgetId: null,
  }),
  withTreeCollapse(),
);
