import { Box, Divider } from '@mantine/core';

import { ActivityBar } from './components/activity-bar';
import { EditorGroups } from './components/editor-groups';
import { PreviewArea } from './components/preview-area';
import { useEditorContext } from './editor-context';
import { useDevtool } from './hooks/use-devtool';

export const EditorEntry = () => {
  const { state } = useEditorContext();
  const { selectedTab } = state;

  useDevtool();

  return (
    <Box
      id="editor__wrapper"
      sx={{
        width: '100vw',
        height: '100vh',
        minWidth: 0,
        minHeight: 0,
        display: 'flex',
      }}
    >
      <Box
        id="editor__activity_bar"
        sx={{
          display: 'flex',
          minWidth: 0,
          minHeight: 0,
          flexShrink: 0,
          maxWidth: 320,
        }}
      >
        <ActivityBar />
      </Box>
      <Divider orientation="vertical" />
      <Box
        id="editor__editor_group"
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
        id="editor__preview_area"
        sx={{
          display:
            selectedTab === null || ['widget'].includes(selectedTab.tabType)
              ? 'flex'
              : 'none',
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
  );
};
