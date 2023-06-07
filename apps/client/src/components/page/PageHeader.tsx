import { LegacyFunctionComponent } from '@shukun/component';
import { Typography } from 'antd';
import React, { FunctionComponent } from 'react';

export interface PageHeaderProps {
  label: string;
}

export const PageHeader: LegacyFunctionComponent<PageHeaderProps> = ({
  label,
}) => {
  return (
    <div
      style={{
        background: '#fff',
        paddingLeft: 24,
        paddingTop: 12,
        paddingRight: 24,
      }}
    >
      <Typography.Title
        level={3}
        style={{
          margin: 0,
          padding: 0,
          color: 'rgb(30, 41, 59)',
          fontWeight: 400,
        }}
      >
        {label}
      </Typography.Title>
    </div>
  );
};
