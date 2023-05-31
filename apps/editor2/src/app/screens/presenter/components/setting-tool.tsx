import { Box } from '@mantine/core';

import { SettingPane } from './setting/setting-pane';

export type SettingToolProps = {
  //
};

export const SettingTool = () => {
  return (
    <Box sx={{ height: '100%', overflow: 'hidden' }}>
      <SettingPane />
    </Box>
  );
};
