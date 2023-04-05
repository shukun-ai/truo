import { LegacyFunctionComponent } from '@shukun/component';
import { Form, Checkbox } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { roles$ } from '../../../../../services/role/query';
import { LABEL_ALIGN, LABEL_SPAN } from '../constant';
import { InputFieldProps } from '../interfaces';

export const RoleForm: LegacyFunctionComponent<InputFieldProps> = ({
  label,
  electronName,
  required,
  disabled,
  tip,
}) => {
  const { t } = useTranslation();

  const roles = useObservableState(roles$);

  const options = useMemo(() => {
    return roles?.map((item) => ({
      value: item.name,
      label: item.label,
    }));
  }, [roles]);

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
