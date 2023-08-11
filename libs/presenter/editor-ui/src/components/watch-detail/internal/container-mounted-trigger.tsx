import { ActionIcon, Button, Group, Text } from '@mantine/core';

import { PresenterWatch } from '@shukun/schema';
import {
  IconCircleCheckFilled,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';

export type ContainerMountedTriggerProps = {
  value: PresenterWatch['triggers']['containerMounted'];
  onChange: (newValue: PresenterWatch['triggers']['containerMounted']) => void;
};

export const ContainerMountedTrigger = ({
  value,
  onChange,
}: ContainerMountedTriggerProps) => {
  return (
    <Group>
      <Text fw="500">容器挂载时触发</Text>
      {value !== undefined && (
        <ActionIcon
          color="green"
          radius="xl"
          variant="transparent"
          sx={{ marginRight: 20, cursor: 'default' }}
        >
          <IconCircleCheckFilled />
        </ActionIcon>
      )}
      {value !== undefined && (
        <Button
          leftIcon={<IconTrash size="0.9rem" />}
          size="sm"
          variant="light"
          onClick={() => {
            onChange(undefined);
          }}
        >
          取消
        </Button>
      )}
      {value === undefined && (
        <Button
          leftIcon={<IconPlus size="0.9rem" />}
          size="sm"
          variant="light"
          onClick={() => {
            onChange(true);
          }}
        >
          激活触发该条件
        </Button>
      )}
    </Group>
  );
};
