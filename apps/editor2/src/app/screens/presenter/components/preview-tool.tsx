import { Box } from '@mantine/core';

import { PreviewFrame } from './preview/preview-frame';

export type PreviewToolProps = {
  //
};

export const PreviewTool = () => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <PreviewFrame />
    </Box>
  );
};
