import {
  Alert,
  Card,
  Divider,
  Group,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { Icon } from '@shukun/component';
import { RepositorySchema } from '@shukun/schema';

export type ActionsProps = {
  definition: RepositorySchema;
};

export const Actions = ({ definition }: ActionsProps) => {
  const actions = Object.entries(definition.actions);

  return (
    <Card withBorder mb={8}>
      <Title order={4}>操作</Title>
      <Divider mt={8} mb={8} />

      {actions.length === 0 && (
        <Alert
          title="该数据仓库未提供操作项，您无法编辑或操作该数据仓库"
          icon={<Icon type="info" />}
          mb={8}
          children={null}
        />
      )}

      {actions.map(([actionName, action]) => (
        <Tooltip
          key={actionName}
          label="此处操作仅为查阅手册，请在组件的事件中进行配置和使用"
          position="top-start"
          withArrow
          withinPortal
        >
          <Group>
            <Text fw="bold">{actionName}</Text>
            <Text size="sm" c="gray">
              {action.description}
            </Text>
          </Group>
        </Tooltip>
      ))}
    </Card>
  );
};
