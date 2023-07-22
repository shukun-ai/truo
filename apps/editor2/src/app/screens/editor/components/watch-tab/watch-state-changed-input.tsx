import { ActionIcon, Box, Button, JsonInput } from '@mantine/core';

import {
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';

import { useEffect, useState } from 'react';

import { z } from 'zod';

import { useWatchFormContext } from './watch-context';

export type WatchStateChangedInputProps = {
  //
};

export const WatchStateChangedInput = () => {
  const form = useWatchFormContext();
  const formProps = form.getInputProps('triggers.stateChanged');

  const [cache, setCache] = useState<string>('');
  const [valid, setValid] = useState(true);

  useEffect(() => {
    const stateChanged = form.values.triggers.stateChanged;
    if (stateChanged) {
      setCache(JSON.stringify(stateChanged));
    }
  }, [form.values.triggers.stateChanged]);

  useEffect(() => {
    let value: string[][] | undefined;
    try {
      value = JSON.parse(cache);
      pathSchema.parse(value);
      setValid(true);
    } catch {
      setValid(false);
    }
    value && formProps.onChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cache]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: 150, marginRight: 20 }}>数据仓库状态监听</Box>
      {formProps.value !== undefined && (
        <JsonInput
          placeholder="Interval"
          sx={{ marginRight: 20 }}
          {...formProps}
          value={cache}
          onChange={(value) => setCache(value)}
        />
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
          删除
        </Button>
      )}
      {formProps.value === undefined && (
        <Button
          leftIcon={<IconPlus size="0.9rem" />}
          size="sm"
          variant="light"
          onClick={() => {
            formProps.onChange([[]]);
          }}
        >
          激活触发该条件
        </Button>
      )}

      {formProps.value !== undefined && (
        <ActionIcon
          color={valid ? 'green' : 'red'}
          radius="xl"
          variant="transparent"
          sx={{ marginRight: 20, cursor: 'default' }}
        >
          {valid ? <IconCircleCheckFilled /> : <IconCircleXFilled />}
        </ActionIcon>
      )}
    </Box>
  );
};

const pathSchema = z.array(z.array(z.string()));
