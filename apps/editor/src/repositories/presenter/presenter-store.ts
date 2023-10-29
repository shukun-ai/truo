import { createStore, withProps } from '@ngneat/elf';
import { WidgetGallery } from '@shukun/component';
import { PresenterNode, WidgetSchema } from '@shukun/schema';

import { widgetDefinitions, widgetGallery } from '../../widgets/widget-loader';

import { withProcess } from './process-ref';
import { withTreeCollapse } from './tree-ui-ref';
import { withVariable } from './variable-ref';
import { withWidget } from './widget-ref';

export type PresenterProps = {
  initialized: boolean;
  presenterLabel: string;
  widgetDefinitions: Record<string, WidgetSchema>;
  widgetGallery: WidgetGallery;
  selectedScreenEntityId: string | null;
  selectedContainerEntityId: string | null;
  selectedActivityTab: ActivityTab | null;
  nodes: Record<string, PresenterNode>;
};

export enum ActivityTab {
  Screens = 'Screens',
  Widgets = 'Widgets',
  Repositories = 'Repositories',
  Variables = 'Variables',
  Processes = 'Processes',
  Metadatas = 'Metadatas',
  Connectors = 'Connectors',
  Environments = 'Environments',
}

export const presenterActivityTabs = [
  ActivityTab.Screens,
  ActivityTab.Widgets,
  ActivityTab.Repositories,
];

export const systemActivityTabs = [
  ActivityTab.Metadatas,
  ActivityTab.Connectors,
  ActivityTab.Environments,
];

export const ROOT_NODE_ID = 'root';
export const SCREEN_HOME_PAGE_ID = 'home';

export const presenterStore = createStore(
  { name: 'presenter' },
  withProps<PresenterProps>({
    initialized: false,
    presenterLabel: '未命名',
    widgetDefinitions,
    widgetGallery,
    selectedScreenEntityId: null,
    selectedContainerEntityId: null,
    selectedActivityTab: ActivityTab.Widgets,
    nodes: {},
  }),
  withTreeCollapse(),
  withWidget(),
  withVariable(),
  withProcess(),
);
