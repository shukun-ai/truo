import { Box, Divider } from '@mantine/core';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppContext } from '../../contexts/app-context';

import { ScreenTool } from './components/screen-tool';
import { SettingTool } from './components/setting-tool';
import { StatusBar } from './components/status-bar';
import { TopBar } from './components/top-bar';

export type PresenterContainerProps = {
  //
};

export const PresenterContainer = () => {
  const app = useAppContext();

  const { presenterName } = useParams();

  useEffect(() => {
    if (presenterName) {
      app.repositories.presenterRepository.fetchLatest(presenterName);
    }
  }, [app.repositories.presenterRepository, presenterName]);

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
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          flexShrink: 0,
          display: 'flex',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            minWidth: 0,
            minHeight: 0,
            flexShrink: 0,
            width: 320,
            flexDirection: 'column',
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0, minHeight: 0, flexShrink: 0 }}>
            <ScreenTool />
          </Box>
          {/* <Divider />
          <Box sx={{ flex: 1, minWidth: 0, minHeight: 0, flexShrink: 0 }}>
            <RepositoryTool />
          </Box> */}
        </Box>
        <Divider orientation="vertical" />
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <SettingTool />
        </Box>
        {/* <Divider orientation="vertical" />
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <Box sx={{ flex: 1 }}>
            <CodeTool />
          </Box>
          <Divider />
          <Box sx={{ flex: 1 }}>
            <DebugTool />
          </Box>
        </Box> */}
      </Box>
      <Divider />
      <Box>
        <StatusBar />
      </Box>
    </Box>
  );
};
