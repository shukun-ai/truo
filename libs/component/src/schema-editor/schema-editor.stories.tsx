import { VariableSchema } from '@shukun/schema';
import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { SchemaEditor } from './schema-editor';

const SchemaEditorExample = () => {
  const [schema, updateSchema] = useState<VariableSchema>({
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      groups: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            groupId: { type: 'string' },
          },
        },
      },
      isPublished: { type: 'boolean' },
      tags: { type: 'string', enum: ['a', 'b', 'c'] },
    },
  });

  return (
    <SchemaEditor
      value={schema}
      onChange={(newValue) => {
        if (newValue) {
          updateSchema(newValue);
        }
      }}
    />
  );
};

const meta: Meta<typeof SchemaEditorExample> = {
  component: SchemaEditorExample,
};

export default meta;

type Story = StoryObj<typeof SchemaEditorExample>;

export const Primary: Story = {
  render: () => {
    return <SchemaEditorExample />;
  },
};
