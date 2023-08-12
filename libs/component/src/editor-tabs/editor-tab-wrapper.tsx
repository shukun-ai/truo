import { Box, Container } from '@mantine/core';

import { ReactNode } from 'react';

import { OverflowArea } from '../overflow-area/overflow-area';

export type EditorTabWrapperProps = {
  children: ReactNode;
};

export const EditorTabWrapper = ({ children }: EditorTabWrapperProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        minWidth: 0,
        minHeight: 0,
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <OverflowArea y="scroll">
          <Container fluid mt={12} mb={12}>
            {children}
          </Container>
        </OverflowArea>
      </Box>
    </Box>
  );
};
