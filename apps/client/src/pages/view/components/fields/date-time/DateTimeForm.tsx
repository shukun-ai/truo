import { Form } from 'antd';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { LABEL_ALIGN, LABEL_SPAN } from '../constant';
import { InputFieldProps } from '../interfaces';

import { DateTimeInput } from './DateTimeInput';

export const DateTimeForm: FunctionComponent<InputFieldProps> = ({
  label,
  electronName,
  required,
  disabled,
  tip,
}) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      label={label}
      name={electronName}
      rules={[
        {
          required,
          message: t('fields.requiredError', { label }),
        },
      ]}
      labelAlign={LABEL_ALIGN}
      labelCol={{ span: LABEL_SPAN }}
      tooltip={tip}
    >
      <DateTimeInput showTime disabled={disabled} style={{ width: '100%' }} />
    </Form.Item>
  );
};
