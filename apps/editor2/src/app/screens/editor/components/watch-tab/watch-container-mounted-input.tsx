import { ActionIcon, Box, Button } from '@mantine/core';

import {
  IconCircleCheckFilled,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';

import { useWatchFormContext } from './watch-context';

export type WatchContainerMountedInputProps = {
  //
};

export const WatchContainerMountedInput = () => {
  const form = useWatchFormContext();
  const formProps = form.getInputProps('triggers.containerMounted');

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: 150, marginRight: 20 }}>容器挂载时触发</Box>
      {formProps.value !== undefined && (
        <ActionIcon
          color="green"
          radius="xl"
          variant="transparent"
          sx={{ marginRight: 20, cursor: 'default' }}
        >
          <IconCircleCheckFilled />
        </ActionIcon>
      )}
      {formProps.value !== undefined && (
        <Button
          leftIcon={<IconTrash size="0.9rem" />}
          size="sm"
          variant="light"
          onClick={() => {
            formProps.onChange(undefined);
          }}
        >
          取消
        </Button>
      )}
      {formProps.value === undefined && (
        <Button
          leftIcon={<IconPlus size="0.9rem" />}
          size="sm"
          variant="light"
          onClick={() => {
            formProps.onChange(true);
          }}
        >
          激活触发该条件
        </Button>
      )}
    </Box>
  );
};
