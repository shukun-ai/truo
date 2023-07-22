import { Header, Container, Group } from '@mantine/core';
import { ShukunBrand } from '@shukun/component';

export type TopBarProps = {
  //
};

export const TopBar = () => {
  return (
    <Header height={42}>
      <Container
        fluid
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <ShukunBrand />
        <Group spacing={5}></Group>
      </Container>
    </Header>
  );
};
