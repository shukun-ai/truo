import { Box, Container } from '@mantine/core';

import { useForm } from '@mantine/form';

import { ConnectorEntity } from '../../../../../repositories/connector/connector-ref';
import { TabEntity } from '../../../../../repositories/tab/tab-ref';
import { ConnectorEditor } from '../../../../components/connector-editor/connector-editor';

import { Schema } from './internal/schema';

export type ConnectorDetailProps = {
  tab: TabEntity;
  connectorEntity: ConnectorEntity;
};

export const ConnectorDetail = ({
  tab,
  connectorEntity,
}: ConnectorDetailProps) => {
  const form = useForm<ConnectorEntity>({
    initialValues: structuredClone(connectorEntity),
  });

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ flex: 1, height: '100%' }}>
        <ConnectorEditor
          value={form.values}
          onChange={() => {}}
        ></ConnectorEditor>
      </Box>
      <Box sx={{ flex: 1, height: '100%' }}>
        <Container fluid>
          <form>
            <Schema form={form} />
          </form>
        </Container>
      </Box>
    </Box>
  );
};
