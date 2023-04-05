import { LegacyFunctionComponent } from '@shukun/component';
import { Form, Input } from 'antd';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { LABEL_ALIGN, LABEL_SPAN } from '../constant';
import { InputFieldProps } from '../interfaces';

import { AttachmentList } from './AttachmentList';
import { AttachmentUpload } from './AttachmentUpload';

export const AttachmentForm: LegacyFunctionComponent<InputFieldProps> = ({
  label,
  electronName,
  attachmentOptions,
  required,
  disabled,
  tip,
}) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      label={label}
      shouldUpdate
      required={required}
      rules={[{ required }]}
      labelAlign={LABEL_ALIGN}
      labelCol={{ span: LABEL_SPAN }}
      tooltip={tip}
    >
      {(form) => {
        const value = form.getFieldValue(electronName);
        return (
          <>
            <div style={{ marginBottom: 16 }}>
              <AttachmentUpload
                form={form as any}
                name={electronName}
                disabled={disabled}
                value={form.getFieldValue(electronName)}
                limitUpload={attachmentOptions?.limitUpload || 1}
              />
            </div>
            <Form.Item
              name={electronName}
              initialValue={undefined}
              required={required}
              rules={[
                { required, message: t('fields.requiredError', { label }) },
              ]}
              noStyle
            >
              <Input hidden />
            </Form.Item>
            <AttachmentList
              value={value}
              onRemove={(value) =>
                form.setFieldsValue({ [electronName]: value })
              }
            />
            {/* @todo should show error validation rule. */}
          </>
        );
      }}
    </Form.Item>
  );
};
