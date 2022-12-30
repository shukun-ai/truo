import React, { FunctionComponent } from 'react';
import { Handle, Position } from 'reactflow';

import { PADDING, RADIUS } from '../flow-constant';

import { FlowNode } from '../interface/element';

import { EventNodeAction } from './event-node-action';
import { EventNodeDescription } from './event-node-description';

import { EventNodeForm } from './event-node-form';
import { EventNodeFormItem } from './event-node-form-item';

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
      <Handle type="target" position={Position.Top} />
      <div
        style={{
          height: 36,
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
          <div style={{ fontSize: 14, fontWeight: 'bold' }}>{eventName}</div>
          <div style={{ fontSize: 10, marginTop: -5 }}>{event.type}</div>
        </div>
        <div>
          <EventNodeAction eventName={eventName} event={event} />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
