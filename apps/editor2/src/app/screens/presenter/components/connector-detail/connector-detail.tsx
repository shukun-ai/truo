import { Box, Container, ScrollArea } from '@mantine/core';

import { useForm } from '@mantine/form';

import { useMemo } from 'react';

import { ConnectorEntity } from '../../../../../repositories/connector/connector-ref';
import { TabEntity } from '../../../../../repositories/tab/tab-ref';
import { ConnectorEditor } from '../../../../components/connector-editor/connector-editor';

import { ConnectorEditorProvider } from '../../../../components/connector-editor/connector-editor-context';

import { TabAlert } from '../../../../components/tab-alert/tab-alert';

import { useAppContext } from '../../../../contexts/app-context';

import { Schema } from './internal/schema';

export type ConnectorDetailProps = {
  tab: TabEntity;
  connectorEntity: ConnectorEntity;
};

export const ConnectorDetail = ({
  tab,
  connectorEntity,
}: ConnectorDetailProps) => {
  const app = useAppContext();

  const form = useForm<ConnectorEntity>({
    initialValues: structuredClone(connectorEntity),
  });

  const taskOptions = useMemo(() => {
    return Object.entries(form.values.tasks).map(([taskName, task]) => ({
      value: taskName,
      label: taskName,
    }));
  }, [form.values.tasks]);

  return (
    <ConnectorEditorProvider taskOptions={taskOptions}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          minWidth: 0,
          minHeight: 0,
          flexDirection: 'column',
        }}
      >
        <TabAlert
          tab={tab}
          formValue={form.values}
          entity={connectorEntity}
          onSubmit={async () => {
            app.repositories.connectorRepository.update(form.values);
            return true;
          }}
        />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ flex: 1, height: '100%' }}>
            <ScrollArea sx={{ width: '100%', height: '100%' }}>
              <Container fluid>
                <form>
                  <Schema form={form} />
                </form>
              </Container>
            </ScrollArea>
          </Box>
          <Box sx={{ flex: 1, height: '100%' }}>
            <ConnectorEditor
              value={form.values}
              onChange={() => {
                //
              }}
            ></ConnectorEditor>
          </Box>
        </Box>
      </Box>
    </ConnectorEditorProvider>
  );
};
