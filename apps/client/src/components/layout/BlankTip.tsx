import { SmileOutlined } from '@ant-design/icons';
import { LegacyFunctionComponent } from '@shukun/component';
import { Card, Result } from 'antd';
import React, { FunctionComponent } from 'react';

export interface BlankTipProps {
  title: string;
  message: string;
  description: string;
}

export const BlankTip: LegacyFunctionComponent<BlankTipProps> = ({
  title,
  message,
  description,
}) => {
  return (
    <Card title={title} bordered={false}>
      <Result icon={<SmileOutlined />} title={message} subTitle={description} />
    </Card>
  );
};
