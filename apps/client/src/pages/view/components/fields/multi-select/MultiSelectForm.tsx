import { Form, Checkbox } from 'antd';
import React, { FunctionComponent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { LABEL_ALIGN, LABEL_SPAN } from '../constant';
import { InputFieldProps } from '../interfaces';

export const MultiSelectForm: FunctionComponent<InputFieldProps> = ({
  label,
  electronName,
  electronOptions,
  required,
  disabled,
  tip,
}) => {
  const { t } = useTranslation();

  const options = useMemo(() => {
    return electronOptions?.map((item) => ({
      value: item.key,
      label: item.label,
    }));
  }, [electronOptions]);

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
      <Checkbox.Group options={options} disabled={disabled} />
    </Form.Item>
  );
};
