import { createStore, withProps } from '@ngneat/elf';
import { RepositorySchema, WidgetSchema } from '@shukun/schema';

import { repositoryDefinitions } from '../../widgets/repository-loader';
import { widgetDefinitions } from '../../widgets/widget-loader';

import { withContainer } from './container-ref';
import { withRepository } from './repository-ref';
import { withScreen } from './screen-ref';
import { withTreeCollapse } from './tree-ui-ref';
import { withWatch } from './watch-ref';
import { withWidget } from './widget-ref';

export type PresenterProps = {
  initialized: boolean;
  presenterLabel: string;
  widgetDefinitions: Record<string, WidgetSchema>;
  repositoryDefinitions: Record<string, RepositorySchema>;
  selectedScreenEntityId: string | null;
  selectedContainerEntityId: string | null;
};

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
  }),
  withScreen(),
  withContainer(),
  withTreeCollapse(),
  withWidget(),
  withRepository(),
  withWatch(),
);
