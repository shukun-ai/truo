import { Box, Tabs } from '@mantine/core';

import { useObservableState } from 'observable-hooks';

import { useAppContext } from '../../../../contexts/app-context';

import { SettingDetail } from './setting-detail';
import { SettingTabActions } from './setting-tab-actions';
import { SettingTabLabel } from './setting-tab-label';

export type SettingPaneProps = {
  //
};

export const SettingPane = () => {
  const app = useAppContext();
  const selectedTabId = useObservableState(
    app.repositories.presenterRepository.tabRepository.selectedTabId$,
    null,
  );
  const allTabs = useObservableState(
    app.repositories.presenterRepository.tabRepository.allTabs$,
    [],
  );

  return (
    <Box>
      <Tabs
        value={selectedTabId}
        onTabChange={(tabId) => {
          if (tabId) {
            app.repositories.presenterRepository.tabRepository.chooseTab(tabId);
          }
        }}
      >
        <Tabs.List>
          {allTabs.map((tab) => (
            <Tabs.Tab
              key={tab.id}
              value={tab.id}
              rightSection={<SettingTabActions tab={tab} />}
            >
              <SettingTabLabel tab={tab} />
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {allTabs.map((tab) => (
          <Tabs.Panel key={tab.id} value={tab.id}>
            <SettingDetail tab={tab} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </Box>
  );
};
