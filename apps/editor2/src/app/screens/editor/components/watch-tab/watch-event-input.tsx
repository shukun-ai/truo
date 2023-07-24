import { Box } from '@mantine/core';

import { useObservableState } from 'observable-hooks';

import { PresenterWatchEntity } from '../../../../../repositories/presenter/watch-ref';

import { EventInputs } from '../../../../components/event-editor/event-inputs';
import { useAppContext } from '../../../../contexts/app-context';

import { useWatchFormContext } from './watch-context';

export type WatchEventInputProps = {
  watchEntity: PresenterWatchEntity;
};

export const WatchEventInput = ({ watchEntity }: WatchEventInputProps) => {
  const form = useWatchFormContext();
  const formProps = form.getInputProps('events');

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
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
        <Box sx={{ marginRight: 6 }}>事件</Box>
      </Box>

      <EventInputs
        containerName={watchEntity.containerName}
        repositories={repositories}
        repositoryDefinitions={repositoryDefinitions}
        repositoryRepository={
          app.repositories.presenterRepository.repositoryRepository
        }
        {...formProps}
      />
    </Box>
  );
};
