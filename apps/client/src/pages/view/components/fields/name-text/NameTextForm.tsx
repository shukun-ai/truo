import { Form, Input } from 'antd';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { nameTextValidator } from '../../../../../utils/ant-design';
import { LABEL_ALIGN, LABEL_SPAN } from '../constant';
import { InputFieldProps } from '../interfaces';

export const NameTextForm: FunctionComponent<InputFieldProps> = ({
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
        { validator: nameTextValidator },
      ]}
      labelAlign={LABEL_ALIGN}
      labelCol={{ span: LABEL_SPAN }}
      tooltip={tip}
    >
      <Input disabled={disabled} />
    </Form.Item>
  );
};
