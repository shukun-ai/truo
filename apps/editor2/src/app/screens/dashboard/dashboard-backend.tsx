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

import { useAppContext } from '../../contexts/app-context';

export const DashboardBackend = () => {
  const metric = useMetric();

  const app = useAppContext();

  useEffect(() => {
    app.repositories.metadataRepository.initialize();
    app.repositories.connectorRepository.initialize();
  }, [
    app.repositories.connectorRepository,
    app.repositories.metadataRepository,
  ]);

  return (
    <Box>
      <Title order={4} mb={24}>
        服务器应用
      </Title>
      <Group position="apart" mb={24}>
        <Group>
          <Button>编辑服务器应用</Button>
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
  const metadataCount = useObservableState(
    app.repositories.metadataRepository.count$,
    0,
  );
  const connectorCount = useObservableState(
    app.repositories.connectorRepository.count$,
    0,
  );

  return [
    {
      label: '数据表',
      count: metadataCount,
      description:
        '定义元数据的表结构，元数据是描述数据的数据，元数据的表结构帮助客户存储数据，组织数据。',
    },
    {
      label: '函数流',
      count: connectorCount,
      description:
        '函数流可调用多种逻辑结构、数昆数据库和其他的外部资源，如电子邮件、支付回调、队列事件等。',
    },
    {
      label: '定时器',
      count: 0,
      description: '设置定时器的方式来触发函数流。',
    },
    {
      label: '接口',
      count: 0,
      description:
        '将部分函数流暴露在公共网络，以接口的形式在多个系统保持统一性。',
    },
  ];
};
