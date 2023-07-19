import { Alert, Box, Tabs } from '@mantine/core';

import { IconMoodCheck } from '@tabler/icons-react';
import { ReactNode } from 'react';

import { TabActions } from './internal/tab-actions';
import { EditorTabItem } from './internal/type';

export type EditorTabsProps = {
  selectedTabId: string | null;
  tabs: EditorTabItem[];
  fixTab(tabItemId: string): void;
  chooseTab(tabItemId: string): void;
  closeTab(tabItemId: string): void;
  label: (tabItem: EditorTabItem, index: number) => ReactNode;
  detail: (tabItem: EditorTabItem, index: number) => ReactNode;
};

export const EditorTabs = ({
  selectedTabId,
  tabs,
  fixTab,
  chooseTab,
  closeTab,
  label,
  detail,
}: EditorTabsProps) => {
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
        value={selectedTabId}
        onTabChange={(tabId) => {
          if (tabId) {
            chooseTab(tabId);
          }
        }}
      >
        <Tabs.List sx={{ overflowX: 'scroll', flexWrap: 'nowrap' }}>
          {tabs.map((tab, index) => (
            <Tabs.Tab
              key={tab.id}
              value={tab.id}
              rightSection={
                <TabActions tab={tab} fixTab={fixTab} closeTab={closeTab} />
              }
            >
              {label(tab, index)}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {tabs.map((tab, index) => (
          <Tabs.Panel
            key={tab.id}
            value={tab.id}
            sx={{ flex: 1, overflow: 'hidden' }}
          >
            {detail(tab, index)}
          </Tabs.Panel>
        ))}
        {tabs.length === 0 && (
          <Box p={24}>
            <Alert
              icon={<IconMoodCheck size="2rem" />}
              title="欢迎使用 SHUKUN 开发平台"
            >
              请选择左侧的元素开始您的项目
            </Alert>
          </Box>
        )}
      </Tabs>
    </Box>
  );
};
