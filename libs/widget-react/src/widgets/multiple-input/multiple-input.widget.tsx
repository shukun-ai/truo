import { Box, CloseButton, Table, Text, TextInput } from '@mantine/core';
import {
  multipleInputDefinition,
  MultipleInputDefinitionProps,
} from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';
import { extractBase } from '../../shares/inheritance';
import { numberToRem } from '../../shares/rem';

export const MultipleInputWidget = createWidget<MultipleInputDefinitionProps>(
  multipleInputDefinition,
  (props) => {
    return (
      <Box {...extractBase(props)}>
        <TextInput
          label={props.label}
          description={props.helper}
          placeholder={props.placeholder}
          disabled={props.disabled}
          mb={numberToRem(1)}
        />
        <Table striped withBorder verticalSpacing="xs" cellSpacing="sm">
          <thead>
            <tr>
              <th style={{ width: numberToRem(4), textAlign: 'right' }}>
                编号
              </th>
              <th>编码</th>
              <th style={{ width: numberToRem(2) }}></th>
            </tr>
          </thead>
          <tbody>
            {(!props.value || props.value.length === 0) && (
              <tr>
                <td></td>
                <td colSpan={2}>
                  <Text>暂无输入编码</Text>
                </td>
              </tr>
            )}
            {props.value?.map((item) => (
              <tr>
                <td style={{ textAlign: 'right' }}>1</td>
                <td>
                  <Text fw={600}>{item}</Text>
                </td>
                <td>
                  <CloseButton />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    );
  },
);
