import { Box, Group, Text, Title } from '@mantine/core';

import { EventInputs } from '@shukun/component';
import { PresenterWidget } from '@shukun/schema';
import { ReactNode } from 'react';

import { useEditorState } from '../../../editor-context';

export type EventInputProps = {
  label: string;
  secondaryLabel?: string;
  containerName: string;
  value: PresenterWidget['events'][number];
  onChange: (newValue: PresenterWidget['events'][number]) => void;
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
  const { repositories, repositoryDefinitions } = useEditorState();

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

      <EventInputs
        repositories={Object.entries(repositories).map(([id, item]) => ({
          repositoryName: id,
          type: item.type,
        }))}
        repositoryDefinitions={repositoryDefinitions}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
};
