import { Box } from '@mantine/core';

import { ReactNode } from 'react';

import { OverflowArea } from '../../../../../components/overflow-area/overflow-area';

export type ScrollAreaProps = {
  children: ReactNode;
};

export const ScrollArea = ({ children }: ScrollAreaProps) => {
  return (
    <Box>
      <OverflowArea x="scroll" y="scroll">
        <Box pl={4} pr={4}>
          {children}
        </Box>
      </OverflowArea>
    </Box>
  );
};
