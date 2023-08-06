import { Box, Group, Text, Title } from '@mantine/core';
import { ReactNode } from 'react';

import { CommonInputProps } from '../types';

export type SimpleWrapperProps = {
  children: ReactNode;
} & CommonInputProps;

export const SimpleWrapper = ({
  label,
  secondaryLabel,
  children,
}: SimpleWrapperProps) => {
  return (
    <Box mb={32}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 6,
        }}
      >
        <Group>
          <Title order={5}>{label}</Title>
          {secondaryLabel && (
            <Text size="xs" c="gray">
              {secondaryLabel}
            </Text>
          )}
        </Group>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};
