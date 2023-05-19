import { Box, Divider } from '@mantine/core';

import { CodeTool } from './components/code-tool';
import { DebugTool } from './components/debug-tool';
import { RepositoryTool } from './components/repository-tool';
import { ScreenTool } from './components/screen-tool';
import { SettingTool } from './components/setting-tool';
import { StatusBar } from './components/status-bar';
import { TopBar } from './components/top-bar';

export type PresenterContainerProps = {
  //
};

export const PresenterContainer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box>
        <TopBar />
      </Box>
      <Box sx={{ flex: 1, display: 'flex' }}>
        <Box sx={{ display: 'flex', width: 400, flexDirection: 'column' }}>
          <Box sx={{ flex: 1 }}>
            <ScreenTool />
          </Box>
          <Divider />
          <Box sx={{ flex: 1 }}>
            <RepositoryTool />
          </Box>
        </Box>
        <Divider orientation="vertical" />
        <Box sx={{ width: 400 }}>
          <SettingTool />
        </Box>
        <Divider orientation="vertical" />
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <Box sx={{ flex: 1 }}>
            <CodeTool />
          </Box>
          <Divider />
          <Box sx={{ flex: 1 }}>
            <DebugTool />
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box>
        <StatusBar />
      </Box>
    </Box>
  );
};
