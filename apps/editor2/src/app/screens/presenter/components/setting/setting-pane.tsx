import { ActionIcon, Box, Group, Tabs, Text } from '@mantine/core';

import { IconX } from '@tabler/icons-react';
import { useObservableState } from 'observable-hooks';

import { useAppContext } from '../../../../contexts/app-context';

export type SettingPaneProps = {
  //
};

export const SettingPane = () => {
  const app = useAppContext();
  const allTabs = useObservableState(
    app.repositories.presenterRepository.tabRepository.allTabs$,
    [],
  );

  return (
    <Box>
      <Tabs>
        <Tabs.List>
          {allTabs.map((tab) => (
            <Tabs.Tab value={tab.id}>
              <Group spacing={2}>
                <Text fs={tab.isPreview ? 'italic' : undefined}>
                  {tab.widgetId}
                </Text>
                <ActionIcon>
                  <IconX size="0.75rem" />
                </ActionIcon>
              </Group>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </Box>
  );
};
