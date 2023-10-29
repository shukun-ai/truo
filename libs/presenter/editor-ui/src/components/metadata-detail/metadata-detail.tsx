import { Box, Container, ScrollArea } from '@mantine/core';

import { useForm } from '@mantine/form';

import {
  MetadataEntity,
  TabEntity,
  useEditorContext,
} from '../../editor-context';
import { TabAlert } from '../tab-alert/tab-alert';

import { Schema } from './internal/schema';

export type MetadataDetailProps = {
  tab: TabEntity;
  metadataEntity: MetadataEntity;
};

export const MetadataDetail = ({
  tab,
  metadataEntity,
}: MetadataDetailProps) => {
  const { dispatch } = useEditorContext();

  const form = useForm<MetadataEntity>({
    initialValues: structuredClone(metadataEntity),
  });

  return (
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
        entity={metadataEntity}
        onSubmit={async () => {
          dispatch.metadata.update(form.values);
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
        <ScrollArea sx={{ width: '100%', height: '100%' }}>
          <Container fluid>
            <Box sx={{ maxWidth: 1000 }}>
              <form>
                <Schema form={form} />
              </form>
            </Box>
          </Container>
        </ScrollArea>
      </Box>
    </Box>
  );
};
