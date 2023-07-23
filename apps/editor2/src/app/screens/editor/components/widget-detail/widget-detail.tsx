import { Box, Container } from '@mantine/core';

import { useForm } from '@mantine/form';
import { WidgetSchema } from '@shukun/schema';

import { PresenterWidgetEntity } from '../../../../../repositories/presenter/widget-ref';
import { TabEntity } from '../../../../../repositories/tab/tab-ref';
import { OverflowArea } from '../../../../components/overflow-area/overflow-area';
import { TabAlert } from '../../../../components/tab-alert/tab-alert';
import { useAppContext } from '../../../../contexts/app-context';

import { WidgetFormProvider, WidgetFormValue } from './internal/widget-context';
import { WidgetField } from './internal/widget-field';

export type WidgetDetailProps = {
  tab: TabEntity;
  widget: PresenterWidgetEntity;
  definition: WidgetSchema;
};

export const WidgetDetail = ({
  tab,
  widget,
  definition,
}: WidgetDetailProps) => {
  const app = useAppContext();

  const form = useForm<WidgetFormValue>({
    initialValues: {
      properties: structuredClone(widget.properties),
      events: structuredClone(widget.events),
    },
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
        entity={{
          properties: widget.properties,
          events: widget.events,
        }}
        onSubmit={async () => {
          app.repositories.presenterRepository.widgetRepository.update(
            widget.id,
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
            <WidgetFormProvider form={form}>
              <form>
                {Object.entries(definition.properties).map(
                  ([definitionPropertyId, definitionProperty]) => (
                    <WidgetField
                      key={definitionPropertyId}
                      tab={tab}
                      definitionPropertyId={definitionPropertyId}
                      definitionProperty={definitionProperty}
                    />
                  ),
                )}
              </form>
            </WidgetFormProvider>
          </Container>
        </OverflowArea>
      </Box>
    </Box>
  );
};
