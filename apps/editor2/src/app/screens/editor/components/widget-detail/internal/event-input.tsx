import { Box, Group, Text, Title } from '@mantine/core';

import { PresenterWidgetEntity } from '../../../../../../repositories/presenter/widget-ref';
import { EventInput as BaseEventInput } from '../../event/event-input';

export type EventInputProps = {
  label: string;
  secondaryLabel?: string;
  containerName: string;
  value: PresenterWidgetEntity['events'][number];
  onChange: (newValue: PresenterWidgetEntity['events'][number]) => void;
};

export const EventInput = ({
  label,
  secondaryLabel,
  containerName,
  value,
  onChange,
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
      <BaseEventInput
        containerName={containerName}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
};
