import { Button, Drawer, Form, Modal } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import { TypeException } from '../../exceptions/type-exception';

import { flowCommand, flowQuery } from '../../services/flow';

import { flowUICommand, flowUIQuery } from '../../services/flow-ui';

import { eventSchemas } from './flow-event-schemas';
import { EventNodeFormItem } from './nodes/event-node-form-item';

export interface FlowEditingModalProps {}

export const FlowEditingModal: FunctionComponent<
  FlowEditingModalProps
> = () => {
  const editingModalVisible = useObservableState(
    flowUIQuery.editingModalVisible$,
    false,
  );

  const editingEvent = useObservableState(flowUIQuery.editingEvent$, null);

  const editingEventName = useObservableState(
    flowUIQuery.editingEventName$,
    null,
  );

  const eventSchema = useMemo(() => {
    if (!editingEvent || !editingEvent.type) {
      return null;
    }

    return eventSchemas[editingEvent.type];
  }, [editingEvent]);

  const handleCancel = useCallback(() => {
    flowUICommand.closeEditingForm();
  }, []);

  const handleFinish = useCallback(
    (values) => {
      if (!editingEventName) {
        throw new TypeException(
          'Did not set editingEventName: {{editingEventName}}',
          { editingEventName },
        );
      }
      if (!editingEvent?.type) {
        throw new TypeException('Did not find editingEvent.');
      }
      const flow = flowQuery.getCloneFlow('retrieve_receive_tasks');
      flowCommand.insert(flow, editingEventName, {
        ...values,
        type: editingEvent.type,
      });
    },
    [editingEvent, editingEventName],
  );

  if (!editingEvent) {
    return null;
  }

  return (
    <Drawer
      forceRender
      destroyOnClose
      title="Insert a new event"
      open={editingModalVisible}
      onClose={handleCancel}
      mask={false}
      footer={null}
      width={600}
    >
      <Form
        initialValues={editingEvent}
        labelCol={{ span: 4 }}
        onFinish={handleFinish}
      >
        {eventSchema && <EventNodeFormItem eventSchema={eventSchema} />}

        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    </Drawer>
  );
};
