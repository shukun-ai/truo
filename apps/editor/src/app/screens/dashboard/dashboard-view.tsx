import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Text,
  Title,
} from '@mantine/core';

import { useObservableState } from 'observable-hooks';

import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useAppContext } from '../../contexts/app-context';
import { useRouteOrgName } from '../../hooks/use-route-org-name';
import { routerMap } from '../../router-map';

export const DashboardView = () => {
  const metric = useMetric();

  const app = useAppContext();

  useEffect(() => {
    app.repositories.viewRepository.initialize(app.apiRequester);
  }, [app.apiRequester, app.repositories.viewRepository]);

  const routeOrgName = useRouteOrgName();

  return (
    <Box>
      <Title order={4} mb={24}>
        管理台应用
      </Title>
      <Group position="apart" mb={24}>
        <Group>
          <Button
            component={Link}
            to={routerMap.editorView.replace(':orgName', routeOrgName)}
          >
            编辑管理台应用
          </Button>
        </Group>
        <Group>
          <Button variant="white" pl={0} pr={0}>
            导入覆盖
          </Button>
          <Button variant="white" pl={0} pr={0}>
            导出
          </Button>
        </Group>
      </Group>
      <Grid>
        {metric.map((metricItem) => (
          <Grid.Col span={6}>
            <Card withBorder>
              <Group position="apart" align="baseline">
                <Title order={4}>{metricItem.label}</Title>
                <Text fz={36}>{metricItem.count}</Text>
              </Group>
              <Divider mt={4} mb={12} />
              <Text lineClamp={10} size="sm" c="gray">
                {metricItem.description}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};

const useMetric = (): {
  label: string;
  count: number;
  description: string;
}[] => {
  const app = useAppContext();
  const viewCount = useObservableState(
    app.repositories.viewRepository.count$,
    0,
  );

  return [
    {
      label: '视图',
      count: viewCount,
      description: '定义管理台视图，方便客户操作。',
    },
  ];
};
