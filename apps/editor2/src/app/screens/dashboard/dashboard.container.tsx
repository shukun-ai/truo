import { Box, Text } from '@mantine/core';

import { DashboardLayout } from '../dashboard-layout/dashboard-layout';

import { PresenterSection } from './components/presenter-section';

export const DashboardContainer = () => {
  return (
    <DashboardLayout>
      <Box>
        <Text>应用列表</Text>
      </Box>
      <Box>
        <PresenterSection />
      </Box>
    </DashboardLayout>
  );
};
