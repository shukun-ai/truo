import { Box, SimpleGrid, Stack, Text } from '@mantine/core';
import { WidgetSchema } from '@shukun/schema';
import { useMemo } from 'react';

import { getDisabledByTags } from './internal/allowed-child-tags';
import { ButtonCard } from './internal/button-card';
import { WidgetIcon } from './internal/widget-icon';

export type WidgetGallery = {
  sectionId: string;
  label: string;
  widgets: {
    tag: string;
    label: string;
    icon?: (props: { size: string }) => JSX.Element;
    experimental?: boolean;
    description?: string;
  }[];
}[];

export type WidgetGalleryInputProps = {
  parentWidgetDefinition: WidgetSchema | null;
  widgetDefinitions: Record<string, WidgetSchema>;
  widgetGallery: WidgetGallery;
  value: string | null;
  onChange: (newValue: string | null) => void;
};

export const WidgetGalleryInput = ({
  parentWidgetDefinition,
  widgetDefinitions,
  widgetGallery,
  value,
  onChange,
}: WidgetGalleryInputProps) => {
  return (
    <Box>
      {widgetGallery.map((section) => {
        return (
          <Section
            key={section.sectionId}
            section={section}
            widgetDefinitions={widgetDefinitions}
            parentWidgetDefinition={parentWidgetDefinition}
            value={value}
            onChange={onChange}
          />
        );
      })}
    </Box>
  );
};

const Section = ({
  section,
  widgetDefinitions,
  parentWidgetDefinition,
  value,
  onChange,
}: {
  section: WidgetGallery[number];
  widgetDefinitions: Record<string, WidgetSchema>;
  parentWidgetDefinition: WidgetSchema | null;
  value: string | null;
  onChange: (newValue: string | null) => void;
}) => {
  return (
    <Box mb={6}>
      <Text mb={6} size="sm">
        {section.label}
      </Text>
      <SimpleGrid cols={6}>
        {section.widgets.map((widget) => (
          <WidgetCard
            key={widget.tag}
            widget={widget}
            widgetDefinitions={widgetDefinitions}
            parentWidgetDefinition={parentWidgetDefinition}
            value={value}
            onChange={onChange}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

const WidgetCard = ({
  widget,
  widgetDefinitions,
  parentWidgetDefinition,
  value,
  onChange,
}: {
  widget: WidgetGallery[number]['widgets'][number];
  widgetDefinitions: Record<string, WidgetSchema>;
  parentWidgetDefinition: WidgetSchema | null;
  value: string | null;
  onChange: (newValue: string | null) => void;
}) => {
  const disabled = useMemo(() => {
    if (!parentWidgetDefinition) {
      return false;
    }
    return getDisabledByTags(
      parentWidgetDefinition?.allowedChildTags ?? [],
      widget.tag,
    );
  }, [parentWidgetDefinition, widget.tag]);

  const active = useMemo(() => {
    return value === widget.tag;
  }, [value, widget.tag]);

  return (
    <ButtonCard
      active={active}
      disabled={disabled}
      widgetDescription={widget.description}
      onClick={() => {
        onChange(widget.tag);
      }}
    >
      <Stack align="center" spacing={0}>
        <WidgetIcon icon={widget.icon} active={active} disabled={disabled} />
        <Text fw="500">{widget.label}</Text>
        <Text size="xs" c="gray">
          {'<'}
          {widget.tag}
          {'>'}
        </Text>
      </Stack>
    </ButtonCard>
  );
};
