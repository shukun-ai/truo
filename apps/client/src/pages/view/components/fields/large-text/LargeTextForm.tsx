import { Form, Input } from 'antd';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { LABEL_ALIGN, LABEL_SPAN } from '../constant';
import { InputFieldProps } from '../interfaces';

export const LargeTextForm: FunctionComponent<InputFieldProps> = ({
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
      <Input.TextArea disabled={disabled} />
    </Form.Item>
  );
};
