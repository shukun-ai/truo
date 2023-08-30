import { Box, Card, SimpleGrid, Stack, Text, Tooltip } from '@mantine/core';
import { WidgetSchema } from '@shukun/schema';
import { IconBraces } from '@tabler/icons-react';

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
  widgetDefinitions: Record<string, WidgetSchema>;
  widgetGallery: WidgetGallery;
  value: string | null;
  onChange: (newValue: string | null) => void;
};

export const WidgetGalleryInput = ({
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
            section={section}
            widgetDefinitions={widgetDefinitions}
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
  value,
  onChange,
}: {
  section: WidgetGallery[number];
  widgetDefinitions: Record<string, WidgetSchema>;
  value: string | null;
  onChange: (newValue: string | null) => void;
}) => {
  return (
    <Box mb={6}>
      <Box mb={6}>{section.label}</Box>
      <SimpleGrid cols={3}>
        {section.widgets.map((widget) => (
          <WidgetCard
            widget={widget}
            widgetDefinitions={widgetDefinitions}
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
  value,
  onChange,
}: {
  widget: WidgetGallery[number]['widgets'][number];
  widgetDefinitions: Record<string, WidgetSchema>;
  value: string | null;
  onChange: (newValue: string | null) => void;
}) => {
  return (
    <Card
      padding="xs"
      withBorder
      bg={value === widget.tag ? 'blue.5' : undefined}
      c={value === widget.tag ? 'white' : undefined}
      sx={{
        cursor: 'pointer',
      }}
      onClick={() => {
        onChange(widget.tag);
      }}
    >
      <Stack align="center" spacing={0}>
        <Box c={value === widget.tag ? 'white' : 'blue.5'}>
          {widget.icon
            ? widget.icon({ size: '5rem' })
            : createDefaultIcon({ size: '5rem' })}
        </Box>
        {widget.description ? (
          <Tooltip label={widget.description} withinPortal>
            <Text fw="bold">{widget.label}</Text>
          </Tooltip>
        ) : (
          <Text fw="bold">{widget.label}</Text>
        )}
        <Text size="xs">
          {'<'}
          {widget.tag}
          {'>'}
        </Text>
      </Stack>
    </Card>
  );
};

const createDefaultIcon = ({ size }: { size: string }) => {
  return <IconBraces size={size} />;
};
