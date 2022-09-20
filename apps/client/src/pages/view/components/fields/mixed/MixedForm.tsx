import { Button, Form, FormInstance, Input, Space } from 'antd';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { UnknownMetadataModel } from '../../../../../models/metadata';

import { LABEL_ALIGN, LABEL_SPAN } from '../constant';
import { InputFieldProps } from '../interfaces';

export interface MixedInputProps extends InputFieldProps {
  form: FormInstance<UnknownMetadataModel>;
}

export const MixedForm: FunctionComponent<MixedInputProps> = ({
  label,
  electronName,
  required,
  disabled,
  tip,
  form,
}) => {
  const { t } = useTranslation();

  const [value, setValue] = useState<string>('');

  const [cache, setCache] = useState<string>('');

  const [editable, setEditable] = useState(false);

  const handleEditing = useCallback(() => {
    setEditable(true);
  }, []);

  const handleSubmit = useCallback(() => {
    try {
      const savedValue = JSON.parse(value);
      form.setFieldsValue({ [electronName]: savedValue });
      setCache(value);
      setEditable(false);
    } catch {
      alert('未符合 JSON 格式，请重新编辑。');
    }
  }, [electronName, form, value]);

  const handleCancel = useCallback(() => {
    setValue(cache);
    setEditable(false);
  }, [cache]);

  const handleChange = useCallback((event) => {
    const newValue = event.target.value;
    setValue(newValue);
  }, []);

  useEffect(() => {
    const value = form.getFieldValue(electronName);
    const strings = JSON.stringify(value);
    setValue(strings);
    setCache(strings);
  }, [electronName, form]);

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
      <div>
        <Input.TextArea
          disabled={disabled || !editable}
          value={value}
          onChange={handleChange}
        />
        {!disabled && (
          <Space>
            {!editable && <Button onClick={handleEditing}>编辑</Button>}
            {editable && <Button onClick={handleSubmit}>确定</Button>}
            {editable && <Button onClick={handleCancel}>取消</Button>}
          </Space>
        )}
      </div>
    </Form.Item>
  );
};
