import { createStore, withProps } from '@ngneat/elf';
import { PresenterSchema, WidgetSchema } from '@shukun/schema';

import { widgetDefinitions } from '../../widgets/widget-loader';

import { withTab } from './tab-ref';
import { withTreeCollapse } from './tree-ui-ref';
import { withWidget } from './widget-ref';

export type PresenterProps = {
  currentPresenter: PresenterSchema;
  widgetDefinitions: Record<string, WidgetSchema>;
  selectedContainerId: string | null;
  selectedWidgetId: string | null;
  selectedTabId: string | null;
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
    selectedTabId: null,
  }),
  withTreeCollapse(),
  withWidget(),
  withTab(),
);
