import { Box, Divider } from '@mantine/core';

import { useObservableState } from 'observable-hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppContext } from '../../contexts/app-context';

import { ActivityBar } from './components/activity-bar';
import { EditorGroups } from './components/editor-groups';
import { PreviewArea } from './components/preview-area';
import { TopBar } from './components/top-bar';

export type PresenterContainerProps = {
  //
};

export const PresenterContainer = () => {
  const app = useAppContext();

  const { presenterName } = useParams();

  const selectedTab = useObservableState(
    app.repositories.tabRepository.selectedTab$,
    null,
  );

  useEffect(() => {
    if (presenterName) {
      app.repositories.presenterRepository.initialize(presenterName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presenterName]);

  useEffect(() => {
    app.repositories.connectorRepository.initialize();
    app.repositories.taskRepository.initialize();
    app.repositories.metadataRepository.initialize();
    app.repositories.environmentRepository.initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      id="presenter__wrap"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box
        id="presenter__wrap2"
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 0',
          overflow: 'hidden',
        }}
      >
        <Box id="presenter__top_bar">
          <TopBar />
        </Box>
        <Box
          id="presenter__middle_area"
          sx={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            flexShrink: 0,
            display: 'flex',
          }}
        >
          <Box
            id="presenter__middle_area_menu"
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
              <ActivityBar />
            </Box>
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
            <EditorGroups />
          </Box>
          <Divider orientation="vertical" />
          <Box
            sx={{
              display: selectedTab?.tabType !== 'connector' ? 'flex' : 'none',
              flex: 2,
              minWidth: 0,
              minHeight: 0,
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            <PreviewArea />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
