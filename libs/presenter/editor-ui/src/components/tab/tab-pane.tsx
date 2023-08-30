import { EditorTabs } from '@shukun/component';

import { useEditorContext } from '../../editor-context';

import { TabDetail } from './internal/tab-detail';
import { TabLabel } from './internal/tab-label';

export type TabPaneProps = {
  //
};

export const TabPane = () => {
  const { state, dispatch } = useEditorContext();

  return (
    <EditorTabs
      selectedTabId={state.selectedTab?.id ?? null}
      tabs={Object.values(state.tabs)}
      fixTab={dispatch.tab.fix}
      chooseTab={dispatch.tab.choose}
      closeTab={dispatch.tab.close}
      detail={(tabItem) => <TabDetail tab={state.tabs[tabItem.id]} />}
      label={(tabItem) => <TabLabel tab={state.tabs[tabItem.id]} />}
    />
  );
};
