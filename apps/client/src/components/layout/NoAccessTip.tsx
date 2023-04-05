import { StopOutlined } from '@ant-design/icons';
import { LegacyFunctionComponent } from '@shukun/component';
import { Card, Result } from 'antd';
import React, { FunctionComponent } from 'react';

export interface NoAccessTipProps {
  title: string;
  message: string;
  description: string;
}

export const NoAccessTip: LegacyFunctionComponent<NoAccessTipProps> = ({
  title,
  message,
  description,
}) => {
  return (
    <Card title={title} bordered={false}>
      <Result icon={<StopOutlined />} title={message} subTitle={description} />
    </Card>
  );
};
