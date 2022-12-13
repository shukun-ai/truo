import { Form, Input } from 'antd';
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

export type ManyToOneFilterInputValue = {
  $foreign?: { [foreignName: string]: { $like: string } };
};

export const ManyToOneFilter: FunctionComponent<FilterFieldProps> = ({
  label,
  electronName,
  electronForeignName,
  tip,
}) => {
  if (!electronForeignName) {
    return null;
  }

  return (
    <Form.Item label={label} name={electronName} tooltip={tip}>
      <ExtractFormItem<ManyToOneFilterInputValue>>
        {({ value, onChange, id }) => (
          <ManyToOneFilterInput
            id={id}
            value={value}
            onChange={onChange}
            electronForeignName={electronForeignName}
          />
        )}
      </ExtractFormItem>
    </Form.Item>
  );
};

export const ManyToOneFilterInput: FunctionComponent<
  ExtractFormItemProps<ManyToOneFilterInputValue> & {
    electronForeignName: string;
  }
> = ({ id, value, onChange, electronForeignName }) => {
  const parsedValue = useMemo(() => {
    if (!value) {
      return undefined;
    } else {
      return value.$foreign?.[electronForeignName]?.$like;
    }
  }, [electronForeignName, value]);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const value = event.target.value;

      onChange(
        value
          ? {
              $foreign: {
                [electronForeignName]: {
                  $like: value,
                },
              },
            }
          : undefined,
      );
    },
    [electronForeignName, onChange],
  );

  return <Input id={id} value={parsedValue} onChange={handleChange} />;
};
