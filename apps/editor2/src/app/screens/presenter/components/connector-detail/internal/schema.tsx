import { Box } from '@mantine/core';

import { UseFormReturnType } from '@mantine/form';

import { useObservableState } from 'observable-hooks';

import { ConnectorEntity } from '../../../../../../repositories/connector/connector-ref';

import { useAppContext } from '../../../../../contexts/app-context';

import { Basic } from './basic';
import { Tasks } from './tasks';

export type SchemaProps = {
  form: UseFormReturnType<
    ConnectorEntity,
    (values: ConnectorEntity) => ConnectorEntity
  >;
};

export const Schema = ({ form }: SchemaProps) => {
  const app = useAppContext();
  const allTasks = useObservableState(app.repositories.taskRepository.all$, []);

  return (
    <Box>
      <Basic form={form} />
      <Tasks {...form.getInputProps('tasks')} taskEntities={allTasks} />
    </Box>
  );
};
