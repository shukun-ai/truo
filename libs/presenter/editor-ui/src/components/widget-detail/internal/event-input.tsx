import { Box, Group, Text, Title } from '@mantine/core';

import { EventInputs } from '@shukun/component';
import { useObservableState } from 'observable-hooks';
import { ReactNode } from 'react';

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
  const app = useAppContext();

  const repositories = useObservableState(
    app.repositories.presenterRepository.repositoryRepository.all$,
    [],
  );

  const repositoryDefinitions = useObservableState(
    app.repositories.presenterRepository.repositoryDefinitions$,
    {},
  );

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
        repositories={repositories}
        repositoryDefinitions={repositoryDefinitions}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
};
