import React, { FunctionComponent } from 'react';
import { Handle, Position } from 'reactflow';

import { PADDING, RADIUS } from '../flow-constant';

import { FlowNode } from '../interface/element';

import { EventNodeForm } from './event-node-form';
import { EventNodeFormItem } from './event-node-form-item';

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
        background: '#fff',
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
          paddingLeft: 12,
          paddingRight: 12,
        }}
      >
        <div>
          {event.type}: {eventName}
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: PADDING }}>
          <EventNodeForm initialValues={event}>
            <EventNodeFormItem eventSchema={eventSchema} />
          </EventNodeForm>
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
