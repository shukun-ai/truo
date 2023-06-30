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
  const selectedTabEntityId = useObservableState(
    app.repositories.presenterRepository.tabRepository.selectedTabEntityId$,
    null,
  );
  const allTabs = useObservableState(
    app.repositories.presenterRepository.tabRepository.allTabs$,
    [],
  );

  return (
    <Box sx={{ height: '100%', overflow: 'hidden' }}>
      <Tabs
        sx={{
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
        value={selectedTabEntityId}
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
          <Tabs.Panel
            key={tab.id}
            value={tab.id}
            sx={{ flex: 1, overflow: 'hidden' }}
          >
            <SettingDetail tab={tab} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </Box>
  );
};
