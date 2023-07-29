import { Box } from '@mantine/core';
import { ReactNode } from 'react';

export type OverflowAreaProps = {
  x?: 'auto' | 'clip' | 'hidden' | 'scroll' | 'visible';
  y?: 'auto' | 'clip' | 'hidden' | 'scroll' | 'visible';
  children: ReactNode;
};

export const OverflowArea = ({ x, y, children }: OverflowAreaProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        overflowX: x,
        overflowY: y,
      }}
    >
      {children}
    </Box>
  );
};
