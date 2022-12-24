import { FlowEvent } from '@shukun/schema';
import { Button, Form } from 'antd';
import React, { FunctionComponent, useCallback, useState } from 'react';

import { flowCommand, flowQuery } from '../../../services/flow';

import { PADDING } from '../flow-constant';

import { EventNodeContext } from './event-node-context';
import { EventNodeRemoveButton } from './event-node-remove-button';

export interface EventNodeFormProps {
  eventName: string;
  initialValues: FlowEvent;
}

export const EventNodeForm: FunctionComponent<EventNodeFormProps> = ({
  eventName,
  initialValues,
  children,
}) => {
  const [form] = Form.useForm<FlowEvent>();

  const [editing, setEditing] = useState(false);

  const onEdit = useCallback(() => {
    setEditing(true);
  }, []);

  const onRemove = useCallback(() => {
    const flow = flowQuery.getCloneFlow('retrieve_receive_tasks');
    flowCommand.remove(flow, eventName);
  }, [eventName]);

  const onCancel = useCallback(() => {
    setEditing(false);
    form.resetFields();
  }, [form]);

  const onFinish = (event: FlowEvent) => {
    const flow = flowQuery.getCloneFlow('retrieve_receive_tasks');
    flowCommand.update(flow, eventName, event);
    setEditing(false);
  };

  return (
    <Form<FlowEvent>
      form={form}
      name="basic"
      labelAlign="left"
      labelCol={{ span: 0 }}
      wrapperCol={{ span: 24 }}
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <div style={{ width: '100%', flex: 1, overflow: 'auto' }}>
        <EventNodeContext.Provider value={{ editing }}>
          {children}
        </EventNodeContext.Provider>
      </div>

      <div
        style={{
          paddingLeft: PADDING,
          paddingRight: PADDING,
          paddingBottom: PADDING,
        }}
      >
        {!editing && (
          <Button type="primary" onClick={onEdit}>
            Edit
          </Button>
        )}
        {!editing && (
          <EventNodeRemoveButton onClick={onRemove}>
            Remove
          </EventNodeRemoveButton>
        )}
        {editing && (
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        )}
        {editing && (
          <Button type="text" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </Form>
  );
};
