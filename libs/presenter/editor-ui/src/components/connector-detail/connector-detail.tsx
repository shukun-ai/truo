import { Box } from '@mantine/core';

import { useForm } from '@mantine/form';

import {
  ConnectorEditor,
  ConnectorEditorProvider,
  EditorTabWrapper,
} from '@shukun/component';
import { ConnectorSchema } from '@shukun/schema';
import { useMemo } from 'react';

import {
  ConnectorEntity,
  TabEntity,
  useEditorContext,
} from '../../editor-context';

import { useDebounceSave } from '../../hooks/use-debounce-save';

import { Schema } from './internal/schema';

export type ConnectorDetailProps = {
  tab: TabEntity;
  connectorEntity: ConnectorEntity;
};

export const ConnectorDetail = ({
  tab,
  connectorEntity,
}: ConnectorDetailProps) => {
  const { dispatch } = useEditorContext();

  const form = useForm<ConnectorSchema>({
    initialValues: structuredClone(connectorEntity),
  });

  useDebounceSave(form.values, (debounced) => {
    dispatch.connector.update({
      ...debounced,
      id: connectorEntity.id,
    });
  });

  const taskOptions = useMemo(() => {
    return Object.entries(connectorEntity.tasks).map(([taskName, task]) => ({
      value: taskName,
      label: taskName,
    }));
  }, [connectorEntity.tasks]);

  return (
    <ConnectorEditorProvider taskOptions={taskOptions}>
      <EditorTabWrapper>
        <Box>
          <form>
            <Schema
              value={form.values}
              onChange={(newValue) => form.setValues(newValue)}
            />
          </form>
        </Box>
        <Box sx={{ width: '100%', height: 300 }}>
          <ConnectorEditor
            value={form.values}
            onChange={(newValue) => form.setValues(newValue)}
          ></ConnectorEditor>
        </Box>
      </EditorTabWrapper>
    </ConnectorEditorProvider>
  );
};
