import { Box, Button, NumberInput, Text } from '@mantine/core';

import { PresenterWatch } from '@shukun/schema';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { formatDuration } from 'date-fns';

import { useMemo } from 'react';

export type IntervalTriggerProps = {
  value: PresenterWatch['triggers']['interval'];
  onChange: (newValue: PresenterWatch['triggers']['interval']) => void;
};

export const IntervalTrigger = ({ value, onChange }: IntervalTriggerProps) => {
  const humanDuration = useMemo(() => {
    if (!value) {
      return '';
    }
    if (value <= 60000) {
      return formatDuration({ seconds: value / 1000 });
    } else {
      const milliseconds = value % 60000;
      const minutes = value - milliseconds;
      return formatDuration({
        minutes: minutes / 60000,
        seconds: milliseconds / 1000,
      });
    }
  }, [value]);

  // TODO add hours, minutes, seconds input for enhancement
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: 150, marginRight: 20 }}>定时器 (毫秒)</Box>
      {value !== undefined && (
        <NumberInput
          placeholder="Interval"
          step={1}
          sx={{ marginRight: 20 }}
          value={value}
          onChange={(newValue) => {
            onChange(newValue === '' ? undefined : newValue);
          }}
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
            onChange(60000);
          }}
        >
          激活触发该条件
        </Button>
      )}
      <Text sx={{ marginLeft: 20 }}>{humanDuration}</Text>
    </Box>
  );
};
