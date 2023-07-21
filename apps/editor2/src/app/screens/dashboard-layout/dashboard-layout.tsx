import { Badge, Box, Container, Header, Text } from '@mantine/core';
import { ShukunBrand } from '@shukun/component';

import { ReactNode } from 'react';

import { Avatar } from '../avatar/avatar';

export type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Box>
      <Header height={50} mb={20}>
        <Container fluid sx={{ height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ShukunBrand />
              <Text ml={8} mr={8}>
                开发平台
              </Text>
              <Badge
                variant="gradient"
                gradient={{ from: 'orange', to: 'red' }}
              >
                Beta
              </Badge>
            </Box>

            <Avatar />
          </Box>
        </Container>
      </Header>
      {children}
    </Box>
  );
};
