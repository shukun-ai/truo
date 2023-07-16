import { Box } from '@mantine/core';

import { PreviewFrame } from './preview/preview-frame';

export type PreviewAreaProps = {
  //
};

export const PreviewArea = () => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <PreviewFrame />
    </Box>
  );
};
