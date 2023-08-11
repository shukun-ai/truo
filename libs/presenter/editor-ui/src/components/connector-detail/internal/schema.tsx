import { Box } from '@mantine/core';

import { UseFormReturnType } from '@mantine/form';

import { useObservableState } from 'observable-hooks';

import { useEditorContext } from '../../../editor-context';

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
  const { disabledSystem } = useEditorContext();
  const allTasks = useObservableState(app.repositories.taskRepository.all$, []);

  return (
    <Box>
      <Basic form={form} disabled={disabledSystem} />
      <Tasks
        {...form.getInputProps('tasks')}
        taskEntities={allTasks}
        disabled={disabledSystem}
      />
    </Box>
  );
};
