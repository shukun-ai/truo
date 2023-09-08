import { Box, Group, Text, Title } from '@mantine/core';
import { ReactNode } from 'react';

import { InputDescription } from '../input-description/input-description';
import { CommonInputProps } from '../types';

export type SimpleWrapperProps = {
  children: ReactNode;
} & CommonInputProps;

export const SimpleWrapper = ({
  label,
  secondaryLabel,
  description,
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
      <InputDescription description={description} />
    </Box>
  );
};
