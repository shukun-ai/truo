import { Form, Input } from 'antd';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { DetailMode } from '../../../../../services/detail';
import { LABEL_ALIGN, LABEL_SPAN } from '../constant';
import { InputFieldProps } from '../interfaces';

export interface PasswordFormProps extends InputFieldProps {
  mode: DetailMode;
}

export const PasswordForm: FunctionComponent<PasswordFormProps> = ({
  label,
  electronName,
  required,
  disabled,
  mode,
  tip,
}) => {
  const { t } = useTranslation();

  if (mode === DetailMode.Create) {
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
        <Input.Password disabled={disabled} />
      </Form.Item>
    );
  }

  if (mode === DetailMode.Edit) {
    // @todo add a button which can be clicked to call a modal to change password.
    return <></>;
  }

  return <></>;
};
