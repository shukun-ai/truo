import { ActionIcon, Box, Button, JsonInput } from '@mantine/core';
import { PresenterWatch } from '@shukun/schema';

import {
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';

import { useEffect, useState } from 'react';

import { z } from 'zod';

export type StateChangedTriggerProps = {
  value: PresenterWatch['triggers']['stateChanged'];
  onChange: (newValue: PresenterWatch['triggers']['stateChanged']) => void;
};

export const StateChangedTrigger = ({
  value,
  onChange,
}: StateChangedTriggerProps) => {
  const [cache, setCache] = useState<string>('');
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (value) {
      setCache(JSON.stringify(value));
    }
  }, [value]);

  useEffect(() => {
    let value: string[][] | undefined;
    try {
      value = JSON.parse(cache);
      pathSchema.parse(value);
      setValid(true);
    } catch {
      setValid(false);
    }
    value && onChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cache]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: 150, marginRight: 20 }}>数据仓库状态监听</Box>
      {value !== undefined && (
        <JsonInput
          placeholder="Interval"
          sx={{ marginRight: 20 }}
          value={cache}
          onChange={(value) => setCache(value)}
        />
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
          删除
        </Button>
      )}
      {value === undefined && (
        <Button
          leftIcon={<IconPlus size="0.9rem" />}
          size="sm"
          variant="light"
          onClick={() => {
            onChange([[]]);
          }}
        >
          激活触发该条件
        </Button>
      )}

      {value !== undefined && (
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
