import { Box, Container, ScrollArea } from '@mantine/core';

import { useForm } from '@mantine/form';

import { MetadataEntity } from '../../../../../repositories/metadata/metadata-ref';
import { TabEntity } from '../../../../../repositories/tab/tab-ref';

import { TabAlert } from '../../../../components/tab-alert/tab-alert';

import { useAppContext } from '../../../../contexts/app-context';

import { Schema } from './internal/schema';

export type MetadataDetailProps = {
  tab: TabEntity;
  metadataEntity: MetadataEntity;
};

export const MetadataDetail = ({
  tab,
  metadataEntity,
}: MetadataDetailProps) => {
  const app = useAppContext();

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
          app.repositories.metadataRepository.update(form.values);
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
            <form>
              <Schema form={form} />
            </form>
          </Container>
        </ScrollArea>
      </Box>
    </Box>
  );
};
