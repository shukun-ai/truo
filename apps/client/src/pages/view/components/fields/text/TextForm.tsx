import { Form, FormInstance, Input } from 'antd';
import React, { FunctionComponent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { UnknownMetadataModel } from '../../../../../models/metadata';

import { LABEL_ALIGN, LABEL_SPAN } from '../constant';
import { InputFieldProps } from '../interfaces';

export interface TextFormProps extends InputFieldProps {
  form: FormInstance<UnknownMetadataModel>;
}

export const TextForm: FunctionComponent<TextFormProps> = ({
  label,
  electronName,
  required,
  disabled,
  tip,
  form,
}) => {
  const { t } = useTranslation();

  const handleChange = useCallback(
    (event) => {
      const value = event?.target?.value;
      form.setFieldsValue({ [electronName]: value ? value.trim() : null });
    },
    [electronName, form],
  );

  return (
    <Form.Item
      label={label}
      name={electronName}
      rules={[
        {
          transform: (value) =>
            typeof value === 'string' ? value.trim() : value,
        },
        {
          required,
          message: t('fields.requiredError', { label }),
        },
      ]}
      labelAlign={LABEL_ALIGN}
      labelCol={{ span: LABEL_SPAN }}
      tooltip={tip}
    >
      <Input disabled={disabled} onChange={handleChange} />
    </Form.Item>
  );
};
