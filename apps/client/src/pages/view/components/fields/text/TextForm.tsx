import { LegacyFunctionComponent } from '@shukun/component';
import { UnknownSourceModel } from '@shukun/schema';
import { Form, FormInstance, Input } from 'antd';
import React, {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';

import { LABEL_ALIGN, LABEL_SPAN } from '../constant';
import { InputFieldProps } from '../interfaces';

export interface TextFormProps extends InputFieldProps {
  form: FormInstance<UnknownSourceModel>;
}

export const TextForm: LegacyFunctionComponent<TextFormProps> = ({
  label,
  electronName,
  required,
  disabled,
  tip,
  form,
}) => {
  const { t } = useTranslation();

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const value = event?.target?.value;
      form.setFieldsValue({
        [electronName]: value ? value.trim() : null,
      } as any);
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
