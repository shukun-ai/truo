import { Box, Text } from '@mantine/core';

import { useEffect } from 'react';

import { DashboardLayout } from '../../components/dashboard-layout/dashboard-layout';

import { PresenterSection } from './components/presenter-section';

export type DashboardContainerProps = {
  //
};

export const DashboardContainer = ({}: DashboardContainerProps) => {
  useEffect(() => {}, []);

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
