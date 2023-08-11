import { Box, Group, Title } from '@mantine/core';

import { EventInputs } from '@shukun/component';
import { PresenterWatch } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';

import { PresenterWatchEntity } from '../../../../../../repositories/presenter/watch-ref';

import { useAppContext } from '../../../../../contexts/app-context';

export type EventInputProps = {
  watchEntity: PresenterWatchEntity;
  value: PresenterWatch['events'];
  onChange: (newValue: PresenterWatch['events']) => void;
};

export const EventInput = ({
  watchEntity,
  value,
  onChange,
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
        <Title order={5}>执行事件</Title>
      </Group>

      <EventInputs
        repositories={repositories}
        repositoryDefinitions={repositoryDefinitions}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
};
