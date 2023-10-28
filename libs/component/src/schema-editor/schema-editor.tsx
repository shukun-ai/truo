import { ActionIcon, Box, Group, Select, Tooltip } from '@mantine/core';

import { notifications } from '@mantine/notifications';

import { Icon } from '../domain-icons/domain-icons';

import { FieldNameInput } from './internal/field-name-input';
import {
  createProperty,
  removeProperty,
  updateArrayItems,
  updateProperty,
  updatePropertyName,
} from './internal/operators';
import { VariableSchema, VariableSchemaTypeName } from './variable-schema';

export type SchemaEditorProps = {
  value: VariableSchema;
  onChange: (newValue: VariableSchema | null) => void;
  onFieldNameChange?: (newValue: string) => void;
  fieldName?: string;
  filedLevel?: number;
  isItemField?: true;
};

export const SchemaEditor = ({
  value,
  onChange,
  onFieldNameChange = () => undefined,
  fieldName = '根节点',
  filedLevel = 0,
  isItemField,
}: SchemaEditorProps) => {
  const fields = value;

  return (
    <Box>
      <Group mb="md">
        <FieldNameInput
          value={fieldName}
          disabled={filedLevel === 0 || isItemField}
          onChange={onFieldNameChange}
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
                if (value.properties && value.properties['untitle']) {
                  notifications.show({
                    color: 'red',
                    message: '已经创建名为 untitle 的属性，建议先改名后再新建',
                  });
                  return;
                }
                onChange(createProperty(value));
              }}
            >
              <Icon type="plus" size="0.8rem" />
            </ActionIcon>
          </Tooltip>
        )}
        {!isItemField && (
          <Tooltip label="点击删除属性">
            <ActionIcon onClick={() => onChange(removeProperty())}>
              <Icon type="trash" size="0.8rem" />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
      {fields.type === 'object' && fields.properties && (
        <Box pl="lg">
          {Object.entries(fields.properties).map(
            ([currentFieldName, nextSchema]) => (
              <SchemaEditor
                key={currentFieldName}
                value={nextSchema}
                onChange={(newValue) =>
                  onChange(updateProperty(value, newValue, currentFieldName))
                }
                onFieldNameChange={(newValue) => {
                  if (Object.keys(fields.properties ?? {}).includes(newValue)) {
                    notifications.show({
                      message: '新属性名重复，请换一个名称',
                    });
                    return;
                  }
                  onChange(
                    updatePropertyName(value, currentFieldName, newValue),
                  );
                }}
                fieldName={currentFieldName}
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
            onChange={(newItems) => {
              if (newItems) {
                onChange(updateArrayItems(value, newItems));
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
