import { useObservableState } from 'observable-hooks';

import { EditorTabs } from '../../../../components/editor-tabs/editor-tabs';
import { useAppContext } from '../../../../contexts/app-context';

import { TabDetail } from './internal/tab-detail';
import { TabLabel } from './internal/tab-label';

export type TabPaneProps = {
  //
};

export const TabPane = () => {
  const app = useAppContext();
  const selectedTabEntityId = useObservableState(
    app.repositories.tabRepository.selectedTabEntityId$,
    null,
  );
  const allTabs = useObservableState(
    app.repositories.tabRepository.allTabs$,
    [],
  );

  return (
    <EditorTabs
      selectedTabId={selectedTabEntityId}
      tabs={allTabs}
      fixTab={app.repositories.tabRepository.fixTab.bind(
        app.repositories.tabRepository,
      )}
      chooseTab={app.repositories.tabRepository.chooseTab.bind(
        app.repositories.tabRepository,
      )}
      closeTab={app.repositories.tabRepository.closeTab.bind(
        app.repositories.tabRepository,
      )}
      detail={(tabItem, index) => <TabDetail tab={allTabs[index]} />}
      label={(tabItem, index) => <TabLabel tab={allTabs[index]} />}
    />
  );
};
