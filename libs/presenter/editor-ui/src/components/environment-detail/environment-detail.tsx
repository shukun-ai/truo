import { Box, Container, ScrollArea } from '@mantine/core';

import { useForm } from '@mantine/form';

import {
  EnvironmentEntity,
  TabEntity,
  useEditorContext,
} from '../../editor-context';
import { TabAlert } from '../tab-alert/tab-alert';

import { Schema } from './internal/schema';

export type EnvironmentDetailProps = {
  tab: TabEntity;
  environmentEntity: EnvironmentEntity;
};

export const EnvironmentDetail = ({
  tab,
  environmentEntity,
}: EnvironmentDetailProps) => {
  const { dispatch } = useEditorContext();

  const form = useForm<EnvironmentEntity>({
    initialValues: structuredClone(environmentEntity),
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
        entity={environmentEntity}
        onSubmit={async () => {
          dispatch.environment.update(form.values);
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
