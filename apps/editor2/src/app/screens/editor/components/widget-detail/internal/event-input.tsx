import { Box, Group, Text, Title } from '@mantine/core';

import { ReactNode } from 'react';

import { PresenterWidgetEntity } from '../../../../../../repositories/presenter/widget-ref';
import { EventInput as BaseEventInput } from '../../event/event-input';

export type EventInputProps = {
  label: string;
  secondaryLabel?: string;
  containerName: string;
  value: PresenterWidgetEntity['events'][number];
  onChange: (newValue: PresenterWidgetEntity['events'][number]) => void;
  tipSection?: ReactNode;
};

export const EventInput = ({
  label,
  secondaryLabel,
  containerName,
  value,
  onChange,
  tipSection,
}: EventInputProps) => {
  return (
    <Box sx={{ marginBottom: 16 }}>
      <Group mb={12}>
        <Title order={5}>{label}</Title>
        {secondaryLabel && (
          <Text size="xs" c="gray">
            {secondaryLabel}
          </Text>
        )}
      </Group>
      {tipSection}
      <BaseEventInput
        containerName={containerName}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
};
