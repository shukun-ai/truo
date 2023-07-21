import { Container, Grid } from '@mantine/core';

import { Outlet } from 'react-router-dom';

import { Layout } from './dashboard/layout';
import { SideBar } from './dashboard/side-bar';

export const Dashboard = () => {
  return (
    <Layout>
      <Container>
        <Grid>
          <Grid.Col span={3}>
            <SideBar />
          </Grid.Col>
          <Grid.Col span={9}>
            <Outlet />
          </Grid.Col>
        </Grid>
      </Container>
    </Layout>
  );
};
