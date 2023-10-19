import { Card, Select, SelectItem, Text, TextInput } from '@mantine/core';

import { useConnectorEditorContext } from '@shukun/component';
import { ConnectorSchema } from '@shukun/schema';
import { useMemo } from 'react';

export type BasicProps = {
  value: ConnectorSchema;
  onChange: (value: ConnectorSchema) => void;
  disabled?: boolean;
};

export const Basic = ({ value, onChange, disabled }: BasicProps) => {
  const { taskOptions } = useConnectorEditorContext();

  const nextOptions = useMemo<SelectItem[]>(() => {
    return [{ label: '未选择下一个任务', value: '' }].concat(taskOptions);
  }, [taskOptions]);

  return (
    <Card withBorder mt={12} mb={6}>
      <Text fz="lg" fw="bold">
        开始
      </Text>
      <TextInput
        label="函数流名称"
        value={value.label}
        onChange={(event) =>
          onChange({
            ...value,
            label: event.target.value,
          })
        }
        disabled={disabled}
        required
      />
      <Select
        label="开始任务"
        data={nextOptions}
        value={value.start}
        onChange={(newValue) =>
          newValue &&
          onChange({
            ...value,
            start: newValue,
          })
        }
        disabled={disabled}
        clearable={false}
        withinPortal
        required
      />
    </Card>
  );
};
