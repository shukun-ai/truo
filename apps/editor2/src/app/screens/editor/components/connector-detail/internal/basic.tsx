import { Card, NativeSelect, SelectItem, Text, TextInput } from '@mantine/core';

import { UseFormReturnType } from '@mantine/form';

import { useMemo } from 'react';

import { ConnectorEntity } from '../../../../../../repositories/connector/connector-ref';
import { useConnectorEditorContext } from '../../../../../components/connector-editor/connector-editor-context';

export type BasicProps = {
  form: UseFormReturnType<
    ConnectorEntity,
    (values: ConnectorEntity) => ConnectorEntity
  >;
  disabled?: boolean;
};

export const Basic = ({ form, disabled }: BasicProps) => {
  const { taskOptions } = useConnectorEditorContext();

  const nextOptions = useMemo<SelectItem[]>(() => {
    return [{ label: '未选择下一个任务', value: '' }].concat(taskOptions);
  }, [taskOptions]);

  return (
    <Card withBorder mt={12} mb={6}>
      <Text fz="lg" fw="bold">
        基础设置
      </Text>
      <TextInput
        label="函数流名称"
        {...form.getInputProps('label')}
        disabled={disabled}
      />
      <NativeSelect
        label="开始任务"
        data={nextOptions}
        {...form.getInputProps('start')}
        disabled={disabled}
      />
    </Card>
  );
};
