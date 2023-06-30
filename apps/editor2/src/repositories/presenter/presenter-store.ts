import { createStore, withProps } from '@ngneat/elf';
import { RepositorySchema, WidgetSchema } from '@shukun/schema';

import { repositoryDefinitions } from '../../widgets/repository-loader';
import { widgetDefinitions } from '../../widgets/widget-loader';

import { withContainer } from './container-ref';
import { withRepository } from './repository-ref';
import { withScreen } from './screen-ref';
import { withTab } from './tab-ref';
import { withTreeCollapse } from './tree-ui-ref';
import { withWidget } from './widget-ref';

export type PresenterProps = {
  presenterLabel: string;
  widgetDefinitions: Record<string, WidgetSchema>;
  repositoryDefinitions: Record<string, RepositorySchema>;
  selectedScreenEntityId: string | null; // REFACTOR rename to selectedScreenEntityId;
  selectedContainerEntityId: string | null; // REFACTOR rename to selectedContainerEntityId;
  selectedTabId: string | null; // REFACTOR rename to selectedTabEntityId;
};

export const ROOT_NODE_ID = 'root';
export const SCREEN_HOME_PAGE_ID = 'home';

export const presenterStore = createStore(
  { name: 'presenter' },
  withProps<PresenterProps>({
    presenterLabel: '未命名',
    widgetDefinitions,
    repositoryDefinitions,
    selectedScreenEntityId: null,
    selectedContainerEntityId: null,
    selectedTabId: null,
  }),
  withScreen(),
  withContainer(),
  withTreeCollapse(),
  withWidget(),
  withTab(),
  withRepository(),
);
