import React, { FunctionComponent } from 'react';
import { Handle, Position } from 'reactflow';

import { PADDING, RADIUS } from '../flow-constant';

import { FlowNode } from '../interface/element';

import { EventNodeForm } from './event-node-form';
import { EventNodeFormItem } from './event-node-form-item';
import { EventNodeInsert } from './event-node-insert';

export const EventNode: FunctionComponent<FlowNode> = ({ data }) => {
  const { eventName, event, eventSchema, eventUI } = data;
  const { width, height, backgroundColor, fontColor } = eventUI;

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
        <div>
          {event.type}: {eventName}
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
      <EventNodeInsert event={event} />
    </div>
  );
};
