import { Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React, {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useMemo,
} from 'react';

import {
  ExtractFormItem,
  ExtractFormItemProps,
} from '../../../../../components/form/ExtractFormItem';

import { FilterFieldProps } from '../interfaces';

export type TextFilterInputValue = { $like: string };

export const TextFilter: FunctionComponent<FilterFieldProps> = ({
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

export const TextFilterInput: FunctionComponent<
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
          : null,
      );
    },
    [onChange],
  );

  return <Input id={id} value={stringValue} onChange={handleChange} />;
};
