import { ActionIcon, Box, Group, Select, TextInput } from '@mantine/core';

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
          value={filedLevel === 0 ? 'ROOT' : fieldName}
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
        )}
        {!isItemField && (
          <ActionIcon
            onClick={() => {
              onChange(null);
            }}
          >
            <Icon type="trash" size="0.8rem" />
          </ActionIcon>
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
            fieldName={'item'}
            filedLevel={filedLevel + 1}
            isItemField
          />
        </Box>
      )}
    </Box>
  );
};

const fieldTypeOptions = [
  { label: 'string', value: 'string' },
  { label: 'number', value: 'number' },
  { label: 'integer', value: 'integer' },
  { label: 'boolean', value: 'boolean' },
  { label: 'object', value: 'object' },
  { label: 'array', value: 'array' },
  { label: 'null', value: 'null' },
];
