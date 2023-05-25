import { createStore, withProps } from '@ngneat/elf';
import { PresenterSchema, WidgetSchema } from '@shukun/schema';

import { widgetDefinitions } from '../widgets/widget-loader';

import { withTreeCollapse } from './presenter/tree-ui-ref';

export type PresenterProps = {
  currentPresenter: PresenterSchema;
  widgetDefinitions: Record<string, WidgetSchema>;
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
    widgetDefinitions,
    selectedContainerId: null,
    selectedWidgetId: null,
  }),
  withTreeCollapse(),
);
