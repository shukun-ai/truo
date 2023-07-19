import { Box } from '@mantine/core';

import { TabPane } from './tab/tab-pane';

export type SettingToolProps = {
  //
};

export const EditorGroups = () => {
  return (
    <Box sx={{ height: '100%', overflow: 'hidden' }}>
      <TabPane />
    </Box>
  );
};
