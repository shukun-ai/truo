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
  ProcessEntity,
  TabEntity,
  useEditorContext,
} from '../../editor-context';

import { useDebounceSave } from '../../hooks/use-debounce-save';

import { Schema } from '../connector-detail/internal/schema';

export type ProcessDetailProps = {
  tab: TabEntity;
  processEntity: ProcessEntity;
};

export const ProcessDetail = ({ tab, processEntity }: ProcessDetailProps) => {
  const { dispatch } = useEditorContext();

  const form = useForm<ConnectorSchema>({
    initialValues: structuredClone(processEntity),
  });

  useDebounceSave(form.values, (debounced) => {
    dispatch.process.update(processEntity.id, debounced);
  });

  const taskOptions = useMemo(() => {
    return Object.entries(processEntity.tasks).map(([taskName, task]) => ({
      value: taskName,
      label: taskName,
    }));
  }, [processEntity.tasks]);

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
