import { Container, Grid } from '@mantine/core';

import { PresenterSection } from './components/presenter-section';
import { SideBar } from './components/side-bar';

export const DashboardContainer = () => {
  return (
    <Container>
      <Grid>
        <Grid.Col span={3}>
          <SideBar />
        </Grid.Col>
        <Grid.Col span={9}>
          <PresenterSection />
        </Grid.Col>
      </Grid>
    </Container>
  );
};
