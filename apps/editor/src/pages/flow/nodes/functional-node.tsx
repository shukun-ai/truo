import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';
import { Handle, Position } from 'reactflow';

import { FlowNode } from '../interface/element';

export const FunctionalNode: LegacyFunctionComponent<FlowNode> = ({ data }) => {
  const { eventName, event, eventSchema, eventUI } = data;
  const { width, height, backgroundColor, fontColor } = eventUI;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width,
        height,
        backgroundColor,
        color: fontColor,
        borderRadius: width / 2,
        cursor: 'default',
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
