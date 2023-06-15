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
  selectedScreenId: string | null;
  selectedContainerId: string | null;
  selectedTabId: string | null;
};

export const ROOT_NODE_ID = 'root';
export const SCREEN_HOME_PAGE_ID = 'home';

export const presenterStore = createStore(
  { name: 'presenter' },
  withProps<PresenterProps>({
    presenterTitle: '未命名',
    widgetDefinitions,
    selectedScreenId: null,
    selectedContainerId: null,
    selectedTabId: null,
  }),
  withScreen(),
  withContainer(),
  withTreeCollapse(),
  withWidget(),
  withTab(),
);
