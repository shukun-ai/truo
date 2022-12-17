import Color from 'color';
import React, { FunctionComponent } from 'react';
import { Handle, Position } from 'reactflow';

export interface BaseNodeProps {
  title: string;
  backgroundColor: string;
  width: number;
  height: number;
}

export const BaseNode: FunctionComponent<BaseNodeProps> = ({
  title,
  backgroundColor,
  width,
  height,
  children,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width,
        height,
        background: '#fff',
        border: 'solid 1px #ccc',
        borderRadius: 10,
      }}
    >
      <Handle type="target" position={Position.Left} />
      <div
        style={{
          height: 32,
          backgroundColor,
          color: Color(backgroundColor).negate().hex(),
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        {title}
      </div>
      <div>{children}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
