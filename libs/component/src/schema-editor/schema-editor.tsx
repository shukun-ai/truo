import {
  ActionIcon,
  Box,
  Group,
  Select,
  TextInput,
  Tooltip,
} from '@mantine/core';

import { Icon } from '../domain-icons/domain-icons';

import { VariableSchema, VariableSchemaTypeName } from './variable-schema';

export type SchemaEditorProps = {
  value: VariableSchema;
  onChange: (newValue: VariableSchema | null) => void;
  fieldName?: string;
  filedLevel?: number;
  isItemField?: true;
};

export const SchemaEditor = ({
  value,
  onChange,
  fieldName,
  filedLevel = 0,
  isItemField,
}: SchemaEditorProps) => {
  const fields = value;

  return (
    <Box>
      <Group mb="md">
        <TextInput
          value={filedLevel === 0 ? '根节点' : fieldName}
          disabled={filedLevel === 0 || isItemField}
        />
        <Select
          value={fields.type}
          data={fieldTypeOptions}
          onChange={(newValue) => {
            onChange({
              ...value,
              type: (newValue ?? undefined) as VariableSchemaTypeName,
            });
          }}
        />
        {fields.type === 'object' && (
          <Tooltip label="点击新建子属性">
            <ActionIcon
              onClick={() => {
                onChange({
                  ...value,
                  properties: {
                    untitle: {},
                  },
                });
              }}
            >
              <Icon type="plus" size="0.8rem" />
            </ActionIcon>
          </Tooltip>
        )}
        {!isItemField && (
          <Tooltip label="点击删除属性">
            <ActionIcon
              onClick={() => {
                onChange(null);
              }}
            >
              <Icon type="trash" size="0.8rem" />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
      {fields.type === 'object' && fields.properties && (
        <Box pl="lg">
          {Object.entries(fields.properties).map(
            ([nextFieldName, nextSchema]) => (
              <SchemaEditor
                value={nextSchema}
                onChange={(newValue) => {
                  if (newValue) {
                    onChange({
                      ...value,
                      properties: {
                        [nextFieldName]: newValue,
                      },
                    });
                  } else {
                    const cloned = structuredClone(value);
                    if (cloned.properties) {
                      delete cloned.properties[nextFieldName];
                      onChange(cloned);
                    }
                  }
                }}
                fieldName={nextFieldName}
                filedLevel={filedLevel + 1}
              />
            ),
          )}
        </Box>
      )}
      {fields.type === 'array' && (
        <Box pl="lg">
          <SchemaEditor
            value={fields.items ?? {}}
            onChange={(newValue) => {
              if (newValue) {
                onChange({
                  ...value,
                  items: newValue,
                });
              }
            }}
            fieldName={'数组子项'}
            filedLevel={filedLevel + 1}
            isItemField
          />
        </Box>
      )}
    </Box>
  );
};

const fieldTypeOptions = [
  { label: '字符串（string）', value: 'string' },
  { label: '数字（number）', value: 'number' },
  { label: '整数（integer）', value: 'integer' },
  { label: '布尔（boolean）', value: 'boolean' },
  { label: '对象（object）', value: 'object' },
  { label: '数组（array）', value: 'array' },
  { label: '空值（null）', value: 'null' },
];
