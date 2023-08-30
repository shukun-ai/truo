import { Box } from '@mantine/core';
import { WidgetSchema } from '@shukun/schema';
import { Meta, StoryObj } from '@storybook/react';

import { Icon123 } from '@tabler/icons-react';
import { useState } from 'react';

import { WidgetGalleryInput, WidgetGallery } from './widget-gallery-input';

const WidgetGalleryInputExample = () => {
  const widgetDefinitions: Record<string, WidgetSchema> = {
    box: {
      tag: 'box',
      experimental: true,
      allowedChildTags: ['*'],
      searchKeywords: ['box'],
      properties: {},
    },
    list: {
      tag: 'list',
      experimental: true,
      allowedChildTags: ['*'],
      searchKeywords: ['list'],
      properties: {},
    },
    text: {
      tag: 'text',
      experimental: true,
      allowedChildTags: [],
      searchKeywords: ['text'],
      properties: {},
    },
  };
  const widgetGallery: WidgetGallery = [
    {
      sectionId: 'layout',
      label: 'Layout',
      widgets: [
        {
          tag: 'box',
          label: 'Box',
          icon: ({ size }) => <Icon123 size={size} />,
          description:
            'Box is like HTML Div, you can set margin, padding, visible for it.',
        },
        {
          tag: 'list',
          label: 'List',
          experimental: true,
          description: 'List can help you loop content.',
        },
      ],
    },
    {
      sectionId: 'typography',
      label: 'Typography',
      widgets: [
        {
          tag: 'text',
          label: 'Text',
          description: 'Put the text you want to display here.',
        },
      ],
    },
  ];

  const [value, setValue] = useState<string | null>(null);

  return (
    <Box w={540} sx={{ border: 'solid 1px #eee', padding: 12 }}>
      <WidgetGalleryInput
        widgetDefinitions={widgetDefinitions}
        widgetGallery={widgetGallery}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </Box>
  );
};

const meta: Meta<typeof WidgetGalleryInput> = {
  component: WidgetGalleryInput,
};

export default meta;

type Story = StoryObj<typeof WidgetGalleryInput>;

export const Primary: Story = {
  render: () => {
    return <WidgetGalleryInputExample />;
  },
};
