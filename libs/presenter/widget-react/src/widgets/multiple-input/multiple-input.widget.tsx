import { Box, CloseButton, Table, Text, TextInput } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import {
  multipleInputDefinition,
  MultipleInputDefinitionProps,
} from '@shukun/presenter/definition';
import { useMemo, useCallback } from 'react';

import { createWidget } from '../../abstracts/create-widget';
import { extractValue, useFormContext } from '../../shares/form-context';
import { extractBase } from '../../shares/inheritance';
import { numberToRem } from '../../shares/rem';

export const MultipleInputWidget = createWidget<MultipleInputDefinitionProps>(
  multipleInputDefinition,
  (props) => {
    const form = useFormContext();

    const [cacheValue, setCacheValue] = useInputState('');

    const value = useMemo(() => {
      const value = extractValue(props, form);
      return Array.isArray(value) ? value : [];
    }, [form, props]);

    const insertValue = useCallback(
      (insertedValue: string) => {
        if (props.name) {
          const value = extractValue(props, form);
          form.setFieldValue(
            props.name,
            afterInsertValue(value, insertedValue),
          );
        }
      },
      [form, props],
    );

    const removeValue = useCallback(
      (removedValue: string) => {
        if (props.name) {
          const value = extractValue(props, form);
          form.setFieldValue(props.name, afterRemoveValue(value, removedValue));
        }
      },
      [form, props],
    );

    return (
      <Box {...extractBase(props)}>
        <TextInput
          label={props.label}
          description={props.helper}
          placeholder={props.placeholder}
          disabled={props.disabled}
          mb={numberToRem(1)}
          value={cacheValue}
          onChange={setCacheValue}
          onKeyUp={(event) => {
            const value = event.currentTarget.value;
            if ((event.key === 'Enter' || event.key === 'F9') && value) {
              setCacheValue('');
              insertValue(value);
            }
          }}
          onKeyPress={(event) => {
            // @remark Prevent submit the form on Enter.
            event.key === 'Enter' && event.preventDefault();
          }}
        />
        <Table striped withBorder verticalSpacing="xs" cellSpacing="sm">
          <thead>
            <tr>
              <th style={{ width: numberToRem(4), textAlign: 'right' }}>
                编号
              </th>
              <th>编码</th>
              <th style={{ width: numberToRem(4) }}></th>
            </tr>
          </thead>
          <tbody>
            {(!value || value.length === 0) && (
              <tr>
                <td></td>
                <td colSpan={2}>
                  <Text>暂无输入编码</Text>
                </td>
              </tr>
            )}
            {value?.map((item, index) => (
              <tr key={item}>
                <td style={{ textAlign: 'right' }}>{index + 1}</td>
                <td>
                  <Text fw={600}>{item}</Text>
                </td>
                <td>
                  <CloseButton onClick={() => removeValue(item)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    );
  },
);

const afterInsertValue = (value: unknown, insertedValue: string) => {
  if (Array.isArray(value)) {
    const set = new Set(value);
    set.add(insertedValue);
    return [...set];
  } else {
    return [insertedValue];
  }
};

const afterRemoveValue = (value: unknown, removedValue: string) => {
  if (Array.isArray(value)) {
    const set = new Set(value);
    set.delete(removedValue);
    return [...set];
  } else {
    return [];
  }
};
