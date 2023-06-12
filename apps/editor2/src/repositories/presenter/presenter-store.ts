import { createStore, withProps } from '@ngneat/elf';
import { WidgetSchema } from '@shukun/schema';

import { widgetDefinitions } from '../../widgets/widget-loader';

import { withContainer } from './container-ref';
import { withScreen } from './screen-ref';
import { withTab } from './tab-ref';
import { withTreeCollapse } from './tree-ui-ref';
import { withWidget } from './widget-ref';

export type PresenterProps = {
  presenterTitle: string;
  widgetDefinitions: Record<string, WidgetSchema>;
  selectedContainerId: string | null;
  selectedTabId: string | null;
};

export const ROOT_NODE_ID = 'root';

export const presenterStore = createStore(
  { name: 'presenter' },
  withProps<PresenterProps>({
    presenterTitle: '未命名',
    widgetDefinitions,
    selectedContainerId: null,
    selectedTabId: null,
  }),
  withScreen(),
  withContainer(),
  withTreeCollapse(),
  withWidget(),
  withTab(),
);
