import { FlowEvent } from '@shukun/schema';
import { Button, Form, Input, Select } from 'antd';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import { flowCommand, flowQuery } from '../../../services/flow';

import { flowUICommand } from '../../../services/flow-ui';
import { eventSchemas } from '../flow-event-schemas';

import { createEventDefaultValue, eventTypes } from './flow-insert-helper';

export interface FlowInsertFormDataValue {
  name: string;
  type: FlowEvent['type'];
}

export interface FlowInsertFormProps {}

export const FlowInsertForm: FunctionComponent<FlowInsertFormProps> = () => {
  const options = useMemo<{ label: string; value: string }[]>(() => {
    return eventTypes.map((value) => ({ label: value, value }));
  }, []);

  const handleFinish = useCallback((values: FlowInsertFormDataValue) => {
    const eventSchema = eventSchemas[values.type];
    const eventDefaultValue = createEventDefaultValue(values.type, eventSchema);
    const flow = flowQuery.getCloneFlow('retrieve_receive_tasks');
    flowCommand.insert(flow, values.name, eventDefaultValue);

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
