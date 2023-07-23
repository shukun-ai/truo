import { Box, Container } from '@mantine/core';

import { useForm } from '@mantine/form';
import { WidgetSchema } from '@shukun/schema';

import { PresenterWidgetEntity } from '../../../../../repositories/presenter/widget-ref';
import { TabEntity } from '../../../../../repositories/tab/tab-ref';
import { OverflowArea } from '../../../../components/overflow-area/overflow-area';
import { TabAlert } from '../../../../components/tab-alert/tab-alert';
import { useAppContext } from '../../../../contexts/app-context';

import { Schema } from './internal/schema';

export type WidgetDetailProps = {
  tab: TabEntity;
  widgetEntity: PresenterWidgetEntity;
  definition: WidgetSchema;
};

export const WidgetDetail = ({
  tab,
  widgetEntity,
  definition,
}: WidgetDetailProps) => {
  const app = useAppContext();

  const form = useForm<PresenterWidgetEntity>({
    initialValues: structuredClone(widgetEntity),
  });

  if (tab.tabType !== 'widget') {
    return null;
  }

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
        entity={widgetEntity}
        onSubmit={async () => {
          app.repositories.presenterRepository.widgetRepository.update(
            widgetEntity.id,
            form.values,
          );
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
        <OverflowArea y="scroll">
          <Container fluid>
            <form>
              <Schema
                form={form}
                definition={definition}
                containerName={tab.containerName}
              />
            </form>
          </Container>
        </OverflowArea>
      </Box>
    </Box>
  );
};
