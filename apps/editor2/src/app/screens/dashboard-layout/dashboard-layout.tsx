import { Badge, Box, Container, Header, Text, rem } from '@mantine/core';
import { ShukunBrand } from '@shukun/component';
import { useObservableState } from 'observable-hooks';

import { ReactNode } from 'react';

import { useAppContext } from '../../contexts/app-context';
import { Avatar } from '../avatar/avatar';
import { SignIn } from '../sign-in/sign-in';

export type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const app = useAppContext();

  const currentUser = useObservableState(
    app.repositories.authRepository.currentUser$,
    null,
  );

  if (!currentUser) {
    return <SignIn />;
  }

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
      <Container fluid>{children}</Container>
    </Box>
  );
};
