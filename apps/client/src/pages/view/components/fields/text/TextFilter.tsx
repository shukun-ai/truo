import { ExtractFormItem, ExtractFormItemProps } from '@shukun/component';
import { LegacyFunctionComponent } from '@shukun/component';
import { Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React, {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useMemo,
} from 'react';

import { FilterFieldProps } from '../interfaces';

export type TextFilterInputValue = { $like: string };

export const TextFilter: LegacyFunctionComponent<FilterFieldProps> = ({
  label,
  electronName,
  tip,
}) => {
  return (
    <FormItem label={label} name={electronName} tooltip={tip}>
      <ExtractFormItem<TextFilterInputValue>>
        {({ value, onChange, id }) => (
          <TextFilterInput id={id} value={value} onChange={onChange} />
        )}
      </ExtractFormItem>
    </FormItem>
  );
};

export const TextFilterInput: LegacyFunctionComponent<
  ExtractFormItemProps<TextFilterInputValue>
> = ({ id, value, onChange }) => {
  const stringValue = useMemo(() => {
    if (!value) {
      return '';
    }
    return value.$like;
  }, [value]);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const value = event.target.value;

      onChange(
        value
          ? {
              $like: value,
            }
          : undefined,
      );
    },
    [onChange],
  );

  return <Input id={id} value={stringValue} onChange={handleChange} />;
};
