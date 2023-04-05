import { LegacyFunctionComponent } from '@shukun/component';
import { Form } from 'antd';
import React, { FunctionComponent } from 'react';

import { ColumnFieldFactory } from './ColumnFieldFactory';
import { LABEL_ALIGN, LABEL_SPAN } from './constant';
import { ColumnFieldProps } from './interfaces';

export const ShowFieldFactory: LegacyFunctionComponent<ColumnFieldProps> = (
  props,
) => {
  return (
    <Form.Item
      label={props.label}
      labelAlign={LABEL_ALIGN}
      labelCol={{ span: LABEL_SPAN }}
      tooltip={props.tip}
    >
      <ColumnFieldFactory {...props} />
    </Form.Item>
  );
};
