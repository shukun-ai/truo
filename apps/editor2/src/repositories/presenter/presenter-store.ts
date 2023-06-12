import { createStore, select, setProps, withProps } from '@ngneat/elf';
import { getEntity } from '@ngneat/elf-entities';
import { WidgetSchema } from '@shukun/schema';

import { widgetDefinitions } from '../../widgets/widget-loader';

import { withContainer } from './container-ref';
import { withScreen } from './screen-ref';
import { tabRef, withTab } from './tab-ref';
import { withTreeCollapse } from './tree-ui-ref';
import { withWidget } from './widget-ref';

export type PresenterProps = {
  presenterTitle: string;
  widgetDefinitions: Record<string, WidgetSchema>;
  selectedContainerId: string | null;
  selectedWidgetId: string | null;
  selectedTabId: string | null;
};

export const ROOT_NODE_ID = 'root';

export const presenterStore = createStore(
  { name: 'presenter' },
  withProps<PresenterProps>({
    presenterTitle: '未命名',
    widgetDefinitions,
    selectedContainerId: null,
    selectedWidgetId: null,
    selectedTabId: null,
  }),
  withScreen(),
  withContainer(),
  withTreeCollapse(),
  withWidget(),
  withTab(),
);

presenterStore
  .pipe(select((state) => state.selectedTabId))
  .subscribe((selectedTabId) => {
    if (!selectedTabId) {
      return;
    }
    const tab = presenterStore.query(getEntity(selectedTabId, { ref: tabRef }));
    if (!tab) {
      return;
    }
    if (tab.tabType === 'widget') {
      presenterStore.update(
        setProps({
          selectedWidgetId: tab.widgetId,
        }),
      );
    }
  });
