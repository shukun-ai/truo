import { Form, InputNumber } from 'antd';
import React, { FunctionComponent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { LABEL_ALIGN, LABEL_SPAN } from '../constant';
import { InputFieldProps } from '../interfaces';

export const CurrencyForm: FunctionComponent<InputFieldProps> = ({
  label,
  electronName,
  currencyOptions,
  required,
  disabled,
  tip,
}) => {
  const { t } = useTranslation();

  const code = useMemo(() => {
    const code = currencyOptions?.code || 'CNY';
    return ` (${code})`;
  }, [currencyOptions]);

  return (
    <Form.Item
      label={label + code}
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
      <InputNumber
        disabled={disabled}
        precision={currencyOptions?.scale || 4}
        style={{ width: '100%' }}
      />
    </Form.Item>
  );
};
