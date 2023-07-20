import { Badge, Box, Container, Group, Text } from '@mantine/core';
import { ShukunBrand } from '@shukun/component';
import { ReactNode } from 'react';

export type HubProps = {
  children: ReactNode;
};

export const Hub = ({ children }: HubProps) => {
  return (
    <Container size={460} my={30}>
      <Box mb={48}>
        <Group>
          <ShukunBrand />
          开发平台
          <Badge variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
            Beta
          </Badge>
        </Group>
      </Box>

      {children}

      <Box
        sx={{
          position: 'fixed',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Text size="xs" color="gray">
          Copyright © 2023 SHUKUN. All Rights Reserved.
        </Text>
      </Box>
    </Container>
  );
};
