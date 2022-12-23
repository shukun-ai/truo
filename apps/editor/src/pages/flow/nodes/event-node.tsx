import React, { FunctionComponent } from 'react';
import { Handle, Position } from 'reactflow';

import { PADDING, RADIUS } from '../flow-constant';

import { FlowNode } from '../interface/element';

import { EventNodeAction } from './event-node-action';

import { EventNodeForm } from './event-node-form';
import { EventNodeFormItem } from './event-node-form-item';
import { EventNodeInsert } from './event-node-insert';

export const EventNode: FunctionComponent<FlowNode> = ({ data }) => {
  const { eventName, event, eventSchema, eventUI } = data;
  const { width, height, backgroundColor, fontColor } = eventUI;

  if (!eventName || !event || !eventSchema) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width,
        height,
        background: '#3D4454',
        borderRadius: RADIUS,
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      <Handle type="target" position={Position.Left} />
      <div
        style={{
          height: 32,
          backgroundColor,
          color: fontColor,
          borderTopLeftRadius: RADIUS,
          borderTopRightRadius: RADIUS,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: PADDING,
          paddingRight: PADDING,
        }}
      >
        <div style={{ flex: 1 }}>
          {event.type}: {eventName}
        </div>
        <div>
          <EventNodeAction eventName={eventName} event={event} />
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: PADDING, paddingRight: 28 }}>
          <EventNodeForm initialValues={event}>
            <EventNodeFormItem eventSchema={eventSchema} />
          </EventNodeForm>
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
      <EventNodeInsert eventName={eventName} event={event} />
    </div>
  );
};
