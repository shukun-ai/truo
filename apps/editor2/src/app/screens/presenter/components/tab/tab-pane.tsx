import { useObservableState } from 'observable-hooks';

import { EditorTabs } from '../../../../components/editor-tabs/editor-tabs';
import { useAppContext } from '../../../../contexts/app-context';

import { TabDetail } from './tab-detail';
import { TabLabel } from './tab-label';

export type TabPaneProps = {
  //
};

export const TabPane = () => {
  const app = useAppContext();
  const selectedTabEntityId = useObservableState(
    app.repositories.presenterRepository.tabRepository.selectedTabEntityId$,
    null,
  );
  const allTabs = useObservableState(
    app.repositories.presenterRepository.tabRepository.allTabs$,
    [],
  );

  return (
    <EditorTabs
      selectedTabId={selectedTabEntityId}
      tabs={allTabs}
      fixTab={app.repositories.presenterRepository.tabRepository.fixTab.bind(
        app.repositories.presenterRepository.tabRepository,
      )}
      chooseTab={app.repositories.presenterRepository.tabRepository.chooseTab.bind(
        app.repositories.presenterRepository.tabRepository,
      )}
      closeTab={app.repositories.presenterRepository.tabRepository.closeTab.bind(
        app.repositories.presenterRepository.tabRepository,
      )}
      detail={(tabItem, index) => <TabDetail tab={allTabs[index]} />}
      label={(tabItem, index) => <TabLabel tab={allTabs[index]} />}
    />
  );
};
