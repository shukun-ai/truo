import { FlowEvent } from '@shukun/schema';
import { Button, Form, Input, Select } from 'antd';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import { flowUICommand } from '../../services/flow-ui';

export interface FlowInsertFormDataValue {
  name: string;
  type: FlowEvent['type'];
}

export interface FlowInsertFormProps {}

export const FlowInsertForm: FunctionComponent<FlowInsertFormProps> = () => {
  const options = useMemo<{ label: string; value: string }[]>(() => {
    const types: NonNullable<FlowEvent['type']>[] = [
      'Success',
      'Fail',
      'SourceQuery',
      'SourceCreate',
      'SourceUpdate',
      'SourceDelete',
      'SourceAddToMany',
      'SourceRemoveFromMany',
      'SourceIncrease',
      'Choice',
      'Repeat',
      'Parallel',
      'Store',
      'FirstOrThrow',
      'LastOrThrow',
    ];
    return types.map((value) => ({ label: value, value }));
  }, []);

  const handleFinish = useCallback((values: FlowInsertFormDataValue) => {
    flowUICommand.insertEditingForm(values.name, values.type);
    flowUICommand.closeInsertModal();
  }, []);

  return (
    <Form<FlowInsertFormDataValue> layout="vertical" onFinish={handleFinish}>
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Type" name="type">
        <Select options={options} />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Insert
      </Button>
    </Form>
  );
};
