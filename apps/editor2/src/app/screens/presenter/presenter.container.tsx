import { Box, Divider, useMantineTheme } from '@mantine/core';

import { IconGripHorizontal } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppContext } from '../../contexts/app-context';

import { PreviewTool } from './components/preview-tool';
import { ScreenTool } from './components/screen-tool';
import { SettingTool } from './components/setting-tool';
import { TopBar } from './components/top-bar';

export type PresenterContainerProps = {
  //
};

export const PresenterContainer = () => {
  const theme = useMantineTheme();

  const app = useAppContext();

  const { presenterName } = useParams();

  useEffect(() => {
    if (presenterName) {
      app.repositories.presenterRepository.initialize(presenterName);
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
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 0',
          overflow: 'hidden',
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
      </Box>

      <Box
        sx={{
          background: theme.colors.gray[2],
          borderTop: 'solid 1px',
          borderBottom: 'solid 1px',
          borderColor: theme.colors.gray[4],
          height: 12,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'row-resize',
        }}
      >
        <IconGripHorizontal color={theme.colors.gray[7]} size="0.9rem" />
      </Box>

      <Box sx={{ flex: '1 0', overflow: 'hidden' }}>
        <PreviewTool />
      </Box>
    </Box>
  );
};
