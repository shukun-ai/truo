import { Box, Button, Group, Text, useMantineTheme } from '@mantine/core';

import { useForm } from '@mantine/form';
import { WidgetSchema } from '@shukun/schema';

import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { PresenterTabEntity } from '../../../../../repositories/presenter/tab-ref';
import { PresenterWidgetEntity } from '../../../../../repositories/presenter/widget-ref';
import { useAppContext } from '../../../../contexts/app-context';
import { WidgetFormProvider, WidgetFormValue } from '../widget/widget-context';
import { WidgetField } from '../widget/widget-field';

export type WidgetFormProps = {
  tab: PresenterTabEntity;
  widget: PresenterWidgetEntity;
  definition: WidgetSchema;
};

export const WidgetForm = ({ tab, widget, definition }: WidgetFormProps) => {
  const theme = useMantineTheme();

  const app = useAppContext();

  const form = useForm<WidgetFormValue>({
    initialValues: {
      properties: structuredClone(widget.properties),
      events: structuredClone(widget.events),
    },
  });

  const [fixedCache, setFixedCache] = useState(false);

  useEffect(() => {
    if (
      !isEqual(form.values, {
        properties: widget.properties,
        events: widget.events,
      }) &&
      !fixedCache
    ) {
      app.repositories.presenterRepository.tabRepository.fixTab(tab.id);
      app.repositories.presenterRepository.tabRepository.activeEditTab(tab.id);
      setFixedCache(true);
    }
  }, [
    app.repositories.presenterRepository.tabRepository,
    fixedCache,
    form.values,
    tab.id,
    widget.events,
    widget.properties,
  ]);

  const handleSubmit = useCallback(() => {
    app.repositories.presenterRepository.widgetRepository.update(
      widget.id,
      form.values,
    );
    app.repositories.presenterRepository.tabRepository.inactiveEditTab(tab.id);
    setFixedCache(false);
  }, [
    app.repositories.presenterRepository.tabRepository,
    app.repositories.presenterRepository.widgetRepository,
    form.values,
    tab.id,
    widget.id,
  ]);

  return (
    <Box>
      <WidgetFormProvider form={form}>
        <form>
          {tab.isEdit ? (
            <Box
              sx={{
                background: theme.colors.blue[2],
                marginLeft: -16,
                marginRight: -16,
                padding: 6,
                paddingLeft: 16,
                paddingRight: 16,
                marginBottom: 16,
                position: 'sticky',
                top: 0,
                zIndex: 1,
              }}
            >
              <Group spacing="xs">
                <Text>组件正处于编辑状态，编辑后进行保存。</Text>
                <Button size="xs" variant="light" onClick={handleSubmit}>
                  点击保存
                </Button>
              </Group>
            </Box>
          ) : (
            <Box sx={{ height: 16 }}></Box>
          )}
          {Object.entries(definition.properties).map(
            ([definitionPropertyId, definitionProperty]) => (
              <WidgetField
                key={definitionPropertyId}
                definitionPropertyId={definitionPropertyId}
                definitionProperty={definitionProperty}
              />
            ),
          )}
        </form>
      </WidgetFormProvider>
    </Box>
  );
};
