import { Box, Container, Header, Text, rem } from '@mantine/core';
import { ShukunBrand } from '@shukun/component';
import { useObservableState } from 'observable-hooks';

import { useAppContext } from '../../contexts/app-context';
import { Avatar } from '../avatar/avatar';
import { SignIn } from '../sign-in/sign-in';

export type DashboardLayoutProps = {
  children: JSX.Element[];
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
              <Text sx={{ marginLeft: rem(8) }}>开发平台</Text>
            </Box>

            <Avatar />
          </Box>
        </Container>
      </Header>
      <Container fluid>{children}</Container>
    </Box>
  );
};
