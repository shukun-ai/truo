import { Box, Container, Header, Text, rem } from '@mantine/core';
import { ShukunBrand } from '@shukun/component';

export type DashboardLayoutProps = {
  children: JSX.Element[];
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Box>
      <Header height={50} mb={20}>
        <Container fluid sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ShukunBrand />
              <Text sx={{ marginLeft: rem(8) }}>开发平台</Text>
            </Box>
          </Box>
        </Container>
      </Header>
      <Container fluid>{children}</Container>
    </Box>
  );
};
