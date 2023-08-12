import { createStore, withProps } from '@ngneat/elf';
import { PresenterNode, RepositorySchema, WidgetSchema } from '@shukun/schema';

import { repositoryDefinitions } from '../../widgets/repository-loader';
import { widgetDefinitions } from '../../widgets/widget-loader';

import { withRepository } from './repository-ref';
import { withTreeCollapse } from './tree-ui-ref';
import { withWidget } from './widget-ref';

export type PresenterProps = {
  initialized: boolean;
  presenterLabel: string;
  widgetDefinitions: Record<string, WidgetSchema>;
  repositoryDefinitions: Record<string, RepositorySchema>;
  selectedScreenEntityId: string | null;
  selectedContainerEntityId: string | null;
  selectedActivityTab: ActivityTab | null;
  nodes: Record<string, PresenterNode>;
};

export enum ActivityTab {
  Screens = 'Screens',
  Widgets = 'Widgets',
  Repositories = 'Repositories',
  Watches = 'Watches',
  Metadatas = 'Metadatas',
  Connectors = 'Connectors',
  Environments = 'Environments',
}

export const presenterActivityTabs = [
  ActivityTab.Screens,
  ActivityTab.Widgets,
  ActivityTab.Repositories,
  ActivityTab.Watches,
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
    repositoryDefinitions,
    selectedScreenEntityId: null,
    selectedContainerEntityId: null,
    selectedActivityTab: ActivityTab.Widgets,
    nodes: {},
  }),
  withTreeCollapse(),
  withWidget(),
  withRepository(),
);
